import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";

import PageHeader from "../../components/ui/PageHeader";
import ProfileDetailsSection from "./components/ProfileDetailsSection";
import ProfileImageUpload from "./components/ProfileImageUpload";
import ProfileProgressCard from "./components/ProfileProgressCard";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/reviewCriteria";
import { contractorProfileReviewData } from "../../mock/ProfileReviews";
import pageSx from "../../theme/layout";

const initialProfileData = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	country: "",
	city: "",
	about: "",
	image: null,
};

export default function ContractorProfilePage() {
	const [profileData, setProfileData] = useState(initialProfileData);

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

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData();

		Object.entries(profileData).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				formData.append(key, value);
			}
		});

		// await api.post("/profile", formData)
	};

	return (
		<Box sx={pageSx}>
			<PageHeader
				label="Settings"
				title="Contractor Profile"
				subtitle="Complete your profile before publishing jobs and starting contracts."
			>
				<ProfileProgressCard profileData={profileData} />
			</PageHeader>

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
								title="Reviews from clients"
								summary={contractorProfileReviewData.summary}
								criteria={reviewCriteria.contractor}
								reviews={contractorProfileReviewData.reviews}
							/>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
