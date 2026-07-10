export const headerSx = (theme) => ({
	position: "relative",
	overflow: "hidden",
	border: theme.custom.pageHeader.border,
	borderRadius: theme.custom.pageHeader.borderRadius,
	background: theme.custom.pageHeader.background,
	color: theme.custom.pageHeader.color,
	boxShadow: theme.custom.pageHeader.shadow,
	p: { xs: 2.25, sm: 3, md: 4 },
});

export const contentSx = {
	position: "relative",
	zIndex: 1,
	maxWidth: { xs: "100%", md: 760 },
};

export const labelSx = (theme) => ({
	color: theme.custom.pageHeader.label,
	fontWeight: 800,
});

export const titleSx = {
	fontSize: { xs: "2rem", sm: "2.6rem", md: "3.15rem" },
	lineHeight: 1.08,
	fontWeight: 900,
};

export const subtitleSx = (theme) => ({
	mt: 1,
	color: theme.custom.pageHeader.subtitle,
	fontSize: { xs: "0.9rem", sm: "1rem" },
});

export const searchBarSx = {
	position: "relative",
	zIndex: 1,
	mt: 3,
	p: 1,
	borderRadius: 2,
	bgcolor: "rgba(255, 255, 255, 0.94)",
	display: "grid",
	gridTemplateColumns: {
		xs: "1fr",
		sm: "minmax(0, 1fr) auto",
	},
	gap: 1,
	alignItems: "center",
};

export const searchFieldSx = {
	width: "100%",
	"& .MuiOutlinedInput-root": {
		"& fieldset": { border: "none" },
		"&:hover fieldset": { border: "none" },
		"&.Mui-focused fieldset": { border: "none" },
	},
};

export const searchButtonSx = {
	justifySelf: { xs: "end", sm: "auto" },
	px: 2.5,
	whiteSpace: "nowrap",
};
