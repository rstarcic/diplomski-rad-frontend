import { Box, Paper, Stack, Typography } from "@mui/material";

const cardSx = {
	p: { xs: 2, sm: 2.25 },
	minWidth: 0,
	borderRadius: 3,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
	boxShadow: "0 10px 26px rgba(15, 23, 42, 0.06)",
};

const iconWrapSx = (accent) => ({
	width: 38,
	height: 38,
	borderRadius: "50%",
	display: "grid",
	placeItems: "center",
	flexShrink: 0,
	color: accent,
	bgcolor: `${accent}14`,
	"& svg": {
		fontSize: 21,
	},
});

const labelSx = {
	color: "text.secondary",
	fontWeight: 750,
	lineHeight: 1.2,
};

const valueSx = {
	mt: 0.75,
	color: "text.primary",
	fontWeight: 700,
	fontSize: { xs: "2rem", sm: "2.25rem" },
	lineHeight: 1.2,
};

const subtitleSx = {
	mt: 0.5,
	color: "text.secondary",
	lineHeight: 1.3,
};

export default function StatsCard({ label, value, subtitle, icon, accent = "#6c47ff" }) {
	return (
		<Paper elevation={0} sx={cardSx}>
			<Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
				<Box sx={{ minWidth: 0 }}>
					<Typography variant="body2" sx={labelSx}>
						{label}
					</Typography>

					<Typography sx={valueSx}>{value}</Typography>

					{subtitle && (
						<Typography variant="body2" sx={subtitleSx}>
							{subtitle}
						</Typography>
					)}
				</Box>

				{icon && <Box sx={iconWrapSx(accent)}>{icon}</Box>}
			</Stack>
		</Paper>
	);
}
