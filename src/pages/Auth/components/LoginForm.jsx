import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import FormTextField from "../../../components/ui/FormTextField";
import PasswordTextField from "../../../components/ui/PasswordTextField";
import AppAlert from "../../../components/ui/Alert";
import { useFormErrors } from "../../../hooks/useFormErrors";
import { useAuth } from "../../../hooks/useAuth";
import { useTimedAlert } from "../../../hooks/useTimedAlert";
import { getHomePath } from "../../../constants/roles";
import FORM_ERRORS from "../../../constants/formError";
import { AUTH_ERRORS } from "../../../constants/apiErrors";
import { applyApiError } from "../../../utils/parseApiError";
import { startGoogleLogin } from "../../../api/authAPI";

export default function LoginForm({ initialError = null, successMessage = null }) {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useTimedAlert(initialError, 7000);
	const [success, setSuccess] = useTimedAlert(successMessage, 5000);
	const { errors, setErrors, clearErrors } = useFormErrors();
	const { login } = useAuth();
	const navigate = useNavigate();

	const updateField = (field) => (event) => {
		setFormData((prev) => ({ ...prev, [field]: event.target.value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		clearErrors();
		setApiError(null);

		const nextErrors = {};
		if (!formData.email) nextErrors.email = FORM_ERRORS.EMAIL_REQUIRED;
		if (!formData.password) nextErrors.password = FORM_ERRORS.PASSWORD_REQUIRED;

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}

		setLoading(true);
		try {
			const user = await login(formData.email, formData.password);
			navigate(getHomePath(user.role), { replace: true });
		} catch (err) {
			applyApiError(err, { setApiError, setErrors, errorMap: AUTH_ERRORS });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stack component="form" noValidate width="100%" onSubmit={handleSubmit}>
			{success && (
				<AppAlert severity="success" sx={{ mb: 2 }}>
					{success}
				</AppAlert>
			)}
			{apiError && (
				<AppAlert severity="error" sx={{ mb: 2 }}>
					{apiError}
				</AppAlert>
			)}

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

			<Link component={RouterLink} to="/forgot-password" variant="body2">
				Forgot password?
			</Link>

			<Stack spacing={{ xs: 0.75, sm: 1 }} sx={{ pt: { xs: 1, sm: 2 } }}>
				<Button type="submit" variant="contained" size="large" loading={loading}>
					Sign in
				</Button>

				<Divider>or</Divider>

				<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />} onClick={startGoogleLogin}>
					Continue with Google
				</Button>
			</Stack>
		</Stack>
	);
}
