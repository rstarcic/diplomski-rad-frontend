import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Divider, Stack } from "@mui/material";
import PrimaryTextField from "../../../components/PrimaryTextField";

export default function SignupForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});

	return (
		<Stack component="form" spacing={2} width="100%" onSubmit={(e) => e.preventDefault()}>
			<PrimaryTextField
				label="Email"
				type="email"
				value={formData.email}
				onChange={(event) => setFormData({ ...formData, email: event.target.value })}
				autoComplete="email"
				required
			/>

			<PrimaryTextField
				label="Password"
				type="password"
				value={formData.password}
				onChange={(event) => setFormData({ ...formData, password: event.target.value })}
				autoComplete="current-password"
				required
			/>

			<PrimaryTextField
				label="Confirm Password"
				type="password"
				value={formData.confirmPassword}
				onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
				autoComplete="current-password"
				required
			/>

			<Button type="submit" variant="contained" size="large">
				Create Account
			</Button>

			<Divider>or</Divider>

			<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />}>
				Continue with Google
			</Button>
		</Stack>
	);
}
