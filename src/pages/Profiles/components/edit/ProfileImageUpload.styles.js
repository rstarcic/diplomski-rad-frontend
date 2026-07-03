import { surfaceSectionSx } from "../../../../theme/layout";

export const avatarSx = {
	width: 98,
	height: 98,
	mx: "auto",
	mb: 2,
	bgcolor: "primary.light",
	color: "primary.contrastText",
};

export const imagePreviewSx = {
	width: 98,
	height: 98,
	mx: "auto",
	mb: 2,
	borderRadius: "50%",
	objectFit: "cover",
	display: "block",
	cursor: "zoom-in",
};

export const centeredSectionSx = {
	...surfaceSectionSx,
	textAlign: "center",
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
