const getTone = (theme, tone) =>
	theme.custom.dashboardStats.tones[tone] ??
	theme.custom.dashboardStats.tones.blue;

export const itemSx = (clickable) => (theme) => ({
	position: "relative",
	overflow: "hidden",
	p: theme.custom.dashboardActivity.item.padding,
	border: "1px solid",
	borderColor:
		theme.custom.dashboardActivity.item.border,
	borderRadius:
		theme.custom.dashboardActivity.item.borderRadius,
	bgcolor:
		theme.custom.dashboardActivity.item.background,
	boxShadow:
		theme.custom.dashboardActivity.item.shadow,
	color: "inherit",
	textDecoration: "none",
	cursor: clickable ? "pointer" : "default",
	transition:
		"transform 180ms ease, box-shadow 180ms ease",
	...(clickable && {
		"&:hover": {
			transform: "translateY(-1px)",
			boxShadow:
				theme.custom.dashboardActivity.item
					.hoverShadow,
		},
	}),
});

export const itemContentSx = {
	display: "grid",
	gridTemplateColumns: {
		xs: "auto minmax(0, 1fr)",
		sm: "auto minmax(0, 1fr) auto",
	},
	gap: { xs: 1.25, sm: 1.5 },
	alignItems: "center",
};

export const iconWrapSx = (toneName) => (theme) => {
	const tone = getTone(theme, toneName);

	return {
		width: theme.custom.dashboardActivity.icon.size,
		height: theme.custom.dashboardActivity.icon.size,
		display: "grid",
		placeItems: "center",
		flexShrink: 0,
		borderRadius: theme.custom.dashboardActivity.icon.borderRadius,
		color: tone.iconColor,
		bgcolor: tone.soft,
		"& svg": {
			fontSize: 22,
		},
	};
};

export const activityTextSx = {
	minWidth: 0,
};

export const titleSx = {
	fontWeight: 800,
	color: "text.primary",
	letterSpacing: "-0.01em",
	lineHeight: 1.35,
};

export const subtitleSx = {
	color: "text.secondary",
	lineHeight: 1.5,
};

export const metaChipSx = (theme) => ({
	gridColumn: { xs: 2, sm: "auto" },
	width: "fit-content",
	fontWeight: 700,
	borderRadius: 2,
	backgroundColor: theme.custom.dashboardActivity.meta.background,
	color: theme.custom.dashboardActivity.meta.color,
});

export const sectionHeaderSx = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: 2,
};

export const viewAllButtonSx = {
	flexShrink: 0,
	fontWeight: 800,
};
