import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import ProfileInfoCard from "./components/public/ProfileInfoCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";

import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import { profileStatCardConfig } from "./profileStats";
import { clientProfileReviewData } from "../../mock/ProfileReviews";
import { MOCK_CLIENTS } from "../../mock/MockData";
import pageSx from "../../theme/layout";

export default function ClientPublicProfilePage() {
	const { clientId } = useParams();
	const client = MOCK_CLIENTS.find((c) => c.id == clientId);

	return (
		<Box sx={pageSx}>
			<Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<Stack spacing={3}>
						<ProfileInfoCard
							firstName={client.firstName}
							lastName={client.lastName}
							image={client.profileImageUrl}
							email={client.email}
							phone={client.phone}
							city={client.city}
							country={client.country}
							createdAt={client.createdAt}
							about={client.about}
						/>

						<ProfileStatsSection stats={client.stats} config={profileStatCardConfig.client} />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }}>
					<ReviewSummaryCard
						title="Reviwes about the client"
						summary={clientProfileReviewData.summary}
						criteria={reviewCriteria.client}
						reviews={clientProfileReviewData.reviews}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
