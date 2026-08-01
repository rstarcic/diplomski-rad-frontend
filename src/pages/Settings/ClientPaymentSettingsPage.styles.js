import { alpha } from "@mui/material/styles";

import { surfaceSectionSx } from "../../theme/layout";

export const settingsCardSx = {
	...surfaceSectionSx,
	mt: 3,
	maxWidth: 760,
};

export const loadingStateSx = {
	minHeight: 240,
	display: "grid",
	placeItems: "center",
};

export const paymentHeadingRowSx = {
	alignItems: "center",
	justifyContent: "space-between",
};

export const paymentCardSx = (theme) => ({
	position: "relative",
	width: "100%",
	maxWidth: 430,
	aspectRatio: "1.65 / 1",
	overflow: "hidden",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius * 1.35,
	color: theme.palette.primary.contrastText,
	background: `linear-gradient(
		135deg,
		${theme.palette.primary.dark} 0%,
		${theme.palette.primary.main} 55%,
		${theme.palette.primary.light} 100%
	)`,
	boxShadow: `0 18px 40px ${alpha(theme.palette.primary.dark, 0.25)}`,

	[theme.breakpoints.down("sm")]: {
		padding: theme.spacing(2),
	},

	"&::after": {
		content: '""',
		position: "absolute",
		top: -100,
		right: -70,
		width: 220,
		height: 220,
		borderRadius: (theme) => theme.custom.radius.circle,
		backgroundColor: alpha(theme.palette.common.white, 0.12),
	},
});

export const cardLayerSx = {
	position: "relative",
	zIndex: 1,
	alignItems: "center",
	justifyContent: "space-between",
};

export const cardIconSx = {
	fontSize: 34,
};

export const verifiedBadgeSx = (theme) => ({
	alignItems: "center",
	px: 1.25,
	py: 0.6,
	borderRadius: 10,
	color: theme.palette.success.dark,
	backgroundColor: alpha(theme.palette.success.main, 0.12),
});

export const verifiedIconSx = {
	fontSize: 17,
};

export const cardNumberSx = {
	position: "relative",
	zIndex: 1,
	fontSize: { xs: "1.25rem", sm: "1.55rem" },
	fontWeight: 700,
	letterSpacing: { xs: 2.5, sm: 4 },
};

export const cardFooterSx = {
	position: "relative",
	zIndex: 1,
	display: "grid",
	gridTemplateColumns: "max-content max-content",
	alignItems: "end",
	columnGap: { xs: 3, sm: 4, md: 5 },
};

export const cardLabelSx = {
	opacity: 0.72,
	textTransform: "uppercase",
};

export const expiryDetailsSx = {
	alignItems: "flex-end",
};

export const editAddressButtonSx = {
	alignSelf: { xs: "stretch", sm: "flex-start" },
};