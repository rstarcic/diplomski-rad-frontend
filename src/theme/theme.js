import { createTheme } from "@mui/material/styles";

const colors = {
	primary: "#5b3fd6",
	primaryDark: "#46309f",
	primaryLight: "#7c63f0",
	secondary: "#8b6fe8",
	secondaryDark: "#7456d8",
	secondaryLight: "#aa96f1",
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
	primarySoft: "rgba(91, 63, 214, 0.08)",
	primaryBorder: "rgba(91, 63, 214, 0.3)",
};

const radius = {
	control: 8,
	card: 12,
	section: 16,
	dialog: 16,
	pill: 999,
	circle: "50%",
};

const shadows = {
	subtle: "0 8px 24px rgba(37, 48, 82, 0.06)",
	surface: "0 10px 28px rgba(37, 48, 82, 0.06)",
	card: "0 12px 32px rgba(37, 48, 82, 0.08)",
	cardHover: "0 16px 38px rgba(37, 48, 82, 0.12)",
	elevated: "0 18px 42px rgba(37, 48, 82, 0.14)",
	primary: "0 7px 18px rgba(91, 63, 214, 0.2)",
	primaryHover: "0 9px 22px rgba(91, 63, 214, 0.28)",
};

const gradients = {
	primary: `linear-gradient(
		135deg,
		${colors.primary},
		${colors.primaryDark}
	)`,
	primaryHover: `linear-gradient(
		135deg,
		${colors.primaryLight},
		${colors.primaryDark}
	)`,
	primarySoft: `linear-gradient(
		135deg,
		${colors.paper},
		rgba(124, 99, 240, 0.08)
	)`,
	primarySoftHover: `linear-gradient(
		135deg,
		rgba(124, 99, 240, 0.08),
		rgba(91, 63, 214, 0.14)
	)`,
};

const transitions = {
	fast: "150ms ease",
	standard: "180ms ease",
	slow: "250ms ease",
	interactive:
		"background 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
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

const profileProgress = {
	width: { xs: "100%", md: 280 },
	padding: 1.5,
	border: "1px solid rgba(255, 255, 255, 0.22)",
	borderRadius: 3,
	background: "rgba(255, 255, 255, 0.11)",
	shadow: "0 8px 22px rgba(37, 25, 105, 0.16)",
	mutedText: "rgba(255, 255, 255, 0.78)",
	progressTrack: "rgba(255, 255, 255, 0.24)",
	progressBar: colors.white,
	progressHeight: 6,
};

const dashboardList = {
	cardBackground: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.75))",
	cardBorder: "1px solid rgba(255,255,255,0.2)",
	cardShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
	accent: colors.primaryLight,
	chipBackground: "rgba(124, 99, 240, 0.14)",
	chipColor: colors.primaryDark,
};

const dashboardStats = {
	card: {
		minHeight: 164,
		padding: { xs: 2, sm: 2.25 },
		borderRadius: 4,
		border: colors.border,
		background: colors.paper,
		shadow: "0 12px 32px rgba(37, 48, 82, 0.08)",
		hoverShadow: "0 16px 38px rgba(37, 48, 82, 0.12)",
	},
	tones: {
		green: {
			accent: "#10b981",
			value: "#059669",
			soft: "rgba(16, 185, 129, 0.1)",
			iconBackground: "linear-gradient(145deg, #ecfdf5, #d9f7eb)",
			iconColor: "#059669",
		},
		orange: {
			accent: "#f97316",
			value: "#ea580c",
			soft: "rgba(249, 115, 22, 0.1)",
			iconBackground: "linear-gradient(145deg, #fff7ed, #ffead7)",
			iconColor: "#f97316",
		},
		violet: {
			accent: "#7c3aed",
			value: "#6d28d9",
			soft: "rgba(124, 58, 237, 0.1)",
			iconBackground: "linear-gradient(145deg, #f5f3ff, #ede9fe)",
			iconColor: "#7c3aed",
		},
		rating: {
			accent: "#7c3aed",
			value: "#6d28d9",
			soft: "rgba(124, 58, 237, 0.1)",
			iconBackground: "linear-gradient(145deg, #fffbeb, #fef3c7)",
			iconColor: "#f59e0b",
		},
		blue: {
			accent: "#2563eb",
			value: "#1d4ed8",
			soft: "rgba(37, 99, 235, 0.1)",
			iconBackground: "linear-gradient(145deg, #eff6ff, #e0e7ff)",
			iconColor: "#1d4ed8",
		},
	},
};

