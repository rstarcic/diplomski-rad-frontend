import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import AppAlert from "../../components/ui/Alert";
import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import {
	decideJobApplication,
	getJobApplicationDetails,
	acceptNegotiationTerms,
	rejectNegotiationTerms,
	submitCounterOffer,
	signContract,
	markJobCompleted,
	markJobIncomplete,
} from "../../api/coreAPI";
import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";
import { useTimedAlert } from "../../hooks/useTimedAlert";

import StepTabs from "./components/StepTabs";
import ApplicationSection from "./components/ApplicationSection";
import ContractorProfileSection from "./components/profile/ContractorProfileSection";
import { useApplicationTabs } from "./hooks/useApplicationTabs";

function getInitialTab({ contract, tabs }) {
	if (!contract) return 0;
	const contractTab = tabs.findIndex((tab) => tab.label === "Contract");
	return contractTab >= 0 ? contractTab : 0;
}

const emptyReviews = {
	summary: {},
	reviews: [],
};

export default function ApplicationDetailsPage() {
	const { jobId, applicationId } = useParams();

	const [applicationDetails, setApplicationDetails] = useState(null);
	const [loadError, setLoadError] = useState("");
	const [loading, setLoading] = useState(true);
	const [decisionLoading, setDecisionLoading] = useState(false);
	const [decisionError, setDecisionError] = useTimedAlert();
	const [negotiationSuccess, setNegotiationSuccess] = useTimedAlert();
	const [jobCompletedLoading, setJobCompletedLoading] = useState(false);
	const [jobCompletedSuccess, setJobCompletedSuccess] = useTimedAlert();
	const [jobIncompleteLoading, setJobIncompleteLoading] = useState(false);
	const [jobIncompleteSuccess, setJobIncompleteSuccess] = useTimedAlert();

	useEffect(() => {
		async function loadApplicationDetails() {
			setLoading(true);
			setLoadError("");

			try {
				const details = await getJobApplicationDetails(jobId, applicationId);
				setApplicationDetails(details);
			} catch (error) {
				console.error("Failed to load application details:", error);

				const apiError = parseApiError(
					error,
					APPLICATION_ERRORS,
					"We couldn't load application details. Please try again later.",
				);

				setLoadError(apiError.message);
			} finally {
				setLoading(false);
			}
		}

		loadApplicationDetails();
	}, [jobId, applicationId]);

	const handleDecision = async (decision) => {
		try {
			setDecisionLoading(true);
			setDecisionError("");
			const updatedApplication = await decideJobApplication(jobId, applicationId, decision);

			setApplicationDetails((current) => ({
				...current,
				application: {
					...current.application,
					...updatedApplication,
				},
			}));
		} catch (error) {
			const apiError = parseApiError(
				error,
				APPLICATION_ERRORS,
				"The application decision could not be saved. Please try again.",
			);

			setDecisionError(apiError.message);
		} finally {
			setDecisionLoading(false);
		}
	};

	const handleAccept = () => handleDecision("selected");
	const handleReject = () => handleDecision("rejected");

	const details = useMemo(
		() => ({
			application: applicationDetails?.application ?? null,
			job: applicationDetails?.job ?? null,
			contractor: applicationDetails?.contractor ?? null,
			contractorReviews: applicationDetails?.reviews ?? emptyReviews,
			negotiation: applicationDetails?.negotiation ?? null,
			negotiationUpdates: applicationDetails?.negotiationUpdates ?? [],
			contract: applicationDetails?.contract ?? null,
			payments: applicationDetails?.payment ? [applicationDetails.payment] : [],
		}),
		[applicationDetails],
	);

	useEffect(() => {
		if (applicationDetails?.payment?.status !== "pending") return undefined;

		let active = true;
		const refreshPayment = async () => {
			try {
				const updatedDetails = await getJobApplicationDetails(jobId, applicationId);
				if (active) setApplicationDetails(updatedDetails);
			} catch {
				// Keep the current payment visible and retry on the next polling interval.
			}
		};
		const intervalId = window.setInterval(refreshPayment, 15000);

		return () => {
			active = false;
			window.clearInterval(intervalId);
		};
	}, [applicationDetails?.payment?.status, jobId, applicationId]);

	const handleAcceptNegotiation = async () => {
		try {
			setDecisionLoading(true);
			setDecisionError("");
			setNegotiationSuccess("");

			const result = await acceptNegotiationTerms(jobId, applicationId);

			const updatedDetails = await getJobApplicationDetails(jobId, applicationId);

			setApplicationDetails(updatedDetails);
			setNegotiationSuccess(result.message);
		} catch (error) {
			const apiError = parseApiError(error, APPLICATION_ERRORS, "Terms could not be accepted. Please try again.");

			setDecisionError(apiError.message);
		} finally {
			setDecisionLoading(false);
		}
	};

	const handleRejectNegotiation = async () => {
		try {
			setDecisionLoading(true);
			setDecisionError("");
			setNegotiationSuccess("");

			const result = await rejectNegotiationTerms(jobId, applicationId);
			const updatedDetails = await getJobApplicationDetails(jobId, applicationId);

			setApplicationDetails(updatedDetails);
			setNegotiationSuccess(result.message);
		} catch (error) {
			const apiError = parseApiError(error, APPLICATION_ERRORS, "Terms could not be rejected. Please try again.");

			setDecisionError(apiError.message);
		} finally {
			setDecisionLoading(false);
		}
	};

	const handleSubmitCounterOffer = async (counterOffer) => {
		try {
			setDecisionLoading(true);
			setDecisionError("");
			setNegotiationSuccess("");

			const result = await submitCounterOffer(jobId, applicationId, counterOffer);
			const updatedDetails = await getJobApplicationDetails(jobId, applicationId);

			setApplicationDetails(updatedDetails);
			setNegotiationSuccess(result.message ?? "Counter-offer submitted successfully.");
		} catch (error) {
			const apiError = parseApiError(
				error,
				APPLICATION_ERRORS,
				"Counter-offer could not be submitted. Please try again.",
			);
			setDecisionError(apiError.message);
		} finally {
			setDecisionLoading(false);
		}
	};

	const handleJobCompleted = async () => {
		try {
			setJobCompletedLoading(true);
			setDecisionError("");
			setJobCompletedSuccess("");

			const result = await markJobCompleted(jobId);
			const updatedDetails = await getJobApplicationDetails(jobId, applicationId);

			setApplicationDetails(updatedDetails);
			setJobCompletedSuccess(result.message ?? "Job completion confirmed successfully.");
		} catch (error) {
			const apiError = parseApiError(
				error,
				APPLICATION_ERRORS,
				"The job completion could not be confirmed. Please try again.",
			);

			setDecisionError(apiError.message);
		} finally {
			setJobCompletedLoading(false);
		}
	};

	const handleJobIncomplete = async () => {
		try {
			setJobIncompleteLoading(true);
			setDecisionError("");
			setJobIncompleteSuccess("");

			const result = await markJobIncomplete(jobId);
			const updatedDetails = await getJobApplicationDetails(jobId, applicationId);

			setApplicationDetails(updatedDetails);
			setJobIncompleteSuccess(result.message ?? "Job marked as incomplete.");
		} catch (error) {
			const apiError = parseApiError(
				error,
				APPLICATION_ERRORS,
				"The job could not be marked as incomplete. Please try again.",
			);

			setDecisionError(apiError.message);
		} finally {
			setJobIncompleteLoading(false);
		}
	};

	const handleSignContract = async (signatureDataUrl) => {
		await signContract(details.contract.id, signatureDataUrl);
		const updatedDetails = await getJobApplicationDetails(jobId, applicationId);
		setApplicationDetails(updatedDetails);
	};

	const tabs = useApplicationTabs({
		application: details.application,
		job: details.job,
		negotiation: details.negotiation,
		negotiationUpdates: details.negotiationUpdates,
		contract: details.contract,
		payments: details.payments,
		role: "client",
		onAcceptNegotiation: handleAcceptNegotiation,
		onRejectNegotiation: handleRejectNegotiation,
		onSubmitCounterOffer: handleSubmitCounterOffer,
		onSignContract: handleSignContract,
	});

	const initialTab = getInitialTab({
		contract: details.contract,
		tabs,
	});

	if (loading) {
		return <AppAlert title="Loading application">Please wait while we load application details.</AppAlert>;
	}

	if (loadError) {
		return (
			<AppAlert severity="error" title="Application could not be loaded">
				{loadError}
			</AppAlert>
		);
	}

	if (!applicationDetails || !details.application) {
		return <AppAlert title="Application not found">This application is not available.</AppAlert>;
	}

	return (
		<Box>
			<BackButton backTo={`/client/jobs/${jobId}/applications`} sx={{ mb: 2 }} />

			<PageHeader
				label="Application details"
				title={details.contractor?.fullName ?? "Application details"}
				subtitle="Review the application, contract terms, payments, and contractor profile."
			/>

			<Grid container spacing={2} sx={{ mt: 3 }}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={2}>
						{negotiationSuccess && (
							<AppAlert severity="success" title="Negotiation updated">
								{negotiationSuccess}
							</AppAlert>
						)}

						{decisionError && (
							<AppAlert severity="error" title="Action could not be completed">
								{decisionError}
							</AppAlert>
						)}

						{jobCompletedSuccess && (
							<AppAlert severity="success" title="Job completed">
								{jobCompletedSuccess}
							</AppAlert>
						)}

						{jobIncompleteSuccess && (
							<AppAlert severity="warning" title="Job incomplete">
								{jobIncompleteSuccess}
							</AppAlert>
						)}

						<ApplicationSection
							application={details.application}
							contract={details.contract}
							job={details.job}
							role="client"
							onAccept={handleAccept}
							onReject={handleReject}
							onJobCompleted={handleJobCompleted}
							onJobIncomplete={handleJobIncomplete}
							decisionLoading={decisionLoading}
							jobCompletedLoading={jobCompletedLoading}
							jobIncompleteLoading={jobIncompleteLoading}
						/>

						<StepTabs key={initialTab} tabs={tabs} initialTab={initialTab} />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={2}>
						<ContractorProfileSection contractor={details.contractor} />

						<ReviewSummaryCard
							title="Contractor reviews"
							reviews={details.contractorReviews.reviews}
							summary={details.contractorReviews.summary}
							criteria={reviewCriteria.contractor}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
