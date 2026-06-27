import { Box, Button, Stack } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import Logo from "../../../components/ui/Logo";

const navSx = {
	height: { xs: "auto", md: 82 },
	display: "flex",
	flexDirection: { xs: "column", sm: "row" },
	alignItems: { xs: "stretch", sm: "center" },
	justifyContent: "space-between",
	gap: 2,
	mb: { xs: 2, md: 0 },
};

const baseButtonSx = {
	minHeight: 50,
	borderRadius: 2,
	fontWeight: 900,
	fontSize: { xs: "0.82rem", sm: "0.875rem" },
	whiteSpace: "nowrap",
	textTransform: "none",
	flex: { xs: 1, sm: "0 0 auto" },
};

const loginSx = {
	...baseButtonSx,
	minWidth: { xs: 0, sm: 108 },
	border: "1.5px solid #d0d5e8",
	color: "#111733",
	bgcolor: "transparent",
	"&:hover": {
		borderColor: "#5b3fd6",
		color: "#5b3fd6",
		bgcolor: "rgba(91, 63, 214, 0.04)",
	},
};

const signupSx = {
	...baseButtonSx,
	minWidth: { xs: 0, sm: 118 },
	background: "linear-gradient(135deg, #6a3ef0 0%, #4d28c8 100%)",
	boxShadow: "0 8px 24px rgba(88, 48, 214, 0.28)",
	"&:hover": {
		background: "linear-gradient(135deg, #5d35df 0%, #4220b8 100%)",
		boxShadow: "0 12px 32px rgba(88, 48, 214, 0.38)",
	},
};

export default function HomeHeader({ onLogin, onSignup }) {
	return (
		<Box component="nav" sx={navSx}>
			<Logo showMotto={false} dark />

			<Stack direction="row" spacing={1.2} sx={{ width: { xs: "100%", sm: "auto" } }}>
				<Button variant="outlined" onClick={onLogin} startIcon={<LoginRoundedIcon />} sx={loginSx}>
					Log in
				</Button>
				<Button variant="contained" onClick={onSignup} startIcon={<PersonAddAlt1RoundedIcon />} sx={signupSx}>
					Sign up
				</Button>
			</Stack>
		</Box>
	);
}
