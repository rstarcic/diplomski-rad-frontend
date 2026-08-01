export const avatarSx = {
	width: 64,
	height: 64,
	bgcolor: "primary.light",
	flexShrink: 0,
};

export const profileLinkSx = {
	color: "inherit",
	textDecoration: "none",
	borderRadius: 2,
	"&:focus-visible": {
		outline: "2px solid",
		outlineColor: "primary.main",
		outlineOffset: 3,
	},
};

export const clickableAvatarSx = {
	...avatarSx,
	transition: "transform 160ms ease, box-shadow 160ms ease",
	"&:hover": {
		transform: "scale(1.05)",
		boxShadow: 3,
	},
};

export const identityRowSx = {
	alignItems: "center",
};

export const identityContentSx = {
	minWidth: 0,
};

export const profileNameLinkSx = {
	...profileLinkSx,
	display: "inline-block",
	fontWeight: 900,
	lineHeight: 1.25,
	"&:hover": {
		color: "primary.main",
		textDecoration: "underline",
	},
};

export const profileNameSx = {
	fontWeight: 900,
	lineHeight: 1.25,
};

export const locationRowSx = {
	mt: 0.5,
	alignItems: "center",
};

export const locationIconSx = {
	fontSize: 15,
	color: "text.secondary",
};

export const aboutSx = {
	lineHeight: 1.65,
};
