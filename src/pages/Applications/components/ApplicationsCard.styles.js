export const cardSx = (compact = false) => ({
	height: compact ? "auto" : "100%",
	minHeight: compact ? 0 : 410,
	display: "flex",
	flexDirection: "column",
	borderRadius: 3,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
	boxShadow: (theme) => theme.custom.shadows.surface,
	overflow: "hidden",
	transition: "transform 0.2s ease, box-shadow 0.2s ease",
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 16px 38px rgba(37, 48, 82, 0.1)",
	},
});

export const contentSx = (compact = false) => ({
	p: 2.5,
	pb: 2,
	flexGrow: compact ? 0 : 1,
	display: "flex",
	flexDirection: "column",
});

export const bodySx = (compact = false) => ({
	height: compact ? "auto" : "100%",
});

export const contractorButtonSx = {
	display: "flex",
	alignItems: "center",
	gap: 1.75,
	minWidth: 0,
	flex: 1,
	p: 0,
	textAlign: "left",
	justifyContent: "flex-start",
	borderRadius: 2,
	"&:focus-visible": {
		outline: "2px solid",
		outlineColor: "primary.main",
		outlineOffset: 3,
	},
};

export const avatarSx = (tone) => ({
	width: 58,
	height: 58,
	fontSize: "1.5rem",
	fontWeight: 500,
	color: tone.color,
	background: tone.avatar,
	border: `1px solid ${tone.border}`,
	flexShrink: 0,
});

export const metaRowSx = {
	alignItems: "center",
	mt: 0.55,
	minWidth: 0,
	color: "text.secondary",
};

export const noticeSx = (tone) => ({
	display: "flex",
	alignItems: "flex-start",
	gap: 1.25,
	minHeight: 54,
	px: 1.75,
	py: 1.35,
	borderRadius: 2,
	color: tone.color,
	background: tone.background,
	border: `1px solid ${tone.border}`,
	"& .MuiSvgIcon-root": { fontSize: 19, mt: "1px", flexShrink: 0 },
});

export const coverLetterSx = {
	display: "-webkit-box",
	WebkitLineClamp: 1,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
	lineHeight: 1.55,
	color: "text.primary",
};

export const readMoreSx = {
	width: "fit-content",
	minHeight: "auto",
	p: 0,
	mt: 0.25,
	fontSize: "0.875rem",
	fontWeight: 600,
	color: "primary.main",
	justifyContent: "flex-start",
	"&:hover": { bgcolor: "transparent", textDecoration: "underline" },
};

export const appliedRowSx = (compact = false) => ({
	mt: compact ? 1.5 : "auto",
	alignItems: "center",
	gap: 0.8,
	color: "text.secondary",
	"& .MuiSvgIcon-root": { fontSize: 18 },
});

export const footerSx = {
	p: 2.5,
	pt: 0,
	"& .MuiStack-root": { width: "100%" },
	"& .MuiButton-root": { flex: 1, minHeight: 44 },
};

export const actionButtonSx = (statusKey) => ({
	...(statusKey === "accepted" && {
		bgcolor: "#059669",
		"&:hover": { bgcolor: "#047857" },
	}),
	...(statusKey === "rejected" && {
		color: "error.main",
		borderColor: "error.main",
		bgcolor: "background.paper",
		"&:hover": { borderColor: "error.dark", bgcolor: "#fef2f2" },
	}),
});
