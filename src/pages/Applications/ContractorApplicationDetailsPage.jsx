import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";

import ApplicationSection from "./components/ApplicationSection";
import StepTabs from "./components/StepTabs";
import JobDetailsSection from "../Jobs/components/details/JobDetailsSection";
import ClientProfileSection from "../Jobs/components/details/ClientProfileSection";

import { getApplicationWorkflowState, useApplicationTabs } from "./hooks/useApplicationTabs";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import { clientProfileReviewData } from "../../mock/ProfileReviews";

import {
	MOCK_APPLICATIONS,
	MOCK_CLIENTS,
	MOCK_CONTRACTS,
	MOCK_JOBS,
	MOCK_NEGOTIATIONS,
	MOCK_NEGOTIATION_UPDATES,
	MOCK_PAYMENTS,
} from "../../mock/MockData";

function getInitialTab({ application, negotiation, contract, payments }) {
	const workflow = getApplicationWorkflowState({ application, negotiation, contract, payments });

	if (workflow.paymentCompleted) return 3;
	if (workflow.contractSigned) return 2;
	if (workflow.contractCreated && !workflow.applicationRejected) return 1;

	return 0;
}

export default function ContractorApplicationDetailsPage() {
	const { applicationId } = useParams();

	const application = MOCK_APPLICATIONS.find((item) => item.id === applicationId);
	const job = MOCK_JOBS.find((item) => item.id === application?.jobId);
	const client = MOCK_CLIENTS.find((item) => item.id === job?.clientId);
	const negotiation = MOCK_NEGOTIATIONS.find((item) => item.applicationId === applicationId);
	const negotiationUpdates = negotiation
		? MOCK_NEGOTIATION_UPDATES.filter((update) => update.negotiationId === negotiation.id)
		: [];
	const contract = MOCK_CONTRACTS.find((item) => item.applicationId === applicationId);
	const payments = contract ? MOCK_PAYMENTS.filter((payment) => payment.contractId === contract.id) : [];

	const tabs = useApplicationTabs({
		application,
		negotiation,
		negotiationUpdates,
		contract,
		payments,
		role: "contractor",
	});

	if (!application || !job || !client) {
		return null;
	}

	return (
		<Box>
			<BackButton backTo="/contractor/applications" sx={{ mb: 2 }} />

			<PageHeader
				label="Application details"
				title={job.title}
				subtitle="Review your application, job details, negotiation, contract, and payments."
			/>

			<Grid container spacing={3} sx={{ mt: 3, alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={3}>
						<ApplicationSection application={application} />
						<JobDetailsSection job={job} />
						<StepTabs
							tabs={tabs}
							initialTab={getInitialTab({
								application,
								negotiation,
								contract,
								payments,
							})}
						/>
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack
						spacing={3}
						sx={{
							position: { md: "sticky" },
							top: 24,
						}}
					>
						<ClientProfileSection client={client} />
						<ReviewSummaryCard
							title="Client reviews"
							reviews={clientProfileReviewData.reviews}
							summary={clientProfileReviewData.summary}
							criteria={reviewCriteria.client}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
