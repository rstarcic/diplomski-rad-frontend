import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Divider, Stack } from "@mui/material";
import FormTextField from "../../../components/FormTextField";
import PasswordTextField from "../../../components/PasswordTextField";
import { useFormErrors } from "../../../hooks/useFormErrors";
import FORM_ERRORS from "../../../constants/formError";

export default function SignupForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { errors, setErrors, clearErrors } = useFormErrors();

	const updateField = (field) => (event) => {
		setFormData((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		clearErrors();

		const nextErrors = {};

		if (!formData.email) {
			nextErrors.email = FORM_ERRORS.EMAIL_REQUIRED;
		}

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
	};

	return (
		<Stack component="form" width="100%" onSubmit={handleSubmit} noValidate>
			<FormTextField
				name="email"
				label="Email"
				type="email"
				value={formData.email}
				onChange={updateField("email")}
				errors={errors}
				autoComplete="email"
				required
			/>

			<PasswordTextField
				name="password"
				label="Password"
				value={formData.password}
				onChange={updateField("password")}
				errors={errors}
				required
			/>

			<PasswordTextField
				name="confirmPassword"
				label="Confirm password"
				value={formData.confirmPassword}
				onChange={updateField("confirmPassword")}
				errors={errors}
				required
			/>

			<Stack spacing={{ xs: 0.75, sm: 1 }} sx={{ pt: { xs: 1, sm: 2 } }}>
				<Button type="submit" variant="contained" size="large">
					Create Account
				</Button>

				<Divider>or</Divider>

				<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />}>
					Continue with Google
				</Button>
			</Stack>
		</Stack>
	);
}
