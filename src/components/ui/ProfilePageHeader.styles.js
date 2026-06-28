export const profileCardSx = {
	bgcolor: "background.paper",
	mx: { xs: -2, sm: -3, lg: -4 },
	mt: { xs: -2, sm: -3, lg: -4 },
};

export const bannerSx = (theme) => ({
	height: { xs: 90, sm: 110 },
	background: theme.custom.pageHeader.background,
});

export const profileBodySx = {
	px: { xs: 2.5, sm: 3 },
	pb: 3,
	display: "flex",
	flexDirection: { xs: "column", sm: "row" },
	alignItems: { xs: "center", sm: "flex-start" },
	gap: { xs: 0, sm: 2.5 },
};

export const profileContentSx = {
	flex: 1,
	minWidth: 0,
	pt: { xs: 1.5, sm: 1.5 },
	display: "flex",
	flexDirection: "column",
	alignItems: { xs: "center", sm: "flex-start" },
};

export const avatarSx = {
	width: { xs: 80, sm: 96 },
	height: { xs: 80, sm: 96 },
	mt: { xs: -5, sm: -6 },
	border: "4px solid",
	borderColor: "background.paper",
	boxShadow: "0 2px 12px rgba(15,23,42,0.15)",
	bgcolor: "primary.light",
};

export const nameRowSx = {
	alignItems: "center",
	flexWrap: "wrap",
	mt: 1.5,
	justifyContent: { xs: "center", sm: "flex-start" },
};

export const nameSx = {
	fontWeight: 800,
	fontSize: { xs: "1.5rem", sm: "1.75rem" },
	lineHeight: 1.2,
};

export const profileTitleSx = {
	color: "text.secondary",
	mt: 0.25,
	fontWeight: 500,
};

export const metaRowSx = {
	mt: 1,
	flexWrap: "wrap",
	gap: { xs: 1, sm: 2 },
	justifyContent: { xs: "center", sm: "flex-start" },
};

export const metaItemSx = {
	alignItems: "center",
	color: "text.secondary",
};

export const actionsRowSx = {
	mt: 2,
	flexWrap: "wrap",
	justifyContent: { xs: "center", sm: "flex-start" },
};
