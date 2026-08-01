import { Box, Grid, Stack } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import PageHeader from "../../components/ui/PageHeader";
import AppAlert from "../../components/ui/AppAlert";
import ProfileDetailsSection from "./components/edit/ProfileDetailsSection";
import ProfileImageUpload from "./components/edit/ProfileImageUpload";
import ProfileProgressCard from "./components/edit/ProfileProgressCard";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";

import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import { REQUIRED_PROFILE_FIELDS } from "./components/edit/profileFields.config";
import { useEditableProfile } from "./hooks/useEditableProfile";

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

export default function ClientProfilePage() {
	const {
		profileData,
		reviewData,
		loadError,
		saveError,
		success,
		saving,
		updateField,
		updateImage,
		saveProfile,
	} = useEditableProfile(emptyProfileData);

	const handleSubmit = async (event) => {
		event.preventDefault();

		await saveProfile();
	};

	return (
		<Box>
			<PageHeader
				label="Your profile"
				title="Client Profile"
				subtitle="Complete your profile before publishing jobs and starting contracts."
			>
				<ProfileProgressCard profileData={profileData} requiredFields={REQUIRED_PROFILE_FIELDS} />
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
