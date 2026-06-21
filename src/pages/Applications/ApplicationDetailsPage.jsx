import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import {
	MOCK_APPLICATIONS,
	MOCK_CONTRACTS,
	MOCK_CONTRACTORS,
	MOCK_NEGOTIATIONS,
	MOCK_NEGOTIATION_UPDATES,
	MOCK_PAYMENTS,
} from "../../mock/MockData";
import { contractorProfileReviewData } from "../../mock/ProfileReviews";
import { pageSx } from "../../theme/layout";
import { reviewCriteria } from "../../components/reviews/reviewCriteria";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import StepTabs from "./components/StepTabs";
import ApplicationSection from "./components/ApplicationSection";
import ContractorProfileSection from "./components/profile/ContractorProfileSection";
import { useApplicationTabs } from "./hooks/useApplicationTabs";

function getInitialTab({ negotiation, contract, payments }) {
	if (contract?.status === "COMPLETED") return 3;
	if (payments.some((p) => p.status === "PAID")) return 2;
	if (contract) return 1;
	if (negotiation?.status === "ACCEPTED") return 1;
	return 0;
}

export default function ApplicationDetailsPage() {
	const { applicationId } = useParams();
	const application = MOCK_APPLICATIONS.find((a) => a.id === applicationId);
	const contractor = MOCK_CONTRACTORS.find((c) => c.id === application?.contractorId);
	const negotiation = MOCK_NEGOTIATIONS.find((n) => n.applicationId === applicationId);
	const negotiationUpdates = negotiation
		? MOCK_NEGOTIATION_UPDATES.filter((update) => update.negotiationId === negotiation.id)
		: [];
	const contract = MOCK_CONTRACTS.find((c) => c.applicationId === applicationId);
	const payments = contract ? MOCK_PAYMENTS.filter((p) => p.contractId === contract.id) : [];
	const tabs = useApplicationTabs({ negotiation, negotiationUpdates, contract, payments });

	if (!application) return null;

	return (
		<Box sx={pageSx}>
			<BackButton backTo={`/client/jobs/${application.jobId}/applications`} sx={{ mb: 2 }} />
			<PageHeader
				label="Application details"
				title={`${contractor.firstName} ${contractor.lastName}`}
				subtitle="Review the application, contract terms, payments, and contractor profile."
			/>

			<Grid container spacing={2} sx={{ mt: 3 }}>
				<Grid size={{ xs: 12, md: 8 }}>
					<ApplicationSection application={application} />
					<StepTabs tabs={tabs} initialTab={getInitialTab({ negotiation, contract, payments })} />
				</Grid>
				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={2}>
						<ContractorProfileSection contractor={contractor} />
						<ReviewSummaryCard
							title="Contractor reviews"
							reviews={contractorProfileReviewData.reviews}
							summary={contractorProfileReviewData.summary}
							criteria={reviewCriteria.contractor}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
