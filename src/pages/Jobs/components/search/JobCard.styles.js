import { jobCardBaseSx } from "../../../../theme/layout";

export const cardSx = {
	...jobCardBaseSx,
	borderRadius: 3,
	boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
};

export const detailsButtonSx = {
	borderRadius: 2,
	px: 2.5,
	whiteSpace: "nowrap",
	flexShrink: 0,
};

export const cardContentSx = {
	p: 3,
	height: "100%",
	display: "flex",
	flexDirection: "column",
};

export const avatarSx = {
	width: 36,
	height: 36,
	bgcolor: "primary.light",
	flexShrink: 0,
};

export const clientLinkSx = {
	borderRadius: 1.5,
	p: 0.5,
	ml: -0.5,
	minWidth: 0,
	gap: 1.25,
	alignItems: "center",
	transition: "background 0.15s",
	"&:hover": { bgcolor: "action.hover" },
};
