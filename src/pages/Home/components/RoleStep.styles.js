export const rowSx = {
	alignItems: "center",
};

export const iconSx = (color, background) => (theme) => ({
	width: theme.custom.home.rolePanel.step.iconSize,
	height: theme.custom.home.rolePanel.step.iconSize,
	flex: "0 0 auto",
	display: "grid",
	placeItems: "center",
	borderRadius: theme.custom.home.rolePanel.step.iconRadius,
	color,
	bgcolor: background,
	"& svg": {
		fontSize: theme.custom.home.rolePanel.step.iconGlyphSize,
	},
});

export const titleSx = (theme) => ({
	color: theme.custom.home.rolePanel.step.titleColor,
	fontFamily: theme.typography.h6.fontFamily,
	fontWeight: theme.typography.h6.fontWeight,
	letterSpacing: theme.typography.h6.letterSpacing,
});

export const textSx = (theme) => ({
	mt: 0.25,
	color: theme.custom.home.rolePanel.step.textColor,
});
