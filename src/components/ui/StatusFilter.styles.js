export const chipRowSx = {
	gap: 1.5,
	flexWrap: { xs: "nowrap", sm: "wrap" },
	overflowX: { xs: "auto", sm: "visible" },
	pb: { xs: 0.5, sm: 0 },
	"&::-webkit-scrollbar": { display: "none" },
	scrollbarWidth: "none",
	"& .MuiChip-root": { flexShrink: 0 },
};

export const createFilterChipSx = (option, selected) => (theme) => {
	const palette = option.paletteKey
		? theme.custom.alerts[option.paletteKey]
		: {
			background: theme.custom.tint.primarySubtle,
			color: theme.palette.primary.main,
			border: theme.custom.tint.primaryBorder,
		};

	return {
		height: 48,
		px: 0.75,
		borderRadius: 999,
		borderWidth: selected ? 1.5 : 1,
		borderColor: palette.border,
		bgcolor: palette.background,
		color: palette.color,
		fontSize: "0.875rem",
		fontWeight: 750,
		boxShadow: selected ? `0 5px 16px ${palette.border}` : "none",
		transition: "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
		"& .MuiChip-icon": {
			ml: 0.75,
			mr: -0.25,
			fontSize: 19,
			color: palette.color,
		},
		"& .MuiChip-label": { px: 1.25 },
		"&:hover": {
			bgcolor: palette.background,
			borderColor: palette.color,
			boxShadow: `0 5px 16px ${palette.border}`,
			transform: "translateY(-1px)",
		},
		"&:active, &.Mui-focusVisible": {
			bgcolor: palette.background,
			borderColor: palette.color,
		},
		WebkitTapHighlightColor: "transparent",
	};
};
