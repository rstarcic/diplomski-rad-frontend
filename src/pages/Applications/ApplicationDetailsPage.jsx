import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import {
	acceptNegotiationTerms,
	decideJobApplication,
	markJobCompleted,
	markJobIncomplete,
	rejectNegotiationTerms,
	signContract,
	submitCounterOffer,
} from "../../api/core.api";
import { createContractCheckoutSession } from "../../api/payment.api";

import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import AppAlert from "../../components/ui/AppAlert";
import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";

import { APPLICATION_ERRORS, PAYMENT_ERRORS } from "../../constants/apiErrors";
import { PAYMENT_STATUSES } from "../../constants/statuses";
import { useTimedAlert } from "../../hooks/useTimedAlert";
import { findStatusKey } from "../../utils/jobs";
import { parseApiError } from "../../utils/parseApiError";

import { getInitialApplicationTab, normalizeApplicationDetails } from "./applicationDetails.utils";
import ApplicationSection from "./components/ApplicationSection";
import StepTabs from "./components/StepTabs";
import { createApplicationTabs } from "./components/applicationTabs.config";
import ContractorProfileSection from "./components/profile/ContractorProfileSection";
import { useApplicationDetails } from "./hooks/useApplicationDetails";
import { usePaymentPolling } from "./hooks/usePaymentPolling";

export default function ApplicationDetailsPage() {
	const { jobId, applicationId } = useParams();

	const { applicationDetails, setApplicationDetails, loading, loadError, refreshDetails } = useApplicationDetails(
		jobId,
		applicationId,
	);

	const [decisionLoading, setDecisionLoading] = useState(false);
	const [decisionError, setDecisionError] = useTimedAlert();
	const [negotiationSuccess, setNegotiationSuccess] = useTimedAlert();
	const [jobCompletedLoading, setJobCompletedLoading] = useState(false);
	const [jobCompletedSuccess, setJobCompletedSuccess] = useTimedAlert();
	const [jobIncompleteLoading, setJobIncompleteLoading] = useState(false);
	const [jobIncompleteSuccess, setJobIncompleteSuccess] = useTimedAlert();
	const [paymentError, setPaymentError] = useTimedAlert();
	const [paymentLoading, setPaymentLoading] = useState(false);

	const details = normalizeApplicationDetails(applicationDetails);

	usePaymentPolling({
		paymentStatus: details.payment?.status,
		refreshDetails,
	});

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

	const handleAcceptNegotiation = async () => {
		try {
			setDecisionLoading(true);
			setDecisionError("");
			setNegotiationSuccess("");

			const result = await acceptNegotiationTerms(jobId, applicationId);

			await refreshDetails();
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
			await refreshDetails();
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
			await refreshDetails();
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
			await refreshDetails();
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
			await refreshDetails();
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
		await refreshDetails();
	};

	const canPay = findStatusKey(details.payment?.status, PAYMENT_STATUSES) === "pending";

	const handlePay = async (selectedPayment = details.payment) => {
		const contractId = selectedPayment?.contractId ?? details.contract?.id;
		if (!contractId) {
			setPaymentError("The contract for this payment could not be found.");
			return;
		}

		try {
			setPaymentLoading(true);
			setPaymentError("");
			const { checkoutUrl } = await createContractCheckoutSession(contractId);

			if (!checkoutUrl) {
				throw new Error("Stripe checkout URL is missing.");
			}

			window.location.assign(checkoutUrl);
		} catch (error) {
			const apiError = parseApiError(error, PAYMENT_ERRORS, "Payment checkout could not be started. Please try again.");
			setPaymentError(apiError.message);
			setPaymentLoading(false);
		}
	};

	const tabs = createApplicationTabs({
		application: details.application,
		job: details.job,
		negotiation: details.negotiation,
		negotiationUpdates: details.negotiationUpdates,
		contract: details.contract,
		payment: details.payment,
		role: "client",
		onAcceptNegotiation: handleAcceptNegotiation,
		onRejectNegotiation: handleRejectNegotiation,
		onSubmitCounterOffer: handleSubmitCounterOffer,
		onSignContract: handleSignContract,
		canPay,
		paymentLoading,
		onPay: handlePay,
	});

	const initialTab = getInitialApplicationTab({
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

						{paymentError && (
							<AppAlert severity="error" title="Payment could not be started">
								{paymentError}
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

				<Grid
					size={{ xs: 12, md: 4 }}
					sx={{
						position: { xs: "static", md: "sticky" },
						top: { md: 24 },
						alignSelf: "flex-start",
					}}
				>
					<Stack spacing={2}>
						<ContractorProfileSection contractor={details.contractor} backTo={`/client/jobs/${jobId}/applications`} />

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
