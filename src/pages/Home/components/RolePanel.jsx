import { Box, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import clientIllustration from "../../../assets/clientIllustration.png";
import contractorIllustration from "../../../assets/contractorIllustration.png";
import RoleStep from "./RoleStep";
import { clientSteps, contractorSteps } from "./homeData";

export default function RolePanel({ variant, onSignup }) {
	const theme = useTheme();
	const isClient = variant === "client";
	const rolePanel = theme.custom.home.rolePanel;
	const tone = rolePanel.tones[variant];
	const steps = isClient ? clientSteps : contractorSteps;
	const illustration = isClient ? clientIllustration : contractorIllustration;

	return (
		<Box sx={[rolePanel.root, { background: tone.background }]}>
			<Box sx={rolePanel.content.sx}>
				<Typography
					variant="overline"
					sx={[
						rolePanel.eyebrow,
						{
							color: tone.accentDark,
							bgcolor: tone.soft,
						},
					]}
				>
					{isClient ? "FOR CLIENTS" : "FOR CONTRACTORS"}
				</Typography>

				<Typography component="h1" variant="h2" sx={rolePanel.title}>
					{isClient ? "Get work done." : "Find great jobs."}
					<br />
					{isClient ? "The " : "Grow "}
					<Box component="span" sx={{ color: tone.accent }}>
						{isClient ? "smart" : "your"}
					</Box>
					{isClient ? " way." : " business."}
				</Typography>
			</Box>

			<Box sx={rolePanel.body}>
				<Stack spacing={rolePanel.steps.spacing} sx={rolePanel.content.sx}>
					<Typography variant="body1" sx={rolePanel.subtitle}>
						{isClient
							? "Find trusted professionals, manage your project and pay securely, all in one place."
							: "Discover opportunities that match your skills, build your reputation and get paid fairly."}
					</Typography>

					<Stack spacing={rolePanel.steps.spacing}>
						{steps.map((item) => (
							<RoleStep
								key={item.title}
								item={item}
								color={tone.accent}
								bg={tone.soft}
							/>
						))}
					</Stack>

					<PrimaryButton
						size="large"
						endIcon={<ArrowForwardRoundedIcon />}
						sx={[
							rolePanel.button,
							{
								bgcolor: tone.accent,
								boxShadow: tone.buttonShadow,
								"&:hover": { bgcolor: tone.accentDark },
							},
						]}
						onClick={() => onSignup(variant)}
					>
						{isClient ? "I'm a Client" : "I'm a Contractor"}
					</PrimaryButton>
				</Stack>

				<Box sx={rolePanel.illustrationWrap}>
					<Box component="img" src={illustration} alt="" sx={rolePanel.illustration} />
				</Box>
			</Box>
		</Box>
	);
}
