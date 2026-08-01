import { surfaceSectionSx } from "../../../../theme/layout";

export const centeredSectionSx = {
	...surfaceSectionSx,
	boxShadow: (theme) => theme.custom.shadows.surface,
};

export const sectionContentSx = {
	alignItems: "center",
	justifyContent: "space-between",
};

export const headerSx = {
	alignItems: "center",
	mb: 0.5,
};

export const headerIconSx = {
	width: 42,
	height: 42,
	borderRadius: (theme) => theme.custom.radius.circle,
	display: "grid",
	placeItems: "center",
	flexShrink: 0,
	color: "primary.main",
	bgcolor: "rgba(91, 63, 214, 0.1)",
};

export const descriptionSx = {
	mb: 2,
	maxWidth: 250,
};

export const uploadButtonSx = {
	minHeight: 56,
	borderStyle: "dashed",
};

export const avatarSx = {
	width: 128,
	height: 128,
	bgcolor: "primary.light",
	color: "primary.contrastText",
};

export const imagePreviewButtonSx = {
	width: 128,
	height: 128,
	flexShrink: 0,
	borderRadius: (theme) => theme.custom.radius.circle,
	overflow: "hidden",

	"&:focus-visible": {
		outline: "3px solid",
		outlineColor: "primary.light",
		outlineOffset: 3,
	},
};

export const imagePreviewSx = {
	width: "100%",
	height: "100%",
	objectFit: "cover",
	display: "block",
	cursor: "zoom-in",
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