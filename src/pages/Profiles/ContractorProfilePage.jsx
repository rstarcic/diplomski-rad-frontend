import { Box, Grid, Stack } from "@mui/material";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import { reviewCriteria } from "../../components/reviews/reviewCriteria.config";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import AppAlert from "../../components/ui/AppAlert";
import PageHeader from "../../components/ui/PageHeader";
import { REQUIRED_PROFILE_FIELDS } from "./components/edit/profileFields.config";
import ProfileDetailsSection from "./components/edit/ProfileDetailsSection";
import ProfileImageUpload from "./components/edit/ProfileImageUpload";
import ProfileProgressCard from "./components/edit/ProfileProgressCard";
import PortfolioCard from "./components/shared/PortfolioCard";
import SkillsCard from "./components/shared/SkillsCard";
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
	skills: [],
	portfolio: [],
};

export default function ContractorProfilePage() {
	const {
		profileData,
		setProfileData,
		reviewData,
		loadError,
		saveError,
		success,
		saving,
		updateField,
		updateImage,
		saveProfile,
	} = useEditableProfile(emptyProfileData);

	const handleAddSkill = (skill) => {
		setProfileData((prev) => ({
			...prev,
			skills: [...prev.skills, { id: skill.id ?? crypto.randomUUID(), name: skill.name ?? skill }],
		}));
	};

	const handleRemoveSkill = (skill) => {
		setProfileData((prev) => ({
			...prev,
			skills: prev.skills.filter((item) => {
				if (item.id && skill.id) return item.id !== skill.id;

				return (item.name ?? item) !== (skill.name ?? skill);
			}),
		}));
	};

	const handleAddPortfolioItem = (item) => {
		setProfileData((prev) => ({
			...prev,
			portfolio: [...prev.portfolio, { id: crypto.randomUUID(), ...item }],
		}));
	};

	const handleRemovePortfolioItem = (item) => {
		setProfileData((prev) => ({
			...prev,
			portfolio: prev.portfolio.filter((portfolioItem) => portfolioItem.id !== item.id),
		}));
	};

	const handleUpdatePortfolioItem = (item) => {
		setProfileData((prev) => ({
			...prev,
			portfolio: prev.portfolio.map((portfolioItem) =>
				portfolioItem.id === item.id ? { ...portfolioItem, ...item } : portfolioItem,
			),
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await saveProfile();
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	return (
		<Box>
			<PageHeader
				label="Your profile"
				title="Contractor Profile"
				subtitle="Complete your profile before applying for jobs and starting contracts."
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
						<Stack spacing={3}>
							<ProfileDetailsSection
								profileData={profileData}
								updateField={updateField}
								saving={saving}
								aboutPlaceholder="Write a short introduction for contractors."
							/>
							<SkillsCard
								editable
								icon={<PsychologyRoundedIcon />}
								skills={profileData.skills}
								onAddSkill={handleAddSkill}
								onRemoveSkill={handleRemoveSkill}
							/>
							<PortfolioCard
								editable
								icon={<WorkspacePremiumRoundedIcon />}
								items={profileData.portfolio}
								onAddItem={handleAddPortfolioItem}
								onUpdateItem={handleUpdatePortfolioItem}
								onRemoveItem={handleRemovePortfolioItem}
							/>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 5 }}>
						<Stack spacing={3}>
							<ProfileImageUpload image={profileData.image} onImageChange={updateImage} />
							<ReviewSummaryCard
								title="Reviews from clients"
								summary={reviewData.summary}
								criteria={reviewCriteria.contractor}
								reviews={reviewData.reviews}
							/>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