const dashboardActivity = {
	item: {
		padding: { xs: 1.5, sm: 1.75 },
		borderRadius: 3,
		border: colors.border,
		background: colors.paper,
		shadow: "0 7px 20px rgba(37, 48, 82, 0.06)",
		hoverShadow: "0 10px 26px rgba(37, 48, 82, 0.1)",
	},
	icon: {
		size: 42,
		borderRadius: 2.5,
	},
	meta: {
		background: "rgba(91, 63, 214, 0.08)",
		color: colors.primaryDark,
	},
};

const dashboardAction = {
	border: "rgba(91, 63, 214, 0.24)",
	background: "linear-gradient(135deg, rgba(243, 240, 255, 0.96), rgba(255, 255, 255, 1) 52%)",
	accent: colors.primaryLight,
	eyebrow: colors.primaryDark,
	shadow: "0 10px 28px rgba(70, 48, 159, 0.09)",
	hoverShadow: "0 14px 34px rgba(70, 48, 159, 0.14)",
	badgeBackground: "rgba(91, 63, 214, 0.1)",
	badgeColor: colors.primaryDark,
};

const searchJobCard = {
	borderRadius: 3.5,
	border: colors.border,
	background: colors.paper,
	shadow: "0 10px 28px rgba(37, 48, 82, 0.07)",
	hoverShadow: "0 16px 36px rgba(37, 48, 82, 0.12)",
	categoryColor: colors.primary,
	metaDivider: colors.border,
};

const jobForm = {
	sectionIconBackground: "rgba(91, 63, 214, 0.1)",
	sectionIconColor: colors.primary,
	previewBackground: "linear-gradient(145deg, rgba(246, 243, 255, 0.96), rgba(250, 249, 255, 0.98))",
	previewBorder: "rgba(91, 63, 214, 0.16)",
	estimateBackground: "linear-gradient(90deg, rgba(91, 63, 214, 0.08), rgba(124, 99, 240, 0.13))",
	estimateBorder: "rgba(91, 63, 214, 0.14)",
	estimateLabel: colors.primary,
};

