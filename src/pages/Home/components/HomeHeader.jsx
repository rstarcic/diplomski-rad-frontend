import { Box, Stack } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import Logo from "../../../components/ui/Logo";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import {
	actionsSx,
	loginButtonSx,
	navSx,
	primaryButtonSx,
} from "./HomeHeader.styles";

export default function HomeHeader({
	isAuthenticated,
	loading,
	onDashboard,
	onLogin,
	onSignup,
}) {
	return (
		<Box component="nav" sx={navSx}>
			<Logo showMotto={false} dark />

			{!loading && (
				<Stack direction="row" sx={actionsSx}>
					{isAuthenticated ? (
						<PrimaryButton
							onClick={onDashboard}
							startIcon={<DashboardRoundedIcon />}
							sx={primaryButtonSx}
						>
							Back to dashboard
						</PrimaryButton>
					) : (
						<>
							<SecondaryButton
								onClick={onLogin}
								startIcon={<LoginRoundedIcon />}
								sx={loginButtonSx}
							>
								Log in
							</SecondaryButton>
							<PrimaryButton
								onClick={() => onSignup()}
								startIcon={<PersonAddAlt1RoundedIcon />}
								sx={primaryButtonSx}
							>
								Sign up
							</PrimaryButton>
						</>
					)}
				</Stack>
			)}
		</Box>
	);
}
