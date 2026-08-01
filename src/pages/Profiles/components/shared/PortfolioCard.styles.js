export const portfolioPaperSx = {
	p: { xs: 2.25, sm: 3 },
	borderRadius: 2.5,
	boxShadow: (theme) => theme.custom.shadows.subtle,
};

export const portfolioHeaderSx = {
	alignItems: "center",
	justifyContent: "space-between",
	mb: 1.5,
};

export const portfolioGridSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
	gap: 2,
	mt: 2,
};

export const featuredGridSx = {
	...portfolioGridSx,
	gridTemplateColumns: "minmax(0, 1fr)",
	maxWidth: 480,
};

export const featuredPortfolioButtonSx = {
	ml: "auto",
	flexShrink: 0,
};

export const portfolioImageSx = {
	width: "100%",
	height: 180,
	borderRadius: 1.5,
	objectFit: "cover",
	display: "block",
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "primary.light",
};

export const portfolioItemHeaderSx = {
	alignItems: "center",
	justifyContent: "space-between",
	mt: 1,
	minWidth: 0,
};

export const portfolioItemTitleSx = {
	fontWeight: 800,
	color: "text.primary",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
};

export const portfolioLinkButtonSx = {
	color: "text.secondary",
	p: 0.25,
	flexShrink: 0,
};

export const portfolioItemDescSx = {
	mt: 0.25,
	overflow: "hidden",
	textOverflow: "ellipsis",
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
};

export const toggleButtonRowSx = {
	display: "flex",
	justifyContent: "flex-end",
	mt: 2,
};

export const toggleButtonSx = {
	minHeight: 42,
};

export const addFormStackSx = {
	mt: 2,
	pt: 2,
	borderTop: 1,
	borderColor: "divider",
};

export const formActionsRowSx = {
	display: "flex",
	justifyContent: "flex-end",
	gap: 1,
};

export const viewAllButtonSx = {
	mt: 2,
};

export const dialogTitleSx = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	pr: 1,
};

export const dialogTitleTextSx = {
	fontWeight: 900,
};

export const portfolioItemSx = {
	minWidth: 0,
};

export const itemActionsSx = {
	display: "flex",
	alignItems: "center",
	gap: 0.5,
	flexShrink: 0,
};
