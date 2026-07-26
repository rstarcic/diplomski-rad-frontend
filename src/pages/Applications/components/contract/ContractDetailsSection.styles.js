import { alpha } from "@mui/material/styles";

export const headerSx = {
	justifyContent: "space-between",
	alignItems: "center",
};

export const descriptionSx = {
	lineHeight: 1.65,
};

export const summaryGridSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
	gap: 2,
};

export const detailItemSx = (theme) => ({
	p: 2,
	border: 1,
	borderColor: "divider",
	borderRadius: 2,
	backgroundColor: alpha(theme.palette.primary.main, 0.025),
});

export const fullWidthItemSx = {
	gridColumn: "1 / -1",
};

export const detailLabelSx = {
	display: "block",
	mb: 0.5,
};

export const signatureGridSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
	gap: 2,
};

export const signatureItemSx = {
	p: 2,
	borderRadius: 2,
	bgcolor: "background.default",
};

export const actionBtnSx = {
	textTransform: "none",
	fontWeight: 700,
	borderRadius: 2,
};

export const signBtnSx = {
	...actionBtnSx,
	fontWeight: 800,
};
