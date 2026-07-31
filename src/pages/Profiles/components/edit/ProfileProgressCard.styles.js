export const cardSx = {
	width: { xs: "100%", md: 370 },
	p: 2,
	border: "1px solid rgba(255,255,255,.16)",
	borderRadius: 3,
	color: "primary.contrastText",
	background: "linear-gradient(135deg, rgba(255,255,255,.10), rgba(255,255,255,.055))",
	boxShadow: "inset 0 1px 0 rgba(255,255,255,.08), 0 12px 28px rgba(30,18,92,.16)",
	backdropFilter: "blur(12px)",
};

export const percentageSx = {
	fontSize: "1.05rem",
	fontWeight: 800,
	lineHeight: 1.25,
	color: "white",
};

export const circleSx = (percentage) => ({
	width: 82,
	height: 82,
	borderRadius: "50%",
	p: "6px",
	flexShrink: 0,
	background: `conic-gradient(#ddd6fe ${percentage * 3.6}deg, rgba(255,255,255,0.14) 0deg)`,
	boxShadow: "0 8px 22px rgba(20, 12, 72, .22)",
});

export const circleInnerSx = {
	width: "100%",
	height: "100%",
	borderRadius: "50%",
	display: "grid",
	placeItems: "center",
	background: "linear-gradient(145deg, rgba(92,61,202,.98), rgba(58,36,150,.98))",
	boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)",
};

export const mutedTextSx = (theme) => ({
	color: theme.custom.profileProgress.mutedText,
	fontWeight: 500,
});
