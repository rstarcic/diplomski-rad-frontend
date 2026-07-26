import { useEffect, useRef, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import {
	getMyApplicationDetails,
	acceptNegotiationTerms,
	rejectNegotiationTerms,
	submitCounterOffer,
	signContract,
	markJobDone,
	withdrawApplication,
} from "../../api/coreAPI";
import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";
import { useTimedAlert } from "../../hooks/useTimedAlert";

import AppAlert from "../../components/ui/Alert";
import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";

import ApplicationSection from "./components/ApplicationSection";
import StepTabs from "./components/StepTabs";
import { useApplicationTabs } from "./hooks/useApplicationTabs";
import JobDetailsSection from "../Jobs/components/details/JobDetailsSection";
import ClientProfileSection from "../Jobs/components/details/ClientProfileSection";

const pageContentSx = {
	mt: 3,
	alignItems: "flex-start",
};

const sidebarSx = {
	position: { md: "sticky" },
	top: 24,
};

function getInitialTab({ contract, tabs }) {
	if (!contract) return 0;
	const contractTab = tabs.findIndex((tab) => tab.label === "Contract");
	return contractTab >= 0 ? contractTab : 0;
}

export default function ContractorApplicationDetailsPage() {
	const { applicationId } = useParams();
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const [negotiationSuccess, setNegotiationSuccess] = useTimedAlert();
	const [jobDoneLoading, setJobDoneLoading] = useState(false);
	const [jobDoneFeedback, setJobDoneFeedback] = useTimedAlert();
	const [applicationWithdrawLoading, setApplicationWithdrawLoading] = useState(false);
	const [applicationWithdrawFeedback, setApplicationWithdrawFeedback] = useTimedAlert();
	const [selectedTab, setSelectedTab] = useState(null);
	const tabsRef = useRef(null);

	const reviewOffer = () => {
		setSelectedTab("Negotiation");

		requestAnimationFrame(() => {
			tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	};

	useEffect(() => {
		const controller = new AbortController();

		async function loadMyApplicationDetails() {
			try {
				setLoading(true);
				setLoadError("");

				const data = await getMyApplicationDetails(applicationId, controller.signal);
				setDetails(data);
			} catch (error) {
				if (error.name === "CanceledError" || error.name === "AbortError") return;

				const apiError = parseApiError(
					error,
					APPLICATION_ERRORS,
					"We couldn't load this application. Please try again later.",
				);

				setLoadError(apiError.message);
				setDetails(null);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}

		loadMyApplicationDetails();

		return () => controller.abort();
	}, [applicationId]);

	const application = details?.application ?? null;
	const job = details?.job ?? null;
	const client = details?.client ?? null;
	const reviews = details?.reviews ?? { summary: {}, reviews: [] };
	const negotiation = details?.negotiation ?? null;
	const negotiationUpdates = details?.negotiationUpdates ?? [];
	const contract = details?.contract ?? null;
	const payment = details?.payment ?? null;

	useEffect(() => {
		if (details?.payment?.status !== "pending") return undefined;

		let active = true;
		const refreshPayment = async () => {
			try {
				const updatedDetails = await getMyApplicationDetails(applicationId);
				if (active) setDetails(updatedDetails);
			} catch {
				// Keep the current payment visible and retry on the next polling interval.
			}
		};
		const intervalId = window.setInterval(refreshPayment, 15000);

		return () => {
			active = false;
			window.clearInterval(intervalId);
		};
	}, [details?.payment?.status, applicationId]);

	const handleAcceptNegotiation = async () => {
		setNegotiationSuccess("");
		const result = await acceptNegotiationTerms(job.id, applicationId);

		const updatedDetails = await getMyApplicationDetails(applicationId);

		setDetails(updatedDetails);
		setNegotiationSuccess(result.message);
	};

	const handleRejectNegotiation = async () => {
		setNegotiationSuccess("");
		const result = await rejectNegotiationTerms(job.id, applicationId);
		const updatedDetails = await getMyApplicationDetails(applicationId);

		setDetails(updatedDetails);
		setNegotiationSuccess(result.message);
	};

	const handleSubmitCounterOffer = async (counterOffer) => {
		setNegotiationSuccess("");
		const result = await submitCounterOffer(job.id, applicationId, counterOffer);
		const updatedDetails = await getMyApplicationDetails(applicationId);

		setDetails(updatedDetails);
		setNegotiationSuccess(result.message ?? "Counter-offer submitted successfully.");
	};

	const handleSignContract = async (signatureDataUrl) => {
		await signContract(contract.id, signatureDataUrl);
		const updatedDetails = await getMyApplicationDetails(applicationId);
		setDetails(updatedDetails);
	};

	const handleJobDone = async () => {
		try {
			setJobDoneLoading(true);
			setJobDoneFeedback(null);

			const result = await markJobDone(job.id);
			const updatedDetails = await getMyApplicationDetails(applicationId);

			setDetails(updatedDetails);
			setJobDoneFeedback({
				severity: "success",
				message: result.message ?? "Job marked as done successfully.",
			});
		} catch (error) {
			const apiError = parseApiError(
				error,
				APPLICATION_ERRORS,
				"The job could not be marked as done. Please try again.",
			);

			setJobDoneFeedback({ severity: "error", message: apiError.message });
		} finally {
			setJobDoneLoading(false);
		}
	};

	const handleApplicationWithdraw = async () => {
		try {
			setApplicationWithdrawLoading(true);
			setApplicationWithdrawFeedback(null);

			const result = await withdrawApplication(applicationId);
			const updatedDetails = await getMyApplicationDetails(applicationId);

			setDetails(updatedDetails);
			setApplicationWithdrawFeedback({
				severity: "success",
				message: result.message ?? "Application withdrawn successfully.",
			});
		} catch (error) {
			const apiError = parseApiError(
				error,
				APPLICATION_ERRORS,
				"The application could not be withdrawn. Please try again.",
			);

			setApplicationWithdrawFeedback({ severity: "error", message: apiError.message });
		} finally {
			setApplicationWithdrawLoading(false);
		}
	};

	const tabs = useApplicationTabs({
		application,
		job,
		negotiation,
		negotiationUpdates,
		contract,
		payment,
		role: "contractor",
		onAcceptNegotiation: handleAcceptNegotiation,
		onRejectNegotiation: handleRejectNegotiation,
		onSubmitCounterOffer: handleSubmitCounterOffer,
		onSignContract: handleSignContract,
	});

	if (loading) {
		return <AppAlert title="Loading application">Please wait while we load the application details.</AppAlert>;
	}

	if (loadError) {
		return (
			<AppAlert severity="error" title="Application could not be loaded">
				{loadError}
			</AppAlert>
		);
	}

	if (!application || !job || !client) {
		return (
			<AppAlert severity="warning" title="Application details are unavailable">
				The server response does not contain all required application details.
			</AppAlert>
		);
	}

	const initialTab = getInitialTab({ contract, tabs });

	return (
		<Box>
			<BackButton backTo="/contractor/applications" sx={{ mb: 2 }} />

			<PageHeader
				label="Application details"
				title={job.title}
				subtitle="Review your application, job details, negotiation, contract, and payments."
			/>

			<Grid container spacing={3} sx={pageContentSx}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={3}>
						{negotiationSuccess && (
							<AppAlert severity="success" title="Negotiation updated">
								{negotiationSuccess}
							</AppAlert>
						)}

						{jobDoneFeedback && (
							<AppAlert
								severity={jobDoneFeedback.severity}
								title={jobDoneFeedback.severity === "success" ? "Job updated" : "Job could not be updated"}
							>
								{jobDoneFeedback.message}
							</AppAlert>
						)}

						{applicationWithdrawFeedback && (
							<AppAlert
								severity={applicationWithdrawFeedback.severity}
								title={
									applicationWithdrawFeedback.severity === "success"
										? "Application withdrawn"
										: "Application could not be withdrawn"
								}
							>
								{applicationWithdrawFeedback.message}
							</AppAlert>
						)}

						<ApplicationSection
							application={application}
							contract={contract}
							job={job}
							role="contractor"
							onReviewOffer={reviewOffer}
							onJobDone={handleJobDone}
							onApplicationWithdraw={handleApplicationWithdraw}
							jobDoneLoading={jobDoneLoading}
							applicationWithdrawLoading={applicationWithdrawLoading}
						/>
						<JobDetailsSection job={job} />
						<Box ref={tabsRef} sx={{ scrollMarginTop: 3 }}>
							<StepTabs key={initialTab} tabs={tabs} initialTab={initialTab} selectedTab={selectedTab} />
						</Box>
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={3} sx={sidebarSx}>
						<ClientProfileSection client={client} />
						<ReviewSummaryCard
							title="Client reviews"
							reviews={reviews.reviews}
							summary={reviews.summary}
							criteria={reviewCriteria.client}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
