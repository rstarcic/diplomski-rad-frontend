import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import { getContractorPublicProfile } from "../../api/core.api.js";
import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import AppAlert from "../../components/ui/AppAlert";
import { BackButton } from "../../components/ui/BackButton";
import { PROFILE_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";

import PortfolioCard from "./components/shared/PortfolioCard";
import SkillsCard from "./components/shared/SkillsCard";
import ProfileInfoCard from "./components/public/ProfileInfoCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";
import { profileStatCardConfig } from "./profileStats";

export default function ContractorPublicProfilePage() {
	const { contractorId } = useParams();
	const [contractor, setContractor] = useState(null);
	const [loadError, setLoadError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadPublicProfile() {
			setLoadError("");
			setLoading(true);

			try {
				const profileData = await getContractorPublicProfile(contractorId);
				setContractor(profileData);
			} catch (error) {
				console.error("Error loading contractor profile:", error);
				const apiError = parseApiError(
					error,
					PROFILE_ERRORS,
					"We couldn't load this contractor profile. Please try again later.",
				);
				setLoadError(apiError.message);
			} finally {
				setLoading(false);
			}
		}

		loadPublicProfile();
	}, [contractorId]);

	const profile = contractor?.profile;

	return (
		<Box>
			<BackButton backTo="/client/jobs" sx={{ mb: 2 }}>
				Back to applications
			</BackButton>

			{loadError && (
				<AppAlert severity="error" title="Profile could not be loaded" sx={{ mb: 3 }}>
					{loadError}
				</AppAlert>
			)}

			{loading && (
				<AppAlert title="Loading profile" sx={{ mb: 3 }}>
					Please wait while we load this contractor profile.
				</AppAlert>
			)}

			<Grid container spacing={2.5} sx={{ alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<Stack spacing={2.5}>
						<ProfileInfoCard
							featured
							firstName={profile?.firstName}
							lastName={profile?.lastName}
							image={profile?.image}
							email={profile?.email}
							phone={profile?.phone}
							city={profile?.city}
							country={profile?.country}
							createdAt={profile?.createdAt}
							about={profile?.about}
						/>
						<PortfolioCard items={contractor?.portfolio ?? []} editable={false} title="Portfolio" featured />
						<ProfileStatsSection
							stats={contractor?.stats ?? []}
							config={profileStatCardConfig.contractor}
							columns={2}
							tone="violet"
						/>
						<SkillsCard skills={contractor?.skills ?? []} title="Skills" />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }} sx={{ position: { lg: "sticky" }, top: { lg: 24 }, alignSelf: "flex-start" }}>
					<ReviewSummaryCard
						title="Contractor reviews"
						summary={contractor?.reviews?.summary}
						criteria={reviewCriteria.contractor}
						reviews={contractor?.reviews?.reviews ?? []}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
