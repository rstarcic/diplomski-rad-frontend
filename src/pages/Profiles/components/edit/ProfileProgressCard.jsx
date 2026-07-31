import { Box, Stack, Typography } from "@mui/material";
import { cardSx, circleInnerSx, circleSx, mutedTextSx, percentageSx } from "./ProfileProgressCard.styles";
import { getProfileCompletion } from "./profileCompletion";

export default function ProfileProgressCard({ profileData = {}, requiredFields }) {
	const { completedCount, totalCount, completionPercent, isComplete } = getProfileCompletion(profileData, requiredFields);

	const statusText = isComplete
		? "Your profile is complete and ready to use."
		: `${completedCount} of ${totalCount} required fields completed`;

	return (
		<Box sx={cardSx}>
			<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
				<Box sx={circleSx(completionPercent)} aria-label={`Profile completion ${completionPercent}%`}>
					<Box sx={circleInnerSx}>
						<Typography sx={percentageSx}>{completionPercent}%</Typography>
					</Box>
				</Box>

				<Box sx={{ flex: 1 }}>
					<Typography variant="subtitle2" sx={{ color: "white", mb: 0.5 }}>Profile completion</Typography>
					<Typography variant="body2" sx={mutedTextSx}>{statusText}</Typography>
				</Box>

			</Stack>
		</Box>
	);
}
