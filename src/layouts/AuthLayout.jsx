import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { authPageSx } from "../theme/layout";

export default function AuthLayout() {
	return (
		<Box sx={(theme) => [authPageSx, { bgcolor: theme.custom.auth.page.background }]}>
			<Outlet />
		</Box>
	);
}
