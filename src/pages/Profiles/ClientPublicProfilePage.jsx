import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import AppAlert from "../../components/ui/AppAlert";
import { BackButton } from "../../components/ui/BackButton";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import ProfileInfoCard from "./components/public/ProfileInfoCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";

import { getClientPublicProfile } from "../../api/core.api";
import { PROFILE_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";
import { profileStatCardConfig } from "./profileStats";

const profileGridSx = {
	alignItems: "flex-start",
};

export default function ClientPublicProfilePage() {
	const { clientId } = useParams();
	const [client, setClient] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		async function loadPublicProfile() {
			try {
				setLoading(true);
				setLoadError("");

				const profileData = await getClientPublicProfile(clientId, controller.signal);
				setClient(profileData);
			} catch (error) {
				if (error.name === "CanceledError" || error.name === "AbortError") return;

				const apiError = parseApiError(
					error,
					PROFILE_ERRORS,
					"We couldn't load this client profile. Please try again later.",
				);

				setLoadError(apiError.message);
				setClient(null);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}

		loadPublicProfile();

		return () => controller.abort();
	}, [clientId]);

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

						<ProfileStatsSection stats={stats} config={profileStatCardConfig.client} columns={2} tone="violet" />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }} sx={{ position: { lg: "sticky" }, top: { lg: 24 }, alignSelf: "flex-start" }}>
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
