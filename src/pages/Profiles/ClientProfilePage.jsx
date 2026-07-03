import { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";

import PageHeader from "../../components/ui/PageHeader";
import AppAlert from "../../components/ui/Alert";
import ProfileDetailsSection from "./components/edit/ProfileDetailsSection";
import ProfileImageUpload from "./components/edit/ProfileImageUpload";
import ProfileProgressCard from "./components/edit/ProfileProgressCard";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";

import { reviewCriteria } from "../../components/reviews/reviewCriteria";
import { getMyProfile, updateMyProfile } from "../../api/coreAPI";

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
	const [profileData, setProfileData] = useState(emptyProfileData);
	const [reviewData, setReviewData] = useState(emptyReviewData);
	const [loadError, setLoadError] = useState("");
	const [saveError, setSaveError] = useState("");
	const [success, setSuccess] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		async function loadProfile() {
			try {
				const { profile, reviews } = await getMyProfile();

				setProfileData({
					...emptyProfileData,
					...profile,
				});

				setReviewData({
					...emptyReviewData,
					...reviews,
				});
			} catch (err) {
				console.error("Failed to load client profile:", err);
				setLoadError(
					err.data?.message || "We couldn't load your profile data. Please refresh the page or try again later.",
				);
			}
		}

		loadProfile();
	}, []);

	const updateField = (field) => (event) => {
		setProfileData((prev) => ({
			...prev,
			[field]: event.target.value,
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
			await updateMyProfile(profileData);

			setSuccess("Profile saved successfully.");
		} catch (err) {
			console.error("Failed to update profile:", err);
			setSaveError(err.response?.data?.message || "We couldn't save your profile. Please try again later.");
		} finally {
			setSaving(false);
		}
	};

	return (
		<Box>
			<PageHeader
				label="Settings"
				title="Client Profile"
				subtitle="Complete your profile before publishing jobs and starting contracts."
			>
				<ProfileProgressCard profileData={profileData} />
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
							aboutPlaceholder="Write a short introduction for contractors."
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 5 }}>
						<Stack spacing={3}>
							<ProfileImageUpload image={profileData.image} onImageChange={updateImage} />

							<ReviewSummaryCard
								title="Reviews from contractors"
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
