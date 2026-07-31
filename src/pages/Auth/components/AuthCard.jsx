import { Box, Paper, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../../../components/ui/Logo";
import SecondaryButton from "../../../components/ui/SecondaryButton";

import {
	cardSx,
	ctaButtonSx,
	formContentSx,
	formPanelSx,
	formSubtitleSx,
	formTitleSx,
	rootSx,
	visualCopySx,
	visualDescriptionSx,
	visualPanelSx,
	visualTitleSx,
} from "./AuthCard.styles";

const DEFAULT_VISUAL_CONTENT = {
	title: "Welcome back to WorkLink.",
	description: "Manage jobs, contracts, and payments in one calm workspace.",
	ctaLabel: "Create an account",
	ctaTo: "/signup",
};

const DEFAULT_FORM_CONTENT = {
	formTitle: "Sign in",
	formSubtitle: "Continue to your WorkLink workspace.",
};

export default function AuthCard({
	visualContent = DEFAULT_VISUAL_CONTENT,
	formContent = DEFAULT_FORM_CONTENT,
	children,
}) {
	return (
		<Box sx={rootSx}>
			<Paper sx={cardSx}>
				<Box sx={visualPanelSx}>
					<Logo />

					<Box sx={visualCopySx}>
						<Typography component="h1" variant="h4" sx={visualTitleSx}>
							{visualContent.title}
						</Typography>
						<Typography variant="body2" sx={visualDescriptionSx}>
							{visualContent.description}
						</Typography>
					</Box>

					<SecondaryButton component={RouterLink} to={visualContent.ctaTo} sx={ctaButtonSx}>
						{visualContent.ctaLabel}
					</SecondaryButton>
				</Box>

				<Box sx={formPanelSx}>
					<Box sx={formContentSx}>
						<Typography component="h2" variant="h5" sx={formTitleSx}>
							{formContent.formTitle}
						</Typography>

						<Typography variant="body2" sx={formSubtitleSx}>
							{formContent.formSubtitle}
						</Typography>

						{children}
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}
