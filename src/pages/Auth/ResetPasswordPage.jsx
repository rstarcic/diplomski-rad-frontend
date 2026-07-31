import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthCard from "./components/AuthCard";
import AppAlert from "../../components/ui/AppAlert";
import PasswordTextField from "../../components/ui/PasswordTextField";
import { useFormErrors } from "../../hooks/useFormErrors";
import FORM_ERRORS from "../../constants/formError";
import { AUTH_ERRORS } from "../../constants/apiErrors";
import { applyApiError } from "../../utils/parseApiError";
import { resetPasswordApi } from "../../api/auth.api";

const VISUAL_CONTENT = {
	title: "Choose a new password.",
	description: "Pick something strong and memorable.",
	ctaLabel: "Back to sign in",
	ctaTo: "/login",
};

const FORM_CONTENT = {
	formTitle: "Reset password",
	formSubtitle: "Enter your new password below.",
};

export default function ResetPasswordPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { errors, setErrors, clearErrors } = useFormErrors();

	const [formData, setFormData] = useState({
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState(null);

	const token = searchParams.get("token") ?? "";

	const updateField = (field) => (event) => {
		setFormData((previousData) => ({
			...previousData,
			[field]: event.target.value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		clearErrors();
		setApiError(null);

		if (!token) {
			setApiError(AUTH_ERRORS.reset_token_invalid);
			return;
		}

		const nextErrors = {};

		if (!formData.password) {
			nextErrors.password = FORM_ERRORS.PASSWORD_REQUIRED;
		}

		if (!formData.confirmPassword) {
			nextErrors.confirmPassword = FORM_ERRORS.CONFIRM_PASSWORD_REQUIRED;
		}

		if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
			nextErrors.confirmPassword = FORM_ERRORS.PASSWORDS_DO_NOT_MATCH;
		}

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		setLoading(true);

		try {
			await resetPasswordApi(token, formData.password);
			navigate("/login", {
				replace: true,
				state: {
					successMessage: "Your password has been reset. You can now sign in.",
				},
			});
		} catch (error) {
			applyApiError(error, {
				setApiError,
				setErrors,
				errorMap: AUTH_ERRORS,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthCard visualContent={VISUAL_CONTENT} formContent={FORM_CONTENT}>
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

				{apiError && <AppAlert severity="error">{apiError}</AppAlert>}

				<Button type="submit" variant="contained" size="medium" loading={loading} sx={{ width: "fit-content" }}>
					Set new password
				</Button>
			</Stack>
		</AuthCard>
	);
}
