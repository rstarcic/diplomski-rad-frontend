const getTone = (theme, tone) => theme.custom.dashboardStats.tones[tone] ?? theme.custom.dashboardStats.tones.blue;

export const cardSx =
	(tone, compact = false) =>
	(theme) => ({
		position: "relative",
		minWidth: 0,
		minHeight: compact ? 154 : theme.custom.dashboardStats.card.minHeight,
		p: theme.custom.dashboardStats.card.padding,
		overflow: "hidden",
		border: "1px solid",
		borderColor: theme.custom.dashboardStats.card.border,
		borderRadius: theme.custom.dashboardStats.card.borderRadius,
		bgcolor: theme.custom.dashboardStats.card.background,
		boxShadow: theme.custom.dashboardStats.card.shadow,
		transition: "transform 180ms ease, box-shadow 180ms ease",
		...(!compact && {
			"&::before": {
				content: '""',
				position: "absolute",
				inset: "0 auto 0 0",
				width: 4,
				bgcolor: getTone(theme, tone).accent,
			},
		}),
		"&:hover": {
			transform: "translateY(-2px)",
			boxShadow: theme.custom.dashboardStats.card.hoverShadow,
		},
	});

export const contentSx = {
	position: "relative",
	zIndex: 1,
	alignItems: "flex-start",
};

export const iconWrapSx =
	(toneName, compact = false) =>
	(theme) => {
		const tone = getTone(theme, toneName);

		return {
			width: compact ? 36 : { xs: 46, sm: 54 },
			height: compact ? 36 : { xs: 46, sm: 54 },
			borderRadius: compact ? 2 : 3,
			display: "grid",
			placeItems: "center",
			flexShrink: 0,
			color: tone.iconColor,
			background: tone.iconBackground,
			"& svg": {
				fontSize: compact ? 20 : { xs: 24, sm: 28 },
			},
		};
	};

export const detailsSx = {
	minWidth: 0,
	flex: 1,
};

export const labelSx = {
	color: "text.primary",
	fontWeight: 800,
	lineHeight: 1.3,
};

export const valueSx = (tone) => (theme) => ({
	mt: 1,
	color: getTone(theme, tone).value,
	fontWeight: 800,
	fontSize: "clamp(1.65rem, 2.3vw, 2.25rem)",
	lineHeight: 1.1,
	letterSpacing: "-0.025em",
	whiteSpace: "nowrap",
});

export const subtitleSx = (toneName) => (theme) => {
	const tone = getTone(theme, toneName);

	return {
		mt: 1.25,
		display: "inline-flex",
		maxWidth: "100%",
		px: 1.5,
		py: 0.75,
		borderRadius: 2.5,
		color: tone.value,
		bgcolor: tone.soft,
		fontWeight: 700,
		lineHeight: 1.3,
	};
};

export const decorativeIconSx = (tone) => (theme) => ({
	position: "absolute",
	top: 10,
	right: 12,
	color: getTone(theme, tone).accent,
	opacity: 0.075,
	transform: "rotate(8deg)",
	"& svg": {
		fontSize: { xs: 52, sm: 62 },
	},
});
