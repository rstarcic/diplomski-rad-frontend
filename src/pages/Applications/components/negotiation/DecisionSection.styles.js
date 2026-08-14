export const actionCardSx = {
	p: { xs: 1.75, sm: 2 },
	borderRadius: 2.5,
	border: "1px solid",
	borderColor: "rgba(124, 99, 240, 0.24)",
	background: "linear-gradient(135deg, rgba(245, 243, 255, 0.96) 0%, rgba(239, 246, 255, 0.92) 100%)",
	boxShadow: "0 8px 24px rgba(91, 63, 214, 0.07)",
};

export const waitingCardSx = (theme) => ({
	p: 2,
	borderRadius: 2,
	border: "1px dashed",
	borderColor: "divider",
	bgcolor: theme.palette.background.default,
	textAlign: "center",
});

export const acceptBtnSx = {
	minHeight: 36,
	fontSize: "0.8125rem",
	fontWeight: 700,
	textTransform: "none",
	borderRadius: 1.5,
	bgcolor: "success.main",
	color: "#fff",
	px: 1.75,
	py: 0.75,
	boxShadow: "0 4px 12px rgba(34, 197, 94, 0.18)",
	"&:hover": { bgcolor: "success.dark" },
	"& .MuiButton-startIcon": { mr: 0.75 },
	"& .MuiSvgIcon-root": { fontSize: 18 },
};

export const rejectBtnSx = (theme) => ({
	minHeight: 36,
	fontSize: "0.8125rem",
	fontWeight: 650,
	textTransform: "none",
	borderRadius: 1.5,
	background: theme.custom.gradients.primarySoft,
	borderColor: "rgba(239, 68, 68, 0.38)",
	color: "error.main",
	px: 1.5,
	py: 0.75,
	boxShadow: "none",
	"&:hover": {
		background: theme.palette.error.main,
		borderColor: "error.main",
		color: "common.white",
		boxShadow: "none",
	},
	"& .MuiButton-startIcon": { mr: 0.75 },
	"& .MuiSvgIcon-root": { fontSize: 18 },
});

export const counterBtnSx = {
	minHeight: 36,
	fontSize: "0.8125rem",
	px: 1.75,
	py: 0.75,
	borderRadius: 1.5,
	"& .MuiButton-startIcon": { mr: 0.75 },
	"& .MuiSvgIcon-root": { fontSize: 18 },
};

export const cancelBtnSx = {
	minHeight: 36,
	fontSize: "0.8125rem",
	fontWeight: 650,
	textTransform: "none",
	borderRadius: 1.5,
};

export const messageFieldSx = {
	"& .MuiInputBase-root": {
		bgcolor: "background.paper",
	},
};
