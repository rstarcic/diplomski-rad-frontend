import { Box, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import clientIllustration from "../../../assets/clientIllustration.png";
import contractorIllustration from "../../../assets/contractorIllustration.png";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { clientSteps, contractorSteps } from "./homeSteps.config";
import RoleStep from "./RoleStep";
import {
	accentTextSx,
	bodySx,
	contentSx,
	eyebrowSx,
	getRoleTone,
	illustrationSx,
	illustrationWrapSx,
	panelSx,
	signupButtonSx,
	stepsContentSx,
	stepsListSx,
	subtitleSx,
	titleSx,
} from "./RolePanel.styles";

export default function RolePanel({ variant, onSignup }) {
	const theme = useTheme();
	const isClient = variant === "client";
	const tone = getRoleTone(theme, variant);

	const steps = isClient ? clientSteps : contractorSteps;
	const illustration = isClient ? clientIllustration : contractorIllustration;

	return (
		<Box sx={panelSx(variant)}>
			<Box sx={contentSx}>
				<Typography variant="overline" sx={eyebrowSx(variant)}>
					{isClient ? "FOR CLIENTS" : "FOR CONTRACTORS"}
				</Typography>

				<Typography component="h2" variant="h2" sx={titleSx}>
					{isClient ? "Get work done." : "Find great jobs."}
					<br />

					{isClient ? "The " : "Grow "}

					<Box component="span" sx={accentTextSx(variant)}>
						{isClient ? "smart" : "your"}
					</Box>

					{isClient ? " way." : " business."}
				</Typography>
			</Box>

			<Box sx={bodySx}>
				<Stack sx={stepsContentSx}>
					<Typography variant="body1" sx={subtitleSx}>
						{isClient
							? "Find trusted professionals, manage your project and pay securely, all in one place."
							: "Discover opportunities that match your skills, build your reputation and get paid fairly."}
					</Typography>

					<Stack sx={stepsListSx}>
						{steps.map((item) => (
							<RoleStep key={item.title} item={item} color={tone.accent} bg={tone.soft} />
						))}
					</Stack>

					<PrimaryButton
						size="large"
						endIcon={<ArrowForwardRoundedIcon />}
						onClick={() => onSignup(variant)}
						sx={signupButtonSx(variant)}
					>
						{isClient ? "I'm a Client" : "I'm a Contractor"}
					</PrimaryButton>
				</Stack>

				<Box sx={illustrationWrapSx}>
					<Box component="img" src={illustration} alt="" sx={illustrationSx} />
				</Box>
			</Box>
		</Box>
	);
}
