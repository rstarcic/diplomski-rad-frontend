export const cardSx = {
	p: { xs: 2.5, sm: 3.5 },
	borderRadius: 2.5,
	border: "1px solid",
	borderColor: "divider",
	boxShadow: "0 8px 24px rgba(37, 48, 82, 0.06)",
	bgcolor: "background.paper",
};

export const featuredCardSx = {
	...cardSx,
	p: { xs: 2.5, sm: 3 },
};

export const headerSx = {
	alignItems: { xs: "center", sm: "flex-start" },
};

export const avatarSx = {
	width: { xs: 110, sm: 136 },
	height: { xs: 110, sm: 136 },
	border: "2px solid",
	borderColor: "primary.light",
	bgcolor: "primary.light",
	flexShrink: 0,
};

export const avatarButtonSx = {
	flexShrink: 0,
	borderRadius: (theme) => theme.custom.radius.circle,

	"&:focus-visible": {
		outline: "3px solid",
		outlineColor: "primary.light",
		outlineOffset: 3,
	},
};

export const profileContentSx = {
	flex: 1,
	minWidth: 0,
};

export const nameRowSx = {
	alignItems: {
		xs: "center",
		sm: "flex-start",
		md: "center",
	},
	mb: 2,
};

export const nameSx = {
	fontWeight: 800,
	fontSize: { xs: "1.4rem", sm: "1.65rem" },
	mb: 2,
	textAlign: { xs: "center", sm: "left" },
};

export const memberSinceBadgeSx = {
	alignItems: "center",
	px: 1.25,
	py: 0.65,
	borderRadius: 99,
	color: "primary.main",
	bgcolor: "rgba(91, 63, 214, 0.08)",
};

export const featuredInfoGridSx = {
	display: "grid",
	gridTemplateColumns: {
		xs: "1fr",
		md: "repeat(2, minmax(0, 1fr))",
	},
	columnGap: 4,
	rowGap: 1.75,
};

export const iconWrapSx = {
	display: "flex",
	alignItems: "center",
	flexShrink: 0,
	mt: "2px",
	color: "primary.main",
};

export const infoRowSx = {
	alignItems: "flex-start",
};

export const infoLabelSx = {
	color: "text.secondary",
	minWidth: 0,
	flexShrink: 0,
};

export const compactInfoSx = {
	alignItems: "center",
	minWidth: 0,
};

export const compactInfoWrapSx = {
	...iconWrapSx,
	mt: 0,
};

export const aboutSx = {
	mt: 3,
	pt: 3,
	borderTop: "1px solid",
	borderColor: "divider",
};

export const dialogPaperSx = {
	m: { xs: 1.5, sm: 3 },
	width: { xs: "calc(100vw - 24px)", sm: "auto" },
	maxWidth: { xs: "calc(100vw - 24px)", sm: 720 },
	maxHeight: "calc(100vh - 24px)",
	overflow: "hidden",
};

export const dialogContentSx = {
	p: { xs: 1.5, sm: 3 },
	overflow: "hidden",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const enlargedImageSx = {
	width: "auto",
	maxWidth: "100%",
	maxHeight: {
		xs: "calc(100vh - 128px)",
		sm: "calc(100vh - 152px)",
	},
	objectFit: "contain",
	display: "block",
};

export const dialogActionsSx = {
	justifyContent: "center",
	p: { xs: 1.5, sm: 3 },
	flexShrink: 0,
};