const jobCardAccent = {
	green: "linear-gradient(180deg, #16b879 0%, rgba(22, 184, 121, 0.32) 100%)",
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
			whiteSpace: "nowrap",
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
			borderRadius: (theme) => theme.custom.radius.pill,
		},
		title: {
			mt: { xs: 3, md: 4 },
			color: colors.text,
		},
		subtitle: {
			maxWidth: 430,
			color: colors.textSecondary,
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
		},
		step: {
			iconSize: 50,
			iconRadius: 3,
			iconGlyphSize: 25,
			titleColor: colors.text,
			textColor: colors.textSecondary,
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
		secondary: {
			main: colors.secondary,
			dark: colors.secondaryDark,
			light: colors.secondaryLight,
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
		h1: {
			fontFamily: '"Poppins", "Roboto", sans-serif',
			fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
			fontWeight: 800,
			lineHeight: 1.08,
			letterSpacing: "-0.035em",
		},
		h2: {
			fontFamily: '"Poppins", "Roboto", sans-serif',
			fontSize: "clamp(2.125rem, 4vw, 3.5rem)",
			fontWeight: 800,
			lineHeight: 1.1,
			letterSpacing: "-0.03em",
		},
		h3: {
			fontFamily: '"Poppins", "Roboto", sans-serif',
			fontSize: "clamp(1.875rem, 3vw, 3rem)",
			fontWeight: 800,
			lineHeight: 1.1,
			letterSpacing: "-0.025em",
		},
		h4: {
			fontFamily: '"Poppins", "Roboto", sans-serif',
			fontSize: "clamp(1.625rem, 2.4vw, 2.125rem)",
			fontWeight: 800,
			lineHeight: 1.2,
			letterSpacing: "-0.02em",
		},
		h5: {
			fontFamily: '"Poppins", "Roboto", sans-serif',
			fontSize: "clamp(1.375rem, 2vw, 1.5rem)",
			fontWeight: 800,
			lineHeight: 1.25,
			letterSpacing: "-0.015em",
		},
		h6: {
			fontFamily: '"Poppins", "Roboto", sans-serif',
			fontSize: "clamp(1.125rem, 1.6vw, 1.25rem)",
			fontWeight: 800,
			lineHeight: 1.3,
			letterSpacing: "-0.01em",
		},
		subtitle1: {
			fontSize: "1rem",
			fontWeight: 600,
			lineHeight: 1.5,
		},
		subtitle2: {
			fontSize: "0.875rem",
			fontWeight: 800,
			lineHeight: 1.5,
		},
		body1: {
			fontSize: "1rem",
			fontWeight: 400,
			lineHeight: 1.6,
		},
		body2: {
			fontSize: "0.875rem",
			fontWeight: 400,
			lineHeight: 1.6,
		},
		caption: {
			fontSize: "0.75rem",
			fontWeight: 400,
			lineHeight: 1.5,
		},
		overline: {
			fontSize: "0.75rem",
			fontWeight: 800,
			lineHeight: 1.5,
			letterSpacing: "0.08em",
		},
		button: {
			fontSize: "0.875rem",
			textTransform: "none",
			fontWeight: 700,
			lineHeight: 1.4,
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
					minHeight: 40,
					borderRadius: radius.control,
					fontSize: "0.875rem",
					fontWeight: 700,
					textTransform: "none",
					transition: transitions.interactive,

					"&.Mui-focusVisible": {
						outline: `3px solid ${tint.primaryBorder}`,
						outlineOffset: 2,
					},
				},

				sizeSmall: {
					minHeight: 36,
					paddingInline: 14,
				},

				sizeLarge: {
					minHeight: 46,
					paddingInline: 22,
				},

				containedPrimary: {
					color: colors.white,
					background: gradients.primary,
					border: "1.5px solid transparent",
					boxShadow: shadows.primary,

					"&:hover": {
						color: colors.white,
						background: gradients.primaryHover,
						boxShadow: shadows.primaryHover,
					},

					"&.Mui-disabled": {
						color: colors.textMuted,
						background: colors.border,
						borderColor: "transparent",
						boxShadow: "none",
					},
				},

				outlinedPrimary: {
					color: colors.primaryDark,
					border: `1.5px solid ${tint.primaryBorder}`,
					background: gradients.primarySoft,
					boxShadow: "0 4px 12px rgba(91, 63, 214, 0.1)",

					"&:hover": {
						color: colors.primaryDark,
						borderColor: colors.primaryLight,
						background: gradients.primarySoftHover,
						boxShadow: "0 6px 16px rgba(91, 63, 214, 0.16)",
					},

					"&.Mui-disabled": {
						color: colors.textMuted,
						borderColor: colors.border,
						background: colors.paper,
						boxShadow: "none",
					},
				},

				textPrimary: {
					color: colors.primary,
					backgroundColor: "transparent",

					"&:hover": {
						color: colors.primaryDark,
						backgroundColor: tint.primarySoft,
					},

					"&.Mui-disabled": {
						color: colors.textMuted,
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					fontSize: "0.9375rem",
					lineHeight: 1.5,
					"@media (max-width:599.95px)": {
						fontSize: "1rem",
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: "0.875rem",
					fontWeight: 500,
				},
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: "0.75rem",
					lineHeight: 1.5,
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
				root: {
					fontSize: "0.75rem",
					fontWeight: 700,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: "0.875rem",
					fontWeight: 700,
					textTransform: "none",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontSize: "0.875rem",
					lineHeight: 1.5,
				},
				head: {
					fontWeight: 800,
					color: colors.text,
				},
			},
		},
	},
	custom: {
		pageHeader,
		profileProgress,
		radius,
		shadows,
		gradients,
		transitions,
		tint,
		alerts,
		dashboardList,
		dashboardStats,
		dashboardActivity,
		dashboardAction,
		searchJobCard,
		jobForm,
		jobCardAccent,
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
