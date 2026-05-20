import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Divider, Link, Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PrimaryTextField from "../../../components/PrimaryTextField";
export default function LoginForm() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

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

			<TextField
				label="Password"
				type={showPassword ? "text" : "password"}
				fullWidth
				value={formData.password}
				onChange={(event) => setFormData({ ...formData, password: event.target.value })}
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
			<Link component={RouterLink} to="/forgot-password" variant="body2">
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
