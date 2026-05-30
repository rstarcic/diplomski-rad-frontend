import { IconButton } from "@mui/material";

export default function AppIconButton({ color = "primary", ...props }) {
	return <IconButton color={color} {...props} />;
}
