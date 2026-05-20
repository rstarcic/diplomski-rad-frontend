import { createTheme } from "@mui/material/styles";

const colors = {
	primary: "#5b3fd6",
	primaryDark: "#46309f",
	primaryLight: "#7c63f0",
	text: "#253052",
	textSecondary: "#6b7280",
	textMuted: "#9ca3af",
	white: "#ffffff",
	page: "#f4f7ff",
	paper: "#ffffff",
	border: "#e5eaf6",
	inputBorder: "#e5e7eb",
	inputHover: "#c7d2fe",
	success: "#22c55e",
	info: "#2563eb",
	warning: "#f59e0b",
	error: "#ef4444",
};

const alerts = {
	success: {
		background: "#ecfdf5",
		color: "#047857",
		border: "#a7f3d0",
	},
	info: {
		background: "#eff6ff",
		color: "#1d4ed8",
		border: "#bfdbfe",
	},
	warning: {
		background: "#fffbeb",
		color: "#92400e",
		border: "#fde68a",
	},
	error: {
		background: "#fef2f2",
		color: "#991b1b",
		border: "#fecaca",
	},
};

const theme = createTheme({
	palette: {
		primary: {
			main: colors.primary,
			dark: colors.primaryDark,
			light: colors.primaryLight,
			contrastText: colors.white,
		},
		success: {
			main: colors.success,
		},
		info: {
			main: colors.info,
		},
		warning: {
			main: colors.warning,
		},
		error: {
			main: colors.error,
		},
		background: {
			default: colors.page,
			paper: colors.paper,
		},
		text: {
			primary: colors.text,
			secondary: colors.textSecondary,
			disabled: colors.textMuted,
		},
		divider: colors.border,
	},

	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		button: {
			textTransform: "none",
			fontWeight: 700,
		},
	},

	shape: {
		borderRadius: 10,
	},

	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				fullWidth: true,
				variant: "outlined",
				size: "small",
			},
		},
	},

	custom: {
		colors,
		alerts,
		sizes: {
			field: {
				sm: 40,
				md: 46,
				lg: 52,
				height: 42,
			},
		},
		buttons: {
			secondary: {
				height: 42,
				borderRadius: 999,
				border: colors.border,
				background: colors.paper,
				color: colors.text,
				fontSize: "0.9rem",
				fontWeight: 700,
			},
		},
		auth: {
			page: {
				background: colors.page,
				paddingX: { xs: 2, sm: 3, md: 4 },
				paddingY: { xs: 4, md: 6 },
			},
			card: {
				maxWidth: 940,
				minHeight: { xs: "auto", md: 560 },
				columns: { xs: "1fr", md: "0.9fr 1.35fr" },
				border: colors.border,
				shadow: "0 24px 60px rgba(37, 48, 82, 0.14)",
			},
			side: {
				background: `linear-gradient(145deg, ${colors.primaryDark}, ${colors.primary})`,
				color: colors.white,
				titleFontSize: { xs: "1.8rem", md: "2.15rem" },
				titleFontWeight: 900,
				descriptionColor: "rgba(255,255,255,0.82)",
				descriptionFontSize: "0.875rem",
			},
			form: {
				maxWidth: 360,
				titleColor: colors.primary,
				titleFontSize: { xs: "1.7rem", md: "2rem" },
				titleFontWeight: 900,
				subtitleColor: colors.textSecondary,
				subtitleFontSize: "0.875rem",
			},
		},
	},
});

export default theme;
