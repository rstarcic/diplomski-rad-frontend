import { surfaceSectionSx } from "../../../../theme/layout";

export const filterCardSx = {
	...surfaceSectionSx,
	p: { xs: 1.75, md: 2 },
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

export const filterGridSx = (showCity) => ({
	display: "grid",
	gridTemplateColumns: {
		xs: "minmax(0, 1fr)",
		sm: "repeat(2, minmax(0, 1fr))",
		md: "repeat(3, minmax(0, 1fr))",
		xl: showCity
			? "minmax(180px, 1.2fr) minmax(150px, 0.9fr) minmax(170px, 1fr) auto minmax(120px, 0.65fr) minmax(120px, 0.65fr) auto"
			: "minmax(200px, 1.2fr) minmax(170px, 0.9fr) auto minmax(130px, 0.65fr) minmax(130px, 0.65fr) auto",
	},
	gap: 1.25,
	alignItems: "stretch",
	"& .MuiFormControl-root, & .MuiAutocomplete-root": { minWidth: 0 },
	"& .MuiInputBase-root": { height: 42 },
});

export const budgetToggleGroupSx = {
	height: 42,
	width: { xs: "100%", xl: "auto" },
	"& .MuiToggleButton-root": {
		flex: { xs: 1, xl: "initial" },
		px: { xs: 1.5, lg: 2 },
		fontSize: "0.8125rem",
		whiteSpace: "nowrap",
		"&:first-of-type": { borderRadius: "10px 0 0 10px" },
		"&:last-of-type": { borderRadius: "0 10px 10px 0" },
	},
};

export const filterActionsSx = {
	display: "flex",
	alignItems: "stretch",
	justifyContent: { xs: "stretch", sm: "flex-end" },
	gridColumn: { xs: "1", sm: "2", md: "3", xl: "auto" },
	"& > button": {
		width: { xs: "100%", xl: "auto" },
		minHeight: 42,
		whiteSpace: "nowrap",
	},
};
