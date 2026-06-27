import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import JobDetailsSection from "./components/details/JobDetailsSection";
import ApplyCard from "./components/details/ApplyCard";
import ClientProfileSection from "./components/details/ClientProfileSection";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import { MOCK_JOBS, MOCK_CLIENTS } from "../../mock/MockData";
import { clientProfileReviewData } from "../../mock/ProfileReviews";
export default function JobDetailsPage() {
	const { jobId } = useParams();

	const job = MOCK_JOBS.find((j) => j.id === jobId);
	const client = MOCK_CLIENTS.find((c) => c.id === job?.clientId);

	if (!job || !client) return null;

	return (
		<Box>
			<PageHeader
				label="Job details"
				title={job.title}
				subtitle="Review the full job description, client profile and client reviews."
			/>

			<Grid container spacing={3} sx={{ mt: 3, alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={3}>
						<JobDetailsSection job={job} />
						<ApplyCard job={job} alreadyApplied={false} onApply={() => {}} />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={3} sx={{ position: { md: "sticky" }, top: 24 }}>
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
