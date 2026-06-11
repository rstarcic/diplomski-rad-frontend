//import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import JobDetailsSection from "./components/details/JobDetailsSection";
import ApplyCard from "./components/details/ApplyCard";
import ClientProfileSection from "./components/details/ClientProfileSection";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import pageSx from "../../theme/layout";

import { MOCK_JOB_DETAILS } from "../../mock/JobDetailsPage";

export default function JobDetailsPage() {
	//const { jobId } = useParams();

	const job = MOCK_JOB_DETAILS;

	return (
		<Box sx={pageSx}>
			<PageHeader
				label="Job details"
				title={job.title}
				subtitle="Review the full job description, client profile and client reviews."
			/>

			<Grid container spacing={3} sx={{ mt: 3, alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={3}>
						<JobDetailsSection job={job} />
						<ApplyCard job={job} alreadyApplied={job.hasApplied} onApply={() => {}} />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={3} sx={{ position: { md: "sticky" }, top: 24 }}>
						<ClientProfileSection client={job.client} />
						<ReviewSummaryCard
							title="Client reviews"
							reviews={job.client.reviews}
							summary={job.client.reviewSummary}
							criteria={reviewCriteria.client}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
