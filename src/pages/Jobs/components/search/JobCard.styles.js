import { jobCardBaseSx } from "../../../../theme/layout";

export const cardSx = (theme) => ({
	...jobCardBaseSx,
	position: "relative",
	borderColor: theme.custom.searchJobCard.border,
	borderRadius: theme.custom.searchJobCard.borderRadius,
	bgcolor: theme.custom.searchJobCard.background,
	boxShadow: theme.custom.searchJobCard.shadow,
	overflow: "hidden",
	transition: "transform 180ms ease, box-shadow 180ms ease",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 24,
		left: 0,
		width: 5,
		height: 128,
		borderRadius: "0 6px 6px 0",
		background: theme.custom.jobCardAccent.green,
	},
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: theme.custom.searchJobCard.hoverShadow,
	},
});

export const cardContentSx = {
	p: { xs: 2, sm: 2.5 },
	height: "100%",
	display: "flex",
	flexDirection: "column",
	"&:last-child": {
		pb: { xs: 2, sm: 2.5 },
	},
};

export const headerSx = {
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr) auto",
	columnGap: { xs: 1.5, sm: 2 },
	rowGap: 1,
	alignItems: "start",
};

export const titleWrapSx = {
	minWidth: 0,
};

export const categorySx = (theme) => ({
	color: theme.custom.searchJobCard.categoryColor,
	fontWeight: 800,
});

export const titleSx = {
	mt: 0.25,
	lineHeight: 1.35,
};

export const statusSx = {
	gridColumn: 2,
	justifySelf: { xs: "start", sm: "end" },
};

export const chipRowSx = {
	mt: 2,
	flexWrap: "wrap",
};

export const metaRowSx = {
	mt: 3,
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
};

export const metaItemSx = {
	minWidth: 0,
};

export const deadlineMetaSx = (theme) => ({
	...metaItemSx,
	ml: { xs: 1.5, sm: 2.5 },
	pl: { xs: 1.5, sm: 2.5 },
	borderLeft: "1px solid",
	borderColor: theme.custom.searchJobCard.metaDivider,
});

export const metaLabelSx = {
	display: "block",
	color: "text.secondary",
	fontWeight: 700,
	letterSpacing: "0.06em",
	textTransform: "uppercase",
};

export const budgetSx = {
	mt: 0.5,
	color: "text.primary",
	lineHeight: 1.25,
};

export const deadlineValueSx = {
	mt: 0.5,
	display: "flex",
	alignItems: "center",
	gap: 0.75,
	color: "text.primary",
	fontWeight: 600,
	lineHeight: 1.25,
};

export const deadlineIconSx = {
	flexShrink: 0,
	fontSize: 19,
	color: "text.secondary",
};

export const footerSx = {
	mt: "auto",
	pt: 2.5,
};

export const footerDividerSx = {
	mb: 2,
};

export const footerRowSx = {
	flexDirection: { xs: "column", sm: "row" },
	justifyContent: "space-between",
	alignItems: { xs: "stretch", sm: "center" },
	gap: 1.5,
};

export const avatarSx = {
	width: 38,
	height: 38,
	bgcolor: "primary.light",
	flexShrink: 0,
};

export const clientLinkSx = {
	width: "fit-content",
	maxWidth: "100%",
	borderRadius: 1.5,
	p: 0.5,
	ml: -0.5,
	minWidth: 0,
	gap: 1.25,
	alignItems: "center",
	transition: "background 150ms ease",
	"&:hover": {
		bgcolor: "action.hover",
	},
};

export const clientNameSx = {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
};

export const detailsButtonSx = {
	minHeight: 44,
	px: 2.25,
	whiteSpace: "nowrap",
	flexShrink: 0,
};
