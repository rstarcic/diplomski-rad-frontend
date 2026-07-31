export const rootSx = (theme) => ({
	minHeight: "100vh",
	display: "grid",
	placeItems: "center",
	bgcolor: "background.default",
	px: theme.custom.auth.page.paddingX,
	py: theme.custom.auth.page.paddingY,
});

export const cardSx = (theme) => ({
	width: "100%",
	maxWidth: theme.custom.auth.card.maxWidth,
	minHeight: theme.custom.auth.card.minHeight,
	display: "grid",
	gridTemplateColumns: theme.custom.auth.card.columns,
	overflow: "hidden",
	border: "1px solid",
	borderColor: theme.custom.auth.card.border,
	boxShadow: theme.custom.auth.card.shadow,
});

export const visualPanelSx = (theme) => ({
	minHeight: { xs: 220, md: "auto" },
	display: { xs: "none", sm: "flex" },
	flexDirection: "column",
	justifyContent: "space-between",
	p: { xs: 4, md: 5 },
	color: theme.custom.auth.side.color,
	background: theme.custom.auth.side.background,
});

export const visualCopySx = {
	my: 4,
};

export const visualTitleSx = (theme) => ({
	color: "inherit",
	fontSize: theme.custom.auth.side.titleFontSize,
	fontWeight: theme.custom.auth.side.titleFontWeight,
	lineHeight: 1.2,
});

export const visualDescriptionSx = (theme) => ({
	mt: 1.5,
	maxWidth: 320,
	color: theme.custom.auth.side.descriptionColor,
	fontSize: theme.custom.auth.side.descriptionFontSize,
});

export const ctaButtonSx = {
	width: "fit-content",
	justifyContent: "flex-start",
	borderColor: "rgba(255,255,255,0.6)",
	color: "inherit",
};

export const formPanelSx = {
	display: "flex",
	alignItems: "center",
	p: { xs: 3, md: 5 },
};

export const formContentSx = (theme) => ({
	width: "100%",
	maxWidth: theme.custom.auth.form.maxWidth,
	mx: "auto",
});

export const formTitleSx = (theme) => ({
	color: theme.custom.auth.form.titleColor,
	fontSize: theme.custom.auth.form.titleFontSize,
	fontWeight: theme.custom.auth.form.titleFontWeight,
});

export const formSubtitleSx = (theme) => ({
	mt: 0.5,
	mb: 3,
	color: theme.custom.auth.form.subtitleColor,
	fontSize: theme.custom.auth.form.subtitleFontSize,
});
