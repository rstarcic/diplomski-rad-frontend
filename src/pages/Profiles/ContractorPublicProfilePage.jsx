import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { getContractorPublicProfile } from "../../api/core.api.js";
import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import AppAlert from "../../components/ui/AppAlert";
import { BackButton } from "../../components/ui/BackButton";

import ProfileInfoCard from "./components/public/ProfileInfoCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";
import { profileGridSx, reviewsColumnSx } from "./components/public/publicProfile.styles";
import PortfolioCard from "./components/shared/PortfolioCard";
import SkillsCard from "./components/shared/SkillsCard";
import { usePublicProfile } from "./hooks/usePublicProfile";
import { profileStatCardConfig } from "./profileStats.config";

const PROFILE_LOAD_ERROR_MESSAGE = "We couldn't load this contractor profile. Please try again later.";

export default function ContractorPublicProfilePage() {
	const { contractorId } = useParams();
	const {
		profileData: contractor,
		loading,
		loadError,
	} = usePublicProfile(contractorId, getContractorPublicProfile, PROFILE_LOAD_ERROR_MESSAGE);

	if (loading) {
		return <AppAlert title="Loading profile">Please wait while we load this contractor profile.</AppAlert>;
	}

	if (loadError) {
		return (
			<AppAlert severity="error" title="Profile could not be loaded">
				{loadError}
			</AppAlert>
		);
	}

	if (!contractor?.profile) {
		return <AppAlert title="Profile not found">This contractor profile is not available.</AppAlert>;
	}

	const { profile, portfolio = [], stats = [], skills = [], reviews = {} } = contractor;

	return (
		<Box>
			<BackButton backTo="/client/jobs" sx={{ mb: 2 }}>
				Back to jobs
			</BackButton>

			<Grid container spacing={2.5} sx={profileGridSx}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<Stack spacing={2.5}>
						<ProfileInfoCard
							featured
							firstName={profile.firstName}
							lastName={profile.lastName}
							image={profile.image}
							email={profile.email}
							phone={profile.phone}
							city={profile.city}
							country={profile.country}
							createdAt={profile.createdAt}
							about={profile.about}
						/>

						<PortfolioCard items={portfolio} title="Portfolio" featured />
						<ProfileStatsSection stats={stats} config={profileStatCardConfig.contractor} columns={2} tone="violet" />
						<SkillsCard skills={skills} title="Skills" />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }} sx={reviewsColumnSx}>
					<ReviewSummaryCard
						title="Contractor reviews"
						summary={reviews.summary ?? {}}
						criteria={reviewCriteria.contractor}
						reviews={reviews.reviews ?? []}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
