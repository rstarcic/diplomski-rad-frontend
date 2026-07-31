export const sidebarWidth = 270;

export const sidebarSx = (theme) => ({
	width: sidebarWidth,
	height: "100%",
	px: 1.5,
	pt: 0,
	pb: 2,
	display: "flex",
	flexDirection: "column",
	bgcolor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
});

export const sidebarHeaderSx = {
	px: 1.5,
	pt: 4,
	pb: 2.5,
	mb: 1.5,
	borderBottom: "1px solid rgba(255,255,255,0.12)",
};

export const childItemSx = {
	ml: 3,
	my: 0.3,
	py: 0.85,
	pl: 3,
	borderRadius: 1,
	color: "primary.contrastText",
	opacity: 0.86,
	"&.is-active": {
		opacity: 1,
		bgcolor: "rgba(255, 255, 255, 0.16)",
	},
};

export const itemIconSx = {
	minWidth: 38,
	color: "primary.contrastText",
};

export const itemButtonSx = {
	borderRadius: 1,
	py: 1.1,
	color: "primary.contrastText",
	"&.is-active": {
		bgcolor: "rgba(255, 255, 255, 0.12)",
	},
};

export const chevronSx = {
	transition: "transform 160ms ease",
	"&.is-open": {
		transform: "rotate(180deg)",
	},
};

export const secondaryTextSx = (theme) => ({
	color: theme.palette.primary.contrastText,
	opacity: 0.72,
	fontSize: "0.7rem",
	fontWeight: 700,
	letterSpacing: "0.06em",
	textTransform: "uppercase",
	mt: 1.2,
});

export const signOutAreaSx = {
	mt: "auto",
	pt: 2,
	borderTop: "1px solid rgba(255,255,255,0.12)",
};

export const signOutButtonSx = {
	borderRadius: 1,
	color: "primary.contrastText",
};
