import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Divider, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PrimaryTextField from "../../../components/PrimaryTextField";

export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
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

			<Link component={RouterLink} to="/forgot-password" variant="body2" alignSelf="flex-end">
				Forgot password?
			</Link>

			<Button type="submit" variant="contained" size="large">
				Sign in
			</Button>

			<Divider>or</Divider>

			<Button type="button" variant="outlined" size="large" startIcon={<GoogleIcon />}>
				Continue with Google
			</Button>
		</Stack>
	);
}
