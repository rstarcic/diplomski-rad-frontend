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

export const contactBoxSx = {
	display: "flex",
	alignItems: "center",
	gap: 1,
	p: 1.25,
	border: "1px solid",
	borderColor: "divider",
	borderRadius: 2,
	overflow: "hidden",
	minWidth: 0,
};

export const contactIconSx = {
	fontSize: 18,
	color: "primary.main",
	flexShrink: 0,
};

export const contactTextSx = {
	fontWeight: 700,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
};

export const memberSinceSx = (theme) => ({
	display: "flex",
	alignItems: "center",
	gap: 1,
	p: 1.25,
	border: "1px solid",
	borderColor: theme.custom.tint.primaryBorder,
	borderRadius: 2,
	bgcolor: theme.custom.tint.primarySubtle,
});

export const memberSinceTextSx = {
	fontWeight: 700,
};
