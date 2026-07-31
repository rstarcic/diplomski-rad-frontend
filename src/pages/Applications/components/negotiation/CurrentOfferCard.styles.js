export const termBoxSx = {
	p: 2,
	borderRadius: 2,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
};

export const termRowSx = (multiline) => ({
	alignItems: multiline ? "flex-start" : "center",
});

export const termContentSx = {
	flex: 1,
	minWidth: 0,
};

export const termLabelSx = {
	fontWeight: 800,
};

export const editorNameSx = {
	fontWeight: 700,
	textTransform: "capitalize",
};

export const editFieldSx = {
	width: 220,
	flexShrink: 0,
};
