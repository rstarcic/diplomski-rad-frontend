import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import FormTextField from "../../../components/ui/FormTextField";
import PasswordTextField from "../../../components/ui/PasswordTextField";
import AppAlert from "../../../components/ui/Alert";
import { useFormErrors } from "../../../hooks/useFormErrors";
import FORM_ERRORS from "../../../constants/formError";
import { useAuth } from "../../../hooks/useAuth";
import { ROLES, getHomePath } from "../../../constants/roles";

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { errors, setErrors, clearErrors } = useFormErrors();
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

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

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors);
			return;
		}
		// TODO
		const role = formData.email.toLowerCase().includes("client") ? ROLES.CLIENT : ROLES.CONTRACTOR;
		login({ email: formData.email, role });

		const redirectTo = location.state?.from?.pathname ?? getHomePath(role);
		navigate(redirectTo, { replace: true });
	};

	return (
		<Stack component="form" noValidate width="100%" onSubmit={handleSubmit} noValidate>
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

			{errors.form && <AppAlert severity="error">{errors.form}</AppAlert>}

			<Link component={RouterLink} to="/forgot-password" variant="body2">
				Forgot password?
			</Link>

			<Stack spacing={{ xs: 0.75, sm: 1 }} sx={{ pt: { xs: 1, sm: 2 } }}>
				<Button type="submit" variant="contained" size="large">
					Sign in
				</Button>

				<Divider>or</Divider>

				<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />}>
					Continue with Google
				</Button>
			</Stack>
		</Stack>
	);
}
