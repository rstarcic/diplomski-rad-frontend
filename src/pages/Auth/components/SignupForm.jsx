import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { TextField, InputAdornment, IconButton, Button, Divider, Stack } from "@mui/material";
import AppAlert from "../../../components/Alert";
import PrimaryTextField from "../../../components/PrimaryTextField";

export default function SignupForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setPasswordError("Passwords do not match.");
			return;
		}

		setPasswordError("");
	};

	return (
		<Stack component="form" spacing={2} width="100%" onSubmit={handleSubmit}>
			<PrimaryTextField
				label="Email"
				type="email"
				value={formData.email}
				onChange={(event) => setFormData({ ...formData, email: event.target.value })}
				autoComplete="email"
				required
			/>

			<TextField
				label="Password"
				type={showPassword ? "text" : "password"}
				fullWidth
				value={formData.password}
				onChange={(event) => setFormData({ ...formData, password: event.target.value })}
				autoComplete="new-password"
				required
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label={showPassword ? "Hide password" : "Show password"}
									onClick={() => setShowPassword((prev) => !prev)}
									onMouseDown={(event) => event.preventDefault()}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			<TextField
				label="Confirm password"
				type={showConfirmPassword ? "text" : "password"}
				fullWidth
				value={formData.confirmPassword}
				onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
				autoComplete="new-password"
				error={Boolean(passwordError)}
				required
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label={showConfirmPassword ? "Hide password" : "Show password"}
									onClick={() => setShowConfirmPassword((prev) => !prev)}
									onMouseDown={(event) => event.preventDefault()}
									edge="end"
								>
									{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			<Button type="submit" variant="contained" size="large">
				Create Account
			</Button>

			<Divider>or</Divider>

			<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />}>
				Continue with Google
			</Button>

			{passwordError ? (
				<AppAlert severity="error" title="Password error">
					{passwordError}
				</AppAlert>
			) : null}
		</Stack>
	);
}
