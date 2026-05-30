import { Box, Stack, Typography, LinearProgress } from "@mui/material";

const requiredProfileFields = [
	{ key: "firstName", label: "First name" },
	{ key: "lastName", label: "Last name" },
	{ key: "email", label: "Email" },
	{ key: "phone", label: "Phone" },
	{ key: "country", label: "Country" },
	{ key: "city", label: "City" },
	{ key: "about", label: "About you" },
	{ key: "image", label: "Image" },
];

const hasValue = (value) => {
	if (typeof value === "string") {
		return value.trim().length > 0;
	}

	return Boolean(value);
};

const getProfileCompletion = (profileData = {}) => {
	const completedFields = requiredProfileFields.filter((field) => hasValue(profileData[field.key]));
	const missingFields = requiredProfileFields.filter((field) => !hasValue(profileData[field.key]));
	const totalCount = requiredProfileFields.length;
	const completedCount = completedFields.length;
	const completionPercent = Math.round((completedCount / totalCount) * 100);

	return {
		completedCount,
		totalCount,
		completionPercent,
		isComplete: missingFields.length === 0,
		missingFields,
	};
};

const cardSx = {
	p: { xs: 2, sm: 3 },
	borderRadius: { xs: 3, sm: 4 },
	color: "primary.contrastText",
	background: "linear-gradient(135deg, #6C4DF6 0%, #8E6CFF 55%, #B18CFF 100%)",
	boxShadow: {
		xs: "0 12px 28px rgba(108, 77, 246, 0.22)",
		sm: "0 18px 45px rgba(108, 77, 246, 0.28)",
	},
};

const progressSx = {
	height: { xs: 8, sm: 10 },
	borderRadius: 999,
	bgcolor: "rgba(255,255,255,0.24)",
	"& .MuiLinearProgress-bar": {
		borderRadius: 999,
		bgcolor: "#fff",
	},
};

const mutedTextSx = {
	color: "rgba(255,255,255,0.84)",
	fontWeight: 600,
};

export default function ProfileProgressCard({ profileData = {} }) {
	const { completedCount, totalCount, completionPercent, isComplete } = getProfileCompletion(profileData);

	const statusText = isComplete
		? "Your profile is complete and ready to use."
		: `${completedCount} of ${totalCount} required fields completed`;

	return (
		<Box sx={cardSx}>
			<Stack spacing={2}>
				<Box>
					<Typography variant="overline" sx={{ fontWeight: 800 }}>
						Profile completion
					</Typography>

					<Typography
						variant="h2"
						sx={{
							fontSize: { xs: "2.25rem", sm: "3.75rem" },
							fontWeight: 950,
							lineHeight: 0.95,
							mt: 0.5,
						}}
					>
						{completionPercent}%
					</Typography>
				</Box>

				<LinearProgress
					variant="determinate"
					value={completionPercent}
					sx={progressSx}
					aria-label={`Profile completion ${completionPercent}%`}
				/>

				<Stack spacing={0.5}>
					<Typography variant="body2" sx={mutedTextSx}>
						{statusText}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
}
