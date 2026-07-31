const getStatusColor = (theme, paletteKey) =>
	theme.palette[paletteKey]?.main ??
	theme.palette.primary.main;

export const cardSx = (paletteKey) => (theme) => ({
	position: "relative",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	borderRadius: 3,
	border: "1px solid",
	borderColor: "divider",
	boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
	bgcolor: "background.paper",
	transition: "transform 180ms ease, box-shadow 180ms ease",
	"&::before": {
		content: '""',
		position: "absolute",
		inset: "0 auto 0 0",
		width: 4,
		bgcolor: getStatusColor(theme, paletteKey),
	},
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 15px 36px rgba(15, 23, 42, 0.1)",
	},
});

export const cardContentSx = {
	p: { xs: 2, sm: 2.5 },
	flexGrow: 1,
	"&:last-child": {
		pb: { xs: 2, sm: 2.5 },
	},
};

export const headerRowSx = {
	alignItems: "flex-start",
	justifyContent: "space-between",
};

export const titleWrapSx = {
	minWidth: 0,
};

export const clientButtonSx = {
	display: "flex",
	justifyContent: "flex-start",
	gap: 1.25,
	minWidth: 0,
	textAlign: "left",
	borderRadius: 2,
	"&:hover": {
		bgcolor: "action.hover",
	},
};

export const avatarSx = {
	width: 40,
	height: 40,
	flexShrink: 0,
	bgcolor: "primary.light",
};

export const clientDetailsSx = {
	minWidth: 0,
};

export const clientNameSx = {
	fontWeight: 800,
};

export const metaRowSx = {
	alignItems: "center",
	color: "text.secondary",
};

export const locationIconSx = {
	fontSize: 15,
};

export const coverLetterSx = {
	display: "-webkit-box",
	WebkitLineClamp: 3,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
};

export const footerSx = {
	p: { xs: 2, sm: 2.5 },
	pt: 0,
};

export const actionRowSx = {
	width: "100%",
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	gap: 1,
	"& > *": {
		flex: "1 1 140px",
	},
};

export const actionButtonSx = {
	width: "100%",
};
