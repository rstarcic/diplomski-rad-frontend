import { Box, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import Logo from "../../../components/ui/Logo";

const defaultSide = {
	title: "Welcome back to WorkLink.",
	description: "Manage jobs, contracts, and payments in one calm workspace.",
	ctaLabel: "Create an account",
	ctaTo: "/signup",
};

const formSide = {
	formTitle: "Sign in",
	formSubtitle: "Continue to your WorkLink workspace.",
};

export default function AuthCard({ visualContent = defaultSide, formContent = formSide, children }) {
	return (
		<Box
			sx={(theme) => ({
				minHeight: "100vh",
				display: "grid",
				placeItems: "center",
				bgcolor: "background.default",
				px: theme.custom.auth.page.paddingX,
				py: theme.custom.auth.page.paddingY,
			})}
		>
			<Paper
				sx={(theme) => ({
					width: "100%",
					maxWidth: theme.custom.auth.card.maxWidth,
					minHeight: theme.custom.auth.card.minHeight,
					display: "grid",
					gridTemplateColumns: theme.custom.auth.card.columns,
					overflow: "hidden",
					border: "1px solid",
					borderColor: theme.custom.auth.card.border,
					boxShadow: theme.custom.auth.card.shadow,
				})}
			>
				<Box
					sx={(theme) => ({
						minHeight: { xs: 220, md: "auto" },
						display: { xs: "none", sm: "flex" },
						flexDirection: "column",
						justifyContent: "space-between",
						p: { xs: 4, md: 5 },
						color: theme.custom.auth.side.color,
						background: theme.custom.auth.side.background,
					})}
				>
					<Logo />

					<Box sx={{ my: 4 }}>
						<Typography
							component="h1"
							variant="h4"
							sx={(theme) => ({
								color: "inherit",
								fontSize: theme.custom.auth.side.titleFontSize,
								fontWeight: theme.custom.auth.side.titleFontWeight,
								lineHeight: 1.2,
							})}
						>
							{visualContent.title}
						</Typography>
						<Typography
							variant="body2"
							sx={(theme) => ({
								mt: 1.5,
								maxWidth: 320,
								color: theme.custom.auth.side.descriptionColor,
								fontSize: theme.custom.auth.side.descriptionFontSize,
							})}
						>
							{visualContent.description}
						</Typography>
					</Box>

					<SecondaryButton
						component={RouterLink}
						to={visualContent.ctaTo}
						sx={{
							width: "fit-content",
							justifyContent: "flex-start",
							borderColor: "rgba(255,255,255,0.6)",
							color: "inherit",
						}}
					>
						{visualContent.ctaLabel}
					</SecondaryButton>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", p: { xs: 3, md: 5 } }}>
					<Box sx={(theme) => ({ width: "100%", maxWidth: theme.custom.auth.form.maxWidth, mx: "auto" })}>
						<Typography
							component="h2"
							variant="h5"
							sx={(theme) => ({
								color: theme.custom.auth.form.titleColor,
								fontSize: theme.custom.auth.form.titleFontSize,
								fontWeight: theme.custom.auth.form.titleFontWeight,
							})}
						>
							{formContent.formTitle}
						</Typography>

						<Typography
							variant="body2"
							sx={(theme) => ({
								mt: 0.5,
								mb: 3,
								color: theme.custom.auth.form.subtitleColor,
								fontSize: theme.custom.auth.form.subtitleFontSize,
							})}
						>
							{formContent.formSubtitle}
						</Typography>

						{children}
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}
