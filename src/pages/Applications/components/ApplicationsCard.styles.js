export const cardSx = {
	height: "100%",
	display: "flex",
	flexDirection: "column",
	borderRadius: 4,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
	boxShadow: "0 12px 30px rgba(15, 23, 42, 0.07)",
	transition: "transform 0.2s ease, box-shadow 0.2s ease",
	"&:hover": {
		transform: "translateY(-3px)",
		boxShadow: "0 18px 42px rgba(15, 23, 42, 0.12)",
	},
};

export const headerRowSx = {
	justifyContent: "space-between",
	alignItems: "flex-start",
	gap: 1.5,
};

export const contractorButtonSx = {
	display: "flex",
	alignItems: "center",
	gap: 1.5,
	minWidth: 0,
	flex: 1,
	p: 0.75,
	m: -0.75,
	borderRadius: 2.5,
	textAlign: "left",
	justifyContent: "flex-start",
	"&:hover": {
		bgcolor: "action.hover",
	},
};

export const avatarSx = {
	width: 52,
	height: 52,
	bgcolor: "primary.light",
	flexShrink: 0,
};

export const metaRowSx = {
	alignItems: "center",
	mt: 0.5,
	minWidth: 0,
	color: "text.secondary",
};

export const coverLetterSx = {
	mt: 0.5,
	display: "-webkit-box",
	WebkitLineClamp: 4,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
	lineHeight: 1.65,
};

export const footerSx = {
	justifyContent: "center",
	p: 2,
	pt: 0,
};