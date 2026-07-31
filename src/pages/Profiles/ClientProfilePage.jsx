import { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import PageHeader from "../../components/ui/PageHeader";
import AppAlert from "../../components/ui/AppAlert";
import ProfileDetailsSection from "./components/edit/ProfileDetailsSection";
import ProfileImageUpload from "./components/edit/ProfileImageUpload";
import ProfileProgressCard from "./components/edit/ProfileProgressCard";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";

import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import { getMyProfile, updateMyProfile } from "../../api/core.api";
import { useAuth } from "../../hooks/useAuth";
import { PROFILE_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";
import { useTimedAlert } from "../../hooks/useTimedAlert";
import { CLIENT_REQUIRED_PROFILE_FIELDS } from "./components/edit/profileCompletion";
const emptyProfileData = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	country: "",
	city: "",
	about: "",
	image: null,
};

const emptyReviewData = {
	summary: {},
	reviews: [],
};

export default function ClientProfilePage() {
	const { setProfileCompleted } = useAuth();
	const [profileData, setProfileData] = useState(emptyProfileData);
	const [reviewData, setReviewData] = useState(emptyReviewData);
	const [loadError, setLoadError] = useState("");
	const [saveError, setSaveError] = useState("");
	const [success, setSuccess] = useTimedAlert();
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		async function loadProfile() {
			try {
				const { profile, reviews } = await getMyProfile();
				setProfileCompleted(profile.profileCompleted);
				const loadedProfile = {
					...emptyProfileData,
					...profile,
				};
				setProfileData(loadedProfile);

				setReviewData({
					...emptyReviewData,
					...reviews,
				});
			} catch (err) {
				console.error("Failed to load client profile:", err);
				const apiError = parseApiError(
					err,
					PROFILE_ERRORS,
					"We couldn't load your profile data. Please refresh the page or try again later.",
				);
				setLoadError(apiError.message);
			}
		}

		loadProfile();
	}, [setProfileCompleted]);

	const updateField = (field) => (event) => {
		const value = event.target.value;

		setProfileData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const updateImage = (file) => {
		setProfileData((prev) => ({
			...prev,
			image: file,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setSaveError("");
		setSuccess("");

		setSaving(true);

		try {
			const { profile } = await updateMyProfile(profileData);

			setProfileCompleted(profile.profileCompleted);
			setProfileData((current) => ({ ...current, ...profile }));
			setSuccess("Profile saved successfully.");
		} catch (err) {
			console.error("Failed to update profile:", err);
			const apiError = parseApiError(err, PROFILE_ERRORS, "We couldn't save your profile. Please try again later.");
			setSaveError(apiError.message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<Box>
			<PageHeader
				label="Your profile"
				title="Client Profile"
				subtitle="Complete your profile before publishing jobs and starting contracts."
			>
				<ProfileProgressCard profileData={profileData} requiredFields={CLIENT_REQUIRED_PROFILE_FIELDS} />
			</PageHeader>

			{loadError && (
				<AppAlert severity="error" title="Profile could not be loaded" sx={{ mt: 3 }}>
					{loadError}
				</AppAlert>
			)}

			{saveError && (
				<AppAlert severity="error" title="Profile could not be saved" sx={{ mt: 3 }}>
					{saveError}
				</AppAlert>
			)}

			{success && (
				<AppAlert severity="success" title="Profile saved" sx={{ mt: 3 }}>
					{success}
				</AppAlert>
			)}
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, md: 7 }}>
						<ProfileDetailsSection
							profileData={profileData}
							updateField={updateField}
							saving={saving}
							aboutPlaceholder="Write a short introduction for contractors."
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 5 }}>
						<Stack spacing={3}>
							<ProfileImageUpload image={profileData.image} onImageChange={updateImage} />

							<ReviewSummaryCard
								title="Reviews from contractors"
								titleIcon={<StarRoundedIcon />}
								summary={reviewData.summary}
								criteria={reviewCriteria.client}
								reviews={reviewData.reviews}
							/>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
