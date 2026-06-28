import { Box, Button, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import Logo from "../../components/ui/Logo";

const ERROR_CONFIG = {
	google_account_not_registered: {
		title: "Google account not found",
		description: "This Google account isn't linked to any WorkLink account. Create an account to get started.",
		action: { label: "Create an account", to: "/signup" },
	},
	google_account_already_exists: {
		title: "Account already exists",
		description: "An account with this Google email already exists. Sign in instead.",
		action: { label: "Sign in", to: "/login" },
	},
	oauth_failed: {
		title: "Sign-in with Google failed",
		description: "Something went wrong during Google sign-in. Please try again or use email and password.",
		action: { label: "Try again", to: "/login" },
	},
	email_link_expired: {
		title: "Link expired",
		description: "This verification link has expired or already been used. Request a new one from your profile.",
		action: { label: "Go to sign in", to: "/login" },
	},
	email_already_verified: {
		title: "Already verified",
		description: "Your email is already verified. You're good to go.",
		action: { label: "Sign in", to: "/login" },
	},
	account_suspended: {
		title: "Account suspended",
		description: "Your account has been suspended. Please contact support if you believe this is a mistake.",
		action: { label: "Go to sign in", to: "/login" },
	},
	session_expired: {
		title: "Session expired",
		description: "Your session has expired. Please sign in again to continue.",
		action: { label: "Sign in", to: "/login" },
	},
};

const fallback = {
	title: "Something went wrong",
	description: "An unexpected error occurred. Please try again.",
	action: { label: "Go to sign in", to: "/login" },
};

const pageSx = (theme) => ({
	minHeight: "100vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	textAlign: "center",
	px: 3,
	position: "relative",
	overflow: "hidden",
	background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.light} 100%)`,
});

const blobTopSx = {
	position: "fixed",
	top: -120,
	right: -120,
	width: 420,
	height: 420,
	borderRadius: "50%",
	bgcolor: "rgba(255,255,255,0.06)",
	pointerEvents: "none",
};

const blobBottomSx = {
	position: "fixed",
	bottom: -160,
	left: -160,
	width: 520,
	height: 520,
	borderRadius: "50%",
	bgcolor: "rgba(255,255,255,0.04)",
	pointerEvents: "none",
};

const logoWrapSx = { mb: 7 };

const iconFloatSx = {
	"@keyframes float": {
		"0%, 100%": { transform: "translateY(0px)" },
		"50%": { transform: "translateY(-12px)" },
	},
	animation: "float 3.2s ease-in-out infinite",
	mb: 4,
};

const iconCircleSx = {
	width: 100,
	height: 100,
	borderRadius: "50%",
	bgcolor: "rgba(255,255,255,0.14)",
	backdropFilter: "blur(6px)",
	border: "1.5px solid rgba(255,255,255,0.22)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const iconSx = { fontSize: 54, color: "#fff" };

const titleSx = {
	color: "#fff",
	letterSpacing: "-0.02em",
	mb: 1.5,
};

const descriptionSx = {
	color: "rgba(255,255,255,0.72)",
	maxWidth: 360,
	lineHeight: 1.65,
	mb: 5,
};

const buttonSx = (theme) => ({
	bgcolor: "#fff",
	color: theme.palette.primary.main,
	fontWeight: 700,
	borderRadius: 99,
	px: 4,
	py: 1.4,
	boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
	"&:hover": { bgcolor: "rgba(255,255,255,0.92)" },
});

export default function ErrorPage() {
	const [searchParams] = useSearchParams();
	const code = searchParams.get("error");
	const { title, description, action } = ERROR_CONFIG[code] ?? fallback;

	return (
		<Box sx={pageSx}>
			<Box sx={blobTopSx} />
			<Box sx={blobBottomSx} />

			<Box sx={logoWrapSx}>
				<Logo />
			</Box>

			<Box sx={iconFloatSx}>
				<Box sx={iconCircleSx}>
					<SentimentDissatisfiedRoundedIcon sx={iconSx} />
				</Box>
			</Box>

			<Typography variant="h4" fontWeight={800} sx={titleSx}>
				{title}
			</Typography>

			<Typography variant="body1" sx={descriptionSx}>
				{description}
			</Typography>

			<Button component={RouterLink} to={action.to} variant="contained" size="large" sx={buttonSx}>
				{action.label}
			</Button>
		</Box>
	);
}
