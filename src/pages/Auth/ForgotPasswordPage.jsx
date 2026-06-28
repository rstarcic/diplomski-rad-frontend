import { useState } from "react";
import { Alert, Button, Stack } from "@mui/material";
import AuthCard from "./components/AuthCard";
import FormTextField from "../../components/ui/FormTextField";
import { useFormErrors } from "../../hooks/useFormErrors";
import FORM_ERRORS from "../../constants/formError";
import { AUTH_ERRORS } from "../../constants/apiErrors";
import { applyApiError } from "../../utils/parseApiError";
import { forgotPasswordApi } from "../../api/auth";

const visualContent = {
	title: "Reset your password.",
	description: "Enter your email and we will send instructions for creating a new password.",
	ctaLabel: "Back to sign in",
	ctaTo: "/login",
};

const formContent = {
	formTitle: "Forgot password?",
	formSubtitle: "Enter your email to receive reset instructions.",
};

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const { errors, setErrors, clearErrors } = useFormErrors();

	const handleSubmit = async (event) => {
		event.preventDefault();
		clearErrors();

		if (!email) {
			setErrors({ email: FORM_ERRORS.EMAIL_REQUIRED });
			return;
		}

		setLoading(true);
		try {
			await forgotPasswordApi(email);
			setSent(true);
		} catch (err) {
			applyApiError(err, { setApiError: () => setErrors({ email: "Something went wrong. Please try again." }), setErrors, errorMap: AUTH_ERRORS });
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthCard visualContent={visualContent} formContent={formContent}>
			{sent ? (
				<Alert severity="success">If this email is registered, you'll receive a reset link within a few minutes.</Alert>
			) : (
				<Stack component="form" noValidate spacing={2} onSubmit={handleSubmit}>
					<FormTextField
						name="email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						errors={errors}
						autoComplete="email"
						required
					/>
					<Button type="submit" variant="contained" size="medium" loading={loading} sx={{ width: "fit-content" }}>
						Send reset link
					</Button>
				</Stack>
			)}
		</AuthCard>
	);
}
