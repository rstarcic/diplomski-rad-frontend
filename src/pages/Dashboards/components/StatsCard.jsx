import { Box, Paper, Stack, Typography } from "@mui/material";

import {
	cardSx,
	contentSx,
	decorativeIconSx,
	detailsSx,
	iconWrapSx,
	labelSx,
	subtitleSx,
	valueSx,
} from "./StatsCard.styles";

export default function StatsCard({ label, value, subtitle, Icon, tone = "blue", compact = false }) {
	return (
		<Paper elevation={0} sx={cardSx(tone, compact)}>
			{Icon && !compact && (
				<Box aria-hidden sx={decorativeIconSx(tone)}>
					<Icon />
				</Box>
			)}

			<Stack direction={compact ? "column" : "row"} spacing={compact ? 1 : { xs: 1.5, sm: 2 }} sx={contentSx}>
				{Icon && (
					<Box aria-hidden sx={iconWrapSx(tone, compact)}>
						<Icon />
					</Box>
				)}

				<Box sx={detailsSx}>
					<Typography variant="body2" sx={labelSx}>
						{label}
					</Typography>

					<Typography sx={valueSx(tone)}>{value}</Typography>

					{subtitle && (
						<Typography variant="body2" sx={subtitleSx(tone)}>
							{subtitle}
						</Typography>
					)}
				</Box>
			</Stack>
		</Paper>
	);
}
