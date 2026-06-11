import { createTheme } from "@mui/material/styles";

const colors = {
	primary: "#5b3fd6",
	primaryDark: "#46309f",
	primaryLight: "#7c63f0",
	secondary: "#ff6e6c",
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

const tint = {
	primarySubtle: "rgba(91, 63, 214, 0.03)",
	primarySoft: "rgba(91, 63, 214, 0.07)",
	primaryBorder: "rgba(91, 63, 214, 0.3)",
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

const pageHeader = {
	background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 58%, ${colors.primaryLight} 100%)`,
	color: "#ffffff",
	label: "rgba(255, 255, 255, 0.78)",
	subtitle: "rgba(255, 255, 255, 0.76)",
	border: "1px solid rgba(255, 255, 255, 0.14)",
	borderRadius: 4,
	shadow: "0 18px 42px rgba(70, 48, 159, 0.22)",
	minHeight: { xs: "auto", md: 180 },
};

const statCard = {
	background: colors.primary,
	color: colors.white,
	iconColor: "rgba(255, 255, 255, 0.9)",
	mutedColor: "rgba(255, 255, 255, 0.72)",
	border: "1px solid rgba(255, 255, 255, 0.16)",
};

const dashboardList = {
	cardBackground: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))",
	cardBorder: "1px solid rgba(255,255,255,0.2)",
	cardShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
	accent: colors.primaryLight,
	chipBackground: "rgba(124, 99, 240, 0.14)",
	chipColor: colors.primaryDark,
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
		borderRadius: 3,
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
		MuiToggleButtonGroup: {
			styleOverrides: {
				root: {
					"& .MuiToggleButton-root": {
						textTransform: "none",
						fontWeight: 700,
						color: colors.textSecondary,
						borderColor: colors.border,
					},
					"& .Mui-selected": {
						color: colors.white,
						backgroundColor: colors.primary,
						"&:hover": { backgroundColor: colors.primaryDark },
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: { fontWeight: 600 },
			},
		},
	},
	custom: {
		pageHeader,
		colors,
		tint,
		alerts,
		statCard,
		dashboardList,
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
