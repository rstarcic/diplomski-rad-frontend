export const actionCardSx = (theme) => ({
	p: 2,
	borderRadius: 2,
	border: "1px solid",
	borderColor: theme.custom.tint.primaryBorder,
	bgcolor: theme.custom.tint.primarySubtle,
});

export const waitingCardSx = (theme) => ({
	p: 2,
	borderRadius: 2,
	border: "1px dashed",
	borderColor: "divider",
	bgcolor: theme.palette.background.default,
	textAlign: "center",
});

export const acceptBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	borderRadius: 2,
	bgcolor: "success.main",
	color: "#fff",
	px: 1.5,
	py: 1.1,
	"&:hover": { bgcolor: "success.dark" },
};

export const rejectBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	borderRadius: 2,
	bgcolor: "error.main",
	color: "#fff",
	px: 1.5,
	py: 1.1,
	"&:hover": { bgcolor: "error.dark" },
};

export const counterBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	px: 1.5,
	py: 1.1,
	borderRadius: 2,
};

export const cancelBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	borderRadius: 2,
};
