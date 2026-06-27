import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import ProfileInfoCard from "./components/public/ProfileInfoCard";
import SkillsCard from "./components/shared/SkillsCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";
import { profileStatCardConfig } from "./profileStats";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";

import { MOCK_CONTRACTORS } from "../../mock/MockData";
import { contractorProfileReviewData } from "../../mock/ProfileReviews";

import PortfolioCard from "./components/shared/PortfolioCard";

export default function ContractorPublicProfilePage() {
	const { contractorId } = useParams();
	const contractor = MOCK_CONTRACTORS.find((c) => c.id == contractorId);

	return (
		<Box>
			<Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<Stack spacing={3}>
						<ProfileInfoCard
							firstName={contractor?.firstName}
							lastName={contractor?.lastName}
							image={contractor?.profileImageUrl}
							email={contractor?.email}
							phone={contractor?.phone}
							city={contractor?.city}
							country={contractor?.country}
							createdAt={contractor?.createdAt}
							about={contractor?.about}
						/>
						<PortfolioCard items={contractor?.portfolio ?? []} editable={false} title="Portfolio" />
						<ProfileStatsSection stats={contractor?.stats ?? []} config={profileStatCardConfig.contractor} />
						<SkillsCard skills={contractor?.skills ?? []} title="Skills" />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }}>
					<ReviewSummaryCard
						title="Contractor reviews"
						summary={contractorProfileReviewData.summary}
						criteria={reviewCriteria.contractor}
						reviews={contractorProfileReviewData.reviews}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
