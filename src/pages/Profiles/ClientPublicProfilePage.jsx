import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { getClientPublicProfile } from "../../api/core.api";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import AppAlert from "../../components/ui/AppAlert";
import { BackButton } from "../../components/ui/BackButton";

import ProfileInfoCard from "./components/public/ProfileInfoCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";
import { profileGridSx, reviewsColumnSx } from "./components/public/publicProfile.styles";
import { usePublicProfile } from "./hooks/usePublicProfile";
import { profileStatCardConfig } from "./profileStats.config";

const PROFILE_LOAD_ERROR_MESSAGE = "We couldn't load this client profile. Please try again later.";

export default function ClientPublicProfilePage() {
	const { clientId } = useParams();
	const {
		profileData: client,
		loading,
		loadError,
	} = usePublicProfile(clientId, getClientPublicProfile, PROFILE_LOAD_ERROR_MESSAGE);

	if (loading) {
		return <AppAlert title="Loading profile">Please wait while we load this client profile.</AppAlert>;
	}

	if (loadError) {
		return (
			<AppAlert severity="error" title="Profile could not be loaded">
				{loadError}
			</AppAlert>
		);
	}

	if (!client?.profile) {
		return <AppAlert title="Profile not found">This client profile is not available.</AppAlert>;
	}

	const { profile, stats = [], reviews = {} } = client;

	return (
		<Box>
			<BackButton backTo="/contractor/applications" sx={{ mb: 2 }}>
				Back to applications
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

						<ProfileStatsSection
							stats={stats}
							config={profileStatCardConfig.client}
							columns={2}
							tone="violet"
						/>
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }} sx={reviewsColumnSx}>
					<ReviewSummaryCard
						title="Reviews about the client"
						summary={reviews.summary ?? {}}
						criteria={reviewCriteria.client}
						reviews={reviews.reviews ?? []}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
