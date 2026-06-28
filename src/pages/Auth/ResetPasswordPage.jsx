import { useState } from "react";
import { Alert, Button, Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import PasswordTextField from "../../components/ui/PasswordTextField";
import { useFormErrors } from "../../hooks/useFormErrors";
import FORM_ERRORS from "../../constants/formError";
import { AUTH_ERRORS } from "../../constants/apiErrors";
import { applyApiError } from "../../utils/parseApiError";
import { resetPasswordApi } from "../../api/auth";

const visualContent = {
	title: "Choose a new password.",
	description: "Pick something strong and memorable.",
	ctaLabel: "Back to sign in",
	ctaTo: "/login",
};

const formContent = {
	formTitle: "Reset password",
	formSubtitle: "Enter your new password below.",
};

export default function ResetPasswordPage() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") ?? "";
	const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState(null);
	const { errors, setErrors, clearErrors } = useFormErrors();
	const navigate = useNavigate();

	const updateField = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

	const handleSubmit = async (event) => {
		event.preventDefault();
		clearErrors();
		setApiError(null);

		const nextErrors = {};
		if (!formData.password) nextErrors.password = FORM_ERRORS.PASSWORD_REQUIRED;
		if (!formData.confirmPassword) nextErrors.confirmPassword = FORM_ERRORS.CONFIRM_PASSWORD_REQUIRED;
		if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
			nextErrors.confirmPassword = FORM_ERRORS.PASSWORDS_DO_NOT_MATCH;
		}
		if (!token) {
			setApiError("Invalid or expired reset link. Please request a new one.");
			return;
		}

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		setLoading(true);
		try {
			await resetPasswordApi(token, formData.password);
			navigate("/login", { replace: true });
		} catch (err) {
			applyApiError(err, { setApiError, setErrors, errorMap: AUTH_ERRORS });
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthCard visualContent={visualContent} formContent={formContent}>
			<Stack component="form" noValidate spacing={2} onSubmit={handleSubmit}>
				<PasswordTextField
					name="password"
					label="New password"
					value={formData.password}
					onChange={updateField("password")}
					errors={errors}
					required
				/>
				<PasswordTextField
					name="confirmPassword"
					label="Confirm new password"
					value={formData.confirmPassword}
					onChange={updateField("confirmPassword")}
					errors={errors}
					required
				/>

				{apiError && <Alert severity="error">{apiError}</Alert>}

				<Button
					type="submit"
					variant="contained"
					size="medium"
					loading={loading}
					sx={{ width: "fit-content" }}
				>
					Set new password
				</Button>
			</Stack>
		</AuthCard>
	);
}
