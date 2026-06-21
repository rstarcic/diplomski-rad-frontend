import { jobCardBaseSx } from "../../../../theme/layout";

export const cardSx = {
	...jobCardBaseSx,
	borderRadius: 4,
	boxShadow: "0 14px 35px rgba(15, 23, 42, 0.07)",
	overflow: "hidden",
};

export const actionRowSx = {
	p: 1.5,
	borderRadius: 2.5,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "rgba(99, 102, 241, 0.03)",
	alignItems: "center",
	justifyContent: "space-between",
};

const iconBoxBase = {
	width: 34,
	height: 34,
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
