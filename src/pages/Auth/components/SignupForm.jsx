import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Button, Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormTextField from "../../../components/ui/FormTextField";
import PasswordTextField from "../../../components/ui/PasswordTextField";
import AppAlert from "../../../components/ui/Alert";
import { useFormErrors } from "../../../hooks/useFormErrors";
import { useAuth } from "../../../hooks/useAuth";
import { useTimedAlert } from "../../../hooks/useTimedAlert";
import FORM_ERRORS from "../../../constants/formError";
import { ROLES } from "../../../constants/roles";
import { AUTH_ERRORS } from "../../../constants/apiErrors";
import { applyApiError } from "../../../utils/parseApiError";
import { startGoogleRegister } from "../../../api/authAPI.js";

const toggleGroupSx = {
	width: "100%",
	mb: 0.5,
	gap: 1,
};

const toggleButtonSx = {
	flex: 1,
	py: 1.4,
	gap: 1,
	fontWeight: 800,
	fontSize: "0.875rem",
	textTransform: "none",
	borderRadius: "10px !important",
	border: "1.5px solid",
	borderColor: "divider",
	"&.Mui-selected": {
		bgcolor: "primary.main",
		color: "primary.contrastText",
		borderColor: "primary.main",
		"&:hover": {
			bgcolor: "primary.dark",
		},
	},
};

export default function SignupForm({ initialRole = null }) {
	const [formData, setFormData] = useState({
		role: initialRole,
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useTimedAlert(null, 7000);
	const { errors, setErrors, clearErrors } = useFormErrors();
	const { register } = useAuth();
	const navigate = useNavigate();

	const updateField = (field) => (event) => {
		setFormData((prev) => ({ ...prev, [field]: event.target.value }));
	};

	const handleRoleChange = (_, value) => {
		if (value !== null) {
			setFormData((prev) => ({ ...prev, role: value }));
		}
	};

	const handleGoogleSignup = () => {
		if (!formData.role) {
			setErrors({ role: FORM_ERRORS.ROLE_REQUIRED });
			return;
		}
		startGoogleRegister(formData.role);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		clearErrors();

		const nextErrors = {};

		if (!formData.role) {
			nextErrors.role = FORM_ERRORS.ROLE_REQUIRED;
		}

		if (!formData.firstName) {
			nextErrors.firstName = FORM_ERRORS.REQUIRED_FIELD;
		}

		if (!formData.lastName) {
			nextErrors.lastName = FORM_ERRORS.REQUIRED_FIELD;
		}

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

		setLoading(true);
		try {
			await register(formData.role, {
				first_name: formData.firstName,
				last_name: formData.lastName,
				email: formData.email,
				password: formData.password,
			});
			navigate("/login", {
				state: { successMessage: "Account created! Please check your email to verify your account before signing in." },
			});
		} catch (err) {
			applyApiError(err, { setApiError, setErrors, errorMap: AUTH_ERRORS });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stack component="form" noValidate width="100%" onSubmit={handleSubmit}>
			{apiError && (
				<AppAlert severity="error" sx={{ mb: 2 }}>
					{apiError}
				</AppAlert>
			)}

			<Stack spacing={0.75} sx={{ mb: 2.5 }}>
				<Typography variant="body2" fontWeight={700} color="text.secondary">
					I am a…
				</Typography>
				<ToggleButtonGroup value={formData.role} exclusive onChange={handleRoleChange} sx={toggleGroupSx}>
					<ToggleButton value={ROLES.CLIENT} sx={toggleButtonSx}>
						<PersonRoundedIcon fontSize="small" />
						Client
					</ToggleButton>
					<ToggleButton value={ROLES.CONTRACTOR} sx={toggleButtonSx}>
						<EngineeringRoundedIcon fontSize="small" />
						Contractor
					</ToggleButton>
				</ToggleButtonGroup>
				{errors.role && (
					<Typography variant="caption" color="error">
						{errors.role}
					</Typography>
				)}
			</Stack>

			<Stack direction="row" spacing={1.5}>
				<FormTextField
					name="firstName"
					label="First name"
					value={formData.firstName}
					onChange={updateField("firstName")}
					errors={errors}
					autoComplete="given-name"
					required
				/>
				<FormTextField
					name="lastName"
					label="Last name"
					value={formData.lastName}
					onChange={updateField("lastName")}
					errors={errors}
					autoComplete="family-name"
					required
				/>
			</Stack>

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
				<Button type="submit" variant="contained" size="large" loading={loading}>
					Create Account
				</Button>

				<Divider>or</Divider>

				<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />} onClick={handleGoogleSignup}>
					Continue with Google
				</Button>
			</Stack>
		</Stack>
	);
}
