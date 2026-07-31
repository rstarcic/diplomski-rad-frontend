import { jobCardBaseSx } from "../../../../theme/layout";

export const cardSx = {
	...jobCardBaseSx,
	borderRadius: 3.5,
	border: "1px solid",
	borderColor: "divider",
	boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
	overflow: "hidden",
	transition: "transform 180ms ease, box-shadow 180ms ease",
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: "0 16px 38px rgba(15, 23, 42, 0.11)",
	},
};

export const cardContentSx = {
	p: { xs: 2.25, sm: 3 },
	height: "100%",
	display: "flex",
	flexDirection: "column",
	"&:last-child": {
		pb: { xs: 2.25, sm: 3 },
	},
};

export const overviewLabelSx = {
	color: "text.primary",
	fontSize: "0.72rem",
	fontWeight: 800,
	letterSpacing: "0.08em",
	textTransform: "uppercase",
};

export const actionRowSx = {
	minHeight: 64,
	p: 1.25,
	borderRadius: 2.5,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
	boxShadow: "0 2px 8px rgba(15, 23, 42, 0.035)",
	alignItems: "center",
	justifyContent: "space-between",
	gap: 1,
};

export const rowValueSx = {
	flexShrink: 0,
	fontWeight: 800,
	color: "text.primary",
};

export const summaryStatusChipSx = {
	height: 28,
	maxWidth: 150,
	borderRadius: 999,
	bgcolor: "rgba(148, 163, 184, 0.12)",
	color: "text.primary",
	fontWeight: 700,
	"& .MuiChip-label": {
		px: 1.25,
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
};

export const footerSx = {
	pt: 2.5,
};

export const footerDividerSx = {
	mb: 2.25,
};

export const metaRowSx = {
	mb: 2.5,
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
};

export const metaItemSx = {
	minWidth: 0,
	display: "flex",
	gap: 1,
	alignItems: "flex-start",
	"& + &": {
		ml: { xs: 1.5, sm: 2 },
		pl: { xs: 1.5, sm: 2 },
		borderLeft: "1px solid",
		borderColor: "divider",
	},
};

export const metaIconSx = {
	mt: 0.2,
	fontSize: 18,
	color: "text.secondary",
};

export const actionButtonsSx = {
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	gap: 1,
	width: "100%",
	"& > *": {
		flex: "1 1 130px",
	},
};

export const actionButtonSx = {
	width: "100%",
};

const iconBoxBase = {
	width: 38,
	height: 38,
	flexShrink: 0,
	borderRadius: 2,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export const applicationsIconSx = (theme) => ({
	...iconBoxBase,
	bgcolor: theme.custom.iconPalette.applications.bg,
	color: theme.custom.iconPalette.applications.color,
});

export const contractIconSx = (theme) => ({
	...iconBoxBase,
	bgcolor: theme.custom.iconPalette.contract.bg,
	color: theme.custom.iconPalette.contract.color,
});

export const paymentIconSx = (theme) => ({
	...iconBoxBase,
	bgcolor: theme.custom.iconPalette.payment.bg,
	color: theme.custom.iconPalette.payment.color,
});
