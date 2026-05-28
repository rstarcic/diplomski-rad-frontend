import { Box, Paper, Stack, Typography } from "@mui/material";

export default function StatsCard({ label, value, subtitle, icon }) {
	return (
		<Paper
			elevation={0}
			sx={(theme) => ({
				p: { xs: 2.25, sm: 3 },
				minWidth: 0,
				position: "relative",
				background: theme.custom.statCard.background,
				border: theme.custom.statCard.border,
			})}
		>
			<Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
				<Box sx={{ minWidth: 0, pr: icon ? 7 : 0 }}>
					<Typography
						variant="overline"
						noWrap
						sx={(theme) => ({
							display: "block",
							color: theme.custom.statCard.mutedColor,
						})}
					>
						{label}
					</Typography>

					<Typography variant="h3" sx={(theme) => ({ color: theme.custom.statCard.color })}>
						{value}
					</Typography>

					<Typography variant="body2" noWrap sx={(theme) => ({ color: theme.custom.statCard.mutedColor })}>
						{subtitle}
					</Typography>
				</Box>

				{icon && (
					<Box
						sx={(theme) => ({
							width: { xs: 38, sm: 44 },
							height: { xs: 38, sm: 44 },
							position: "absolute",
							top: { xs: 16, sm: 18 },
							right: { xs: 18, sm: 24 },
							borderRadius: 2,
							display: "grid",
							placeItems: "center",
							flexShrink: 0,
							color: theme.custom.statCard.iconColor,
						})}
					>
						{icon}
					</Box>
				)}
			</Stack>
		</Paper>
	);
}
