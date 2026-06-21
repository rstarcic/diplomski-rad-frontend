import { surfaceSectionSx } from "../../../../theme/layout";

export const filterCardSx = {
	...surfaceSectionSx,
	p: { xs: 2, md: 2.5 },
};

export const resetButtonSx = {
	display: "flex",
	alignItems: "center",
	gap: 0.5,
	background: "none",
	border: "none",
	cursor: "pointer",
	color: "text.secondary",
	fontSize: "0.8125rem",
	fontWeight: 600,
	p: 0,
	transition: "color 0.15s",
	"&:hover": { color: "primary.main" },
};

export const filterGridSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
	gap: 2,
	alignItems: "center",
};

export const budgetSectionSx = (theme) => ({
	mt: 2,
	p: { xs: 1.5, md: 2 },
	border: "1px solid",
	borderColor: "divider",
	borderRadius: 2,
	bgcolor: theme.custom.tint.primarySubtle,
});

export const budgetLabelSx = {
	display: "block",
	mb: 1.5,
	textTransform: "uppercase",
	letterSpacing: 0.8,
	fontSize: "0.7rem",
};

export const budgetToggleGroupSx = {
	height: 40,
	flexShrink: 0,
	"& .MuiToggleButton-root": {
		px: 2.5,
		fontSize: "0.8125rem",
		"&:first-of-type": { borderRadius: "20px 0 0 20px" },
		"&:last-of-type": { borderRadius: "0 20px 20px 0" },
	},
};
