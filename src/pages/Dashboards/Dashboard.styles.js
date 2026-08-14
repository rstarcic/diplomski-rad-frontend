export const dashboardContentSx = {
	mt: { xs: 3.5, md: 5 },
	display: "grid",
	gap: { xs: 2.5, md: 4 },
	alignItems: "start",
};

export const dashboardPrimaryActionSx = (theme) => ({
	width: { xs: "100%", sm: "auto" },
	background: theme.palette.primary.dark,
	borderColor: theme.palette.primary.deep,
	"&:hover": {
		background: theme.palette.primary.deep,
		borderColor: theme.palette.primary.deep,
	},
});

export const dashboardSecondaryActionSx = {
	width: { xs: "100%", sm: "auto" },
	color: "common.white",
	borderColor: "common.white",
	"&:hover": {
		color: "common.white",
		borderColor: "common.white",
	},
};
