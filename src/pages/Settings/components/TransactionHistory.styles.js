import { surfaceSectionSx } from "../../../theme/layout";

export const cardSx = {
	...surfaceSectionSx,
	mt: 3,
};

export const loadingSx = {
	display: "flex",
	justifyContent: "center",
	py: 5,
};

export const tableContainerSx = {
	overflowX: "auto",
};

export const tableHeadSx = {
	"& .MuiTableCell-root": {
		bgcolor: "rgba(91, 63, 214, 0.055)",
		color: "text.primary",
		fontSize: "0.75rem",
		fontWeight: 900,
		letterSpacing: "0.045em",
		textTransform: "uppercase",
		borderBottomColor: "rgba(91, 63, 214, 0.12)",
		py: 1.75,
	},
	"& .MuiTableCell-root:first-of-type": {
		borderTopLeftRadius: 10,
	},
	"& .MuiTableCell-root:last-of-type": {
		borderTopRightRadius: 10,
	},
};

export const jobLinkSx = {
	color: "primary.main",
	fontWeight: 700,
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
	},
};

export const statusChipSx = {
	fontWeight: 700,
	textTransform: "capitalize",
};

export const amountCellSx = {
	fontWeight: 800,
	whiteSpace: "nowrap",
};

export const footerSx = {
	alignItems: "center",
	justifyContent: "space-between",
};
