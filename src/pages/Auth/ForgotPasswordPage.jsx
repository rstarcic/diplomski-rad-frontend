import { Button, Stack, TextField } from "@mui/material";
import AuthCard from "./components/AuthCard";

const defaultSide = {
	title: "Reset your password.",
	description: "Enter your email and we will send instructions for creating a new password.",
	ctaLabel: "Back to sign in",
	ctaTo: "/login",
};

const formSide = {
	formTitle: "Forgot password?",
	formSubtitle: "Enter your email to receive reset instructions.",
};

export default function ForgotPasswordPage() {
	return (
		<AuthCard visualContent={defaultSide} formContent={formSide}>
			<Stack spacing={2}>
				<TextField label="Email" type="email" autoComplete="email" required fullWidth />

				<Button type="submit" variant="contained" size="medium" sx={{ width: "fit-content" }}>
					Send reset link
				</Button>
			</Stack>
		</AuthCard>
	);
}
