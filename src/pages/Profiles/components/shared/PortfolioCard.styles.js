export const portfolioPaperSx = {
	p: { xs: 2.25, sm: 3 },
	borderRadius: 2.5,
	boxShadow: "0 8px 24px rgba(37, 48, 82, 0.06)",
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

export const portfolioImageSx = {
	width: "100%",
	height: 180,
	borderRadius: 1.5,
	objectFit: "cover",
	display: "block",
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "#f1edff",
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
	textAlign: "center",
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
	textTransform: "none",
	borderColor: "#d8ccff",
	color: "#6c47ff",
	fontWeight: 700,
	borderRadius: 1,
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
	fontWeight: 800,
	textTransform: "none",
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
