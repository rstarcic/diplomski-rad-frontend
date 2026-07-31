export const pageSx = (theme) => ({
	minHeight: "100vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
	px: 3,
	position: "relative",
	overflow: "hidden",
	background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.light} 100%)`,
});

export const blobTopSx = {
	position: "fixed",
	top: -120,
	right: -120,
	width: 420,
	height: 420,
	borderRadius: "50%",
	bgcolor: "rgba(255,255,255,0.06)",
	pointerEvents: "none",
};

export const blobBottomSx = {
	position: "fixed",
	bottom: -160,
	left: -160,
	width: 520,
	height: 520,
	borderRadius: "50%",
	bgcolor: "rgba(255,255,255,0.04)",
	pointerEvents: "none",
};

export const logoWrapSx = {
	mb: 7,
};

export const iconFloatSx = {
	"@keyframes float": {
		"0%, 100%": { transform: "translateY(0px)" },
		"50%": { transform: "translateY(-12px)" },
	},
	animation: "float 3.2s ease-in-out infinite",
	mb: 4,
};

export const iconCircleSx = {
	width: 100,
	height: 100,
	borderRadius: "50%",
	bgcolor: "rgba(255,255,255,0.14)",
	backdropFilter: "blur(6px)",
	border: "1.5px solid rgba(255,255,255,0.22)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export const iconSx = {
	fontSize: 54,
	color: "#fff",
};

export const titleSx = {
	color: "#fff",
	letterSpacing: "-0.02em",
	mb: 1.5,
};

export const descriptionSx = {
	color: "rgba(255,255,255,0.72)",
	maxWidth: 360,
	lineHeight: 1.65,
	mb: 5,
};

export const buttonSx = (theme) => ({
	bgcolor: "#fff",
	color: theme.palette.primary.main,
	fontWeight: 700,
	borderRadius: 99,
	px: 4,
	py: 1.4,
	boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
	"&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
});
