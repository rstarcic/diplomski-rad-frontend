import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";

import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import PageHeader from "../../components/ui/PageHeader";
import ProfileDetailsSection from "./components/edit/ProfileDetailsSection";
import ProfileImageUpload from "./components/edit/ProfileImageUpload";
import ProfileProgressCard from "./components/edit/ProfileProgressCard";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import PortfolioCard from "./components/shared/PortfolioCard";

import { reviewCriteria } from "../../components/reviews/reviewCriteria";
import { contractorProfileReviewData } from "../../mock/ProfileReviews";

import pageSx from "../../theme/layout";
import SkillsCard from "./components/shared/SkillsCard";

const initialProfileData = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	country: "",
	city: "",
	about: "",
	image: null,

	skills: ["React", "JavaScript", "Material UI", "Node.js", "REST API", "Git"],

	portfolio: [
		{
			title: "Job Platform Dashboard",
			description: "A responsive dashboard for managing jobs, applications, and contracts.",
			url: "https://github.com/example/job-platform",
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
		},
		{
			title: "Portfolio Website",
			description: "Personal portfolio website with projects, skills, and contact information.",
			url: "https://example.com/portfolio",
			image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop",
		},
		{
			title: "Task Management App",
			description: "A task tracking app with project boards, deadlines, and team collaboration.",
			url: "https://github.com/example/task-app",
			image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
		},
		{
			title: "Task Management App",
			description: "A task tracking app with project boards, deadlines, and team collaboration.",
			url: "https://github.com/example/task-app",
			image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop",
		},
	],
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

	const handleAddSkill = (skill) =>
		setProfileData((prev) => ({
			...prev,
			skills: [...prev.skills, { id: skill.id ?? crypto.randomUUID(), name: skill.name }],
		}));

	const handleRemoveSkill = (skill) =>
		setProfileData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== skill.id) }));

	const handleAddPortfolioItem = (item) =>
		setProfileData((prev) => ({
			...prev,
			portfolio: [...prev.portfolio, { id: crypto.randomUUID(), ...item }],
		}));

	const handleRemovePortfolioItem = (item) =>
		setProfileData((prev) => ({ ...prev, portfolio: prev.portfolio.filter((p) => p.id !== item.id) }));

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
						<Stack spacing={3}>
							<ProfileDetailsSection
								profileData={profileData}
								updateField={updateField}
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
								onRemoveItem={handleRemovePortfolioItem}
							/>
						</Stack>
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
