import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import AppAlert from "../../components/ui/Alert";
import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import { getJobApplicationDetails } from "../../api/coreAPI";
import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";

import StepTabs from "./components/StepTabs";
import ApplicationSection from "./components/ApplicationSection";
import ContractorProfileSection from "./components/profile/ContractorProfileSection";
import { getApplicationWorkflowState, useApplicationTabs } from "./hooks/useApplicationTabs";

function getInitialTab({ application, negotiation, contract, payments }) {
	const workflow = getApplicationWorkflowState({ application, negotiation, contract, payments });

	if (workflow.paymentCompleted) return 3;
	if (workflow.contractSigned) return 2;
	if (workflow.contractCreated && !workflow.applicationRejected) return 1;
	return 0;
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

	useEffect(() => {
		async function loadApplicationDetails() {
			setLoading(true);
			setLoadError("");

			try {
				const details = await getJobApplicationDetails(jobId, applicationId);
				console.log(details);
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

	const details = useMemo(
		() => ({
			application: applicationDetails?.application ?? null,
			contractor: applicationDetails?.contractor ?? null,
			contractorReviews: applicationDetails?.reviews ?? emptyReviews,
			negotiation: applicationDetails?.negotiation ?? null,
			negotiationUpdates: applicationDetails?.negotiationUpdates ?? [],
			contract: applicationDetails?.contract ?? null,
			payments: applicationDetails?.payment ? [applicationDetails.payment] : [],
		}),
		[applicationDetails],
	);

	const tabs = useApplicationTabs({
		application: details.application,
		negotiation: details.negotiation,
		negotiationUpdates: details.negotiationUpdates,
		contract: details.contract,
		payments: details.payments,
		role: "client",
		onAcceptNegotiation: () => {
			setApplicationDetails((prev) => ({
				...prev,
				application: {
					...prev.application,
					status: "accepted",
				},
			}));
		},
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
						<ApplicationSection application={details.application} />

						<StepTabs
							tabs={tabs}
							initialTab={getInitialTab({
								application: details.application,
								negotiation: details.negotiation,
								contract: details.contract,
								payments: details.payments,
							})}
						/>
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
