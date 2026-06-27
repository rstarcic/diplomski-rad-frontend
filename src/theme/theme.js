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
	success: "#22c55e",
	info: "#2563eb",
	warning: "#f59e0b",
	error: "#ef4444",
	teal: "#0d9488",
	orange: "#f97316",
};

const tint = {
	primarySubtle: "rgba(91, 63, 214, 0.03)",
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

const dashboardList = {
	cardBackground: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))",
	cardBorder: "1px solid rgba(255,255,255,0.2)",
	cardShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
	accent: colors.primaryLight,
	chipBackground: "rgba(124, 99, 240, 0.14)",
	chipColor: colors.primaryDark,
};

const home = {
	header: {
		root: {
			minHeight: { xs: "auto", sm: 82 },
			display: "flex",
			flexDirection: { xs: "column", sm: "row" },
			alignItems: { xs: "stretch", sm: "center" },
			justifyContent: "space-between",
			gap: { xs: 2, sm: 3 },
			mb: { xs: 2.5, md: 0 },
		},
		actions: {
			sx: {
				width: { xs: "100%", sm: "auto" },
				justifyContent: { xs: "stretch", sm: "flex-end" },
				gap: { xs: 1, sm: 1.4 },
			},
		},
		button: {
			flex: { xs: 1, sm: "0 0 auto" },
			minWidth: { xs: 0, sm: 108 },
			minHeight: { xs: 46, sm: 50 },
			borderRadius: 99,
			fontWeight: 900,
			whiteSpace: "nowrap",
			fontSize: { xs: "0.82rem", sm: "0.875rem" },
			gap: 0.5,
		},
		secondaryButton: {
			border: "1.5px solid #d0d5e8",
			color: "#111733",
			bgcolor: "transparent",
			"&:hover": {
				borderColor: colors.primary,
				color: colors.primary,
				bgcolor: "rgba(91, 63, 214, 0.04)",
			},
		},
		primaryButton: {
			minWidth: { xs: 0, sm: 118 },
			background: "linear-gradient(135deg, #6a3ef0 0%, #4d28c8 100%)",
			boxShadow: "0 8px 24px rgba(88, 48, 214, 0.28)",
			"&:hover": {
				background: "linear-gradient(135deg, #5d35df 0%, #4220b8 100%)",
				boxShadow: "0 12px 32px rgba(88, 48, 214, 0.38)",
			},
		},
	},
	rolePanel: {
		root: {
			position: "relative",
			minHeight: { xs: "auto", xl: 820 },
			p: { xs: 3, md: 5.5, xl: 6.5 },
			display: "flex",
			flexDirection: "column",
			gap: { xs: 3, md: 4 },
			borderRadius: { xs: 4, md: 5 },
			overflow: "hidden",
			boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.72)",
		},
		content: {
			sx: {
				position: "relative",
				zIndex: 2,
			},
		},
		body: {
			display: "grid",
			gridTemplateColumns: { xs: "1fr", md: "0.7fr 1.3fr" },
			gap: { xs: 3, md: 2, lg: 1 },
			alignItems: "center",
			flex: 1,
		},
		eyebrow: {
			width: "fit-content",
			display: "inline-flex",
			alignSelf: "flex-start",
			px: 1.45,
			py: 0.75,
			borderRadius: 999,
			fontSize: "0.76rem",
			fontWeight: 950,
		},
		title: {
			mt: { xs: 3, md: 4 },
			color: "#111733",
			fontSize: { xs: "2.45rem", sm: "3.15rem", xl: "3.65rem" },
			fontWeight: 950,
			lineHeight: 1.12,
			letterSpacing: 0,
		},
		subtitle: {
			maxWidth: 430,
			color: "#293252",
			fontSize: "0.99rem",
			lineHeight: 1.75,
		},
		steps: {
			spacing: 2.4,
		},
		illustrationWrap: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			minWidth: 0,
			order: { xs: -1, md: 0 },

		},
		illustration: {
			width: { xs: "100%", lg: "112%" },
			maxWidth: { xs: 360, sm: 460, lg: 680 },
			aspectRatio: "1 / 1",
			objectFit: "contain",
			borderRadius: 4,
		},
		button: {
			width: { xs: "100%", sm: 280 },
			minHeight: 64,
			borderRadius: 3,
			fontWeight: 950,
			fontSize: "1rem",
		},
		tones: {
			client: {
				accent: "#6038e6",
				accentDark: "#532dd2",
				soft: "#efe7ff",
				background: "linear-gradient(145deg, #fbf8ff 0%, #f0e8ff 100%)",
				buttonShadow: "0 16px 30px rgba(96, 56, 230, 0.25)",
			},
			contractor: {
				accent: "#128b4d",
				accentDark: "#087844",
				soft: "#dff7eb",
				background: "linear-gradient(145deg, #f8fffb 0%, #e9f7ef 100%)",
				buttonShadow: "0 16px 30px rgba(18, 139, 77, 0.25)",
			},
		},
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
		tint,
		alerts,
		dashboardList,
		home,
		iconPalette: {
			applications: {
				bg: "rgba(91, 63, 214, 0.12)",
				color: colors.primary,
			},
			contract: {
				bg: "rgba(13, 148, 136, 0.12)",
				color: colors.teal,
			},
			payment: {
				bg: "rgba(249, 115, 22, 0.12)",
				color: colors.orange,
			},
		},
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
