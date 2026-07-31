export const actionCardSx = (clickable) => (theme) => ({
	position: "relative",
	overflow: "hidden",
	p: { xs: 2, sm: 2.5 },
	border: "1px solid",
	borderColor: clickable
		? theme.custom.dashboardAction.border
		: "divider",
	borderRadius: 3,
	background: theme.custom.dashboardAction.background,
	boxShadow: theme.custom.dashboardAction.shadow,
	color: "inherit",
	textDecoration: "none",
	cursor: clickable ? "pointer" : "default",
	transition:
		"transform 180ms ease, box-shadow 180ms ease",
	"&::before": {
		content: '""',
		position: "absolute",
		inset: "0 auto 0 0",
		width: 5,
		bgcolor: theme.custom.dashboardAction.accent,
	},
	...(clickable && {
		"&:hover": {
			transform: "translateY(-2px)",
			boxShadow:
				theme.custom.dashboardAction.hoverShadow,
		},
	}),
});

export const actionContentSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
	gap: { xs: 1.5, sm: 3 },
	alignItems: "center",
};

export const actionTextSx = {
	minWidth: 0,
};

export const eyebrowSx = (theme) => ({
	display: "flex",
	alignItems: "center",
	gap: 0.5,
	color: theme.custom.dashboardAction.eyebrow,
	fontWeight: 900,
});

export const actionTitleSx = {
	mt: 0.5,
	color: "text.primary",
	fontWeight: 800,
};

export const jobTitleSx = {
	mt: 0.25,
	color: "text.primary",
	fontWeight: 600,
};

export const actionSubtitleSx = {
	mt: 0.5,
	color: "text.secondary",
	lineHeight: 1.5,
};

export const actionAsideSx = {
	display: "flex",
	flexDirection: { xs: "row", sm: "column" },
	alignItems: { xs: "center", sm: "flex-end" },
	justifyContent: "space-between",
	gap: 1.25,
};

export const priorityChipSx = (theme) => ({
	width: "fit-content",
	fontWeight: 700,
	borderRadius: 2,
	backgroundColor: theme.custom.dashboardAction.badgeBackground,
	color: theme.custom.dashboardAction.badgeColor,
});

export const actionCtaSx = {
	display: "inline-flex",
	alignItems: "center",
	gap: 0.25,
	color: "primary.main",
	fontWeight: 800,
};
