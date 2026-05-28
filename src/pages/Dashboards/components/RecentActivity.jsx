import { Box, Card, Chip, Paper, Stack, Typography } from "@mui/material";

const sectionSx = (theme) => ({
	p: { xs: 2, sm: 3 },
	height: "100%",
	border: `1px solid ${theme.palette.divider}`,
	bgcolor: "background.paper",
});

const itemSx = (theme) => ({
	position: "relative",
	overflow: "hidden",
	borderRadius: 3,
	p: { xs: 1.75, sm: 2.2 },
	background: theme.custom.dashboardList.cardBackground,
	backdropFilter: "blur(14px)",
	border: theme.custom.dashboardList.cardBorder,
	boxShadow: theme.custom.dashboardList.cardShadow,
	cursor: "pointer",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		width: 7,
		height: "100%",
		background: theme.custom.dashboardList.accent,
	},
});

const itemContentSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
	gap: { xs: 1, sm: 2 },
	alignItems: "start",
};

const chipSx = (theme) => ({
	width: "fit-content",
	fontWeight: 700,
	borderRadius: "10px",
	backgroundColor: theme.custom.dashboardList.chipBackground,
	color: theme.custom.dashboardList.chipColor,
});

export default function RecentActivity({ activities }) {
	return (
		<Paper elevation={0} sx={sectionSx}>
			<Typography variant="h6" sx={{ fontWeight: 800 }}>
				Recent activity
			</Typography>

			<Stack spacing={{ xs: 1.25, sm: 2 }} sx={{ mt: { xs: 2, sm: 3 } }}>
				{activities.map((activity) => (
					<Card key={activity.id} sx={itemSx}>
						<Box sx={itemContentSx}>
							<Box sx={{ minWidth: 0 }}>
								<Typography
									variant="subtitle1"
									noWrap
									sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.2px" }}
								>
									{activity.title}
								</Typography>

								<Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
									{activity.subtitle}
								</Typography>
							</Box>

							<Chip label={activity.meta} size="small" sx={chipSx} />
						</Box>
					</Card>
				))}
			</Stack>
		</Paper>
	);
}
