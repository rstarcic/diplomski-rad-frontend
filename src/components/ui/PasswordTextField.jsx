import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import PrimaryTextField from "./PrimaryTextField";

export default function PasswordTextField({ name, errors, helperText, ...props }) {
	const [showPassword, setShowPassword] = useState(false);
	const errorMessage = errors?.[name];

	return (
		<PrimaryTextField
			name={name}
			type={showPassword ? "text" : "password"}
			error={Boolean(errorMessage)}
			helperText={errorMessage || helperText || " "}
			autoComplete="new-password"
			{...props}
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
	);
}
