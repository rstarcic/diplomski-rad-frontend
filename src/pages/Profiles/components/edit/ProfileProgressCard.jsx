import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import { cardSx, mutedTextSx, percentageSx, progressSx } from "./ProfileProgressCard.styles";
import { getProfileCompletion } from "./profileCompletion";

export default function ProfileProgressCard({ profileData = {}, requiredFields }) {
	const { completedCount, totalCount, completionPercent, isComplete } = getProfileCompletion(profileData, requiredFields);

	const statusText = isComplete
		? "Your profile is complete and ready to use."
		: `${completedCount} of ${totalCount} required fields completed`;

	return (
		<Box sx={cardSx}>
			<Stack spacing={2}>
				<Box>
					<Typography variant="overline" fontWeight={800}>
						Profile completion
					</Typography>

					<Typography variant="h2" sx={percentageSx}>
						{completionPercent}%
					</Typography>
				</Box>

				<LinearProgress
					variant="determinate"
					value={completionPercent}
					sx={progressSx}
					aria-label={`Profile completion ${completionPercent}%`}
				/>

				<Typography variant="body2" sx={mutedTextSx}>
					{statusText}
				</Typography>
			</Stack>
		</Box>
	);
}
