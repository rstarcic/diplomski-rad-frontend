export const headerSx = (theme) => ({
	display: "flex",
	justifyContent: "space-between",
	flexDirection: { xs: "column", md: "row" },
	alignItems: { xs: "flex-start", md: "center" },
	gap: { xs: 2, md: 3 },
	p: { xs: 2.25, sm: 3, md: 4 },
	border: theme.custom.pageHeader.border,
	borderRadius: theme.custom.pageHeader.borderRadius,
	background: theme.custom.pageHeader.background,
	color: theme.custom.pageHeader.color,
	boxShadow: theme.custom.pageHeader.shadow,
	minHeight: theme.custom.pageHeader.minHeight,
});

export const labelSx = (theme) => ({
	color: theme.custom.pageHeader.label,
});

export const titleSx = {
	maxWidth: 900,
};

export const subtitleSx = (theme) => ({
	mt: 1,
	maxWidth: 680,
	color: theme.custom.pageHeader.subtitle,
	fontSize: { xs: "0.9rem", sm: "1rem" },
});

export const actionsSx = {
	display: "flex",
	alignItems: "center",
	gap: 1.5,
	width: { xs: "100%", md: "auto" },
	flexWrap: "wrap",
	justifyContent: { xs: "flex-start", md: "flex-end" },
	flexShrink: 0,
};
