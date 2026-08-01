import { Box, Stack, Typography } from "@mui/material";

import { cardSx, circleInnerSx, circleSx, mutedTextSx, percentageSx } from "./ProfileProgressCard.styles";
import { getProfileCompletion } from "./profileCompletion";

export default function ProfileProgressCard({ profileData = {}, requiredFields }) {
	const { completedCount, totalCount, completionPercent, isComplete } = getProfileCompletion(
		profileData,
		requiredFields,
	);

	const statusText = isComplete
		? "Your profile is complete and ready to use."
		: `${completedCount} of ${totalCount} required fields completed`;

	return (
		<Box sx={cardSx}>
			<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
				<Box
					role="progressbar"
					aria-label="Profile completion"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={completionPercent}
					sx={circleSx(completionPercent)}
				>
					<Box sx={circleInnerSx}>
						<Typography sx={percentageSx}>{completionPercent}%</Typography>
					</Box>
				</Box>

				<Box sx={{ flex: 1 }}>
					<Typography variant="subtitle2" color="common.white" sx={{ mb: 0.5 }}>
						Profile completion
					</Typography>

					<Typography variant="body2" sx={mutedTextSx}>
						{statusText}
					</Typography>
				</Box>
			</Stack>
		</Box>
	);
}
