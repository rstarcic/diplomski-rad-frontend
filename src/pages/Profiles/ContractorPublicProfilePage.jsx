import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack } from "@mui/material";

import AppAlert from "../../components/ui/Alert";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import ProfileInfoCard from "./components/public/ProfileInfoCard";
import SkillsCard from "./components/shared/SkillsCard";
import ProfileStatsSection from "./components/public/ProfileStatsSection";
import { profileStatCardConfig } from "./profileStats";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import { getContractorPublicProfile } from "../../api/coreAPI.js";
import PortfolioCard from "./components/shared/PortfolioCard";
import { parseApiError } from "../../utils/parseApiError";
import { PROFILE_ERRORS } from "../../constants/apiErrors";

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

			<Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
				<Grid size={{ xs: 12, lg: 8 }}>
					<Stack spacing={3}>
						<ProfileInfoCard
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
						<PortfolioCard items={contractor?.portfolio ?? []} editable={false} title="Portfolio" />
						<ProfileStatsSection stats={contractor?.stats ?? []} config={profileStatCardConfig.contractor} />
						<SkillsCard skills={contractor?.skills ?? []} title="Skills" />
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, lg: 4 }}>
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
