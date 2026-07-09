export const cardSx = {
	p: { xs: 2.5, sm: 3.5 },
	borderRadius: 3,
	boxShadow: "0 2px 16px rgba(15,23,42,0.07)",
	bgcolor: "background.paper",
};

export const headerSx = {
	alignItems: { xs: "center", sm: "flex-start" },
};

export const avatarSx = {
	width: { xs: 110, sm: 150 },
	height: { xs: 110, sm: 150 },
	border: "4px solid",
	borderColor: "primary.light",
	bgcolor: "primary.light",
	flexShrink: 0,
};

export const clickableAvatarSx = {
	...avatarSx,
	cursor: "zoom-in",
};

export const nameSx = {
	fontWeight: 800,
	fontSize: { xs: "1.4rem", sm: "1.65rem" },
	mb: 2,
	textAlign: { xs: "center", sm: "left" },
};

export const infoRowSx = {
	alignItems: "flex-start",
};

export const infoLabelSx = {
	color: "text.secondary",
	minWidth: 120,
	flexShrink: 0,
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
