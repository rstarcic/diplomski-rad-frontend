import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<Box
			sx={(theme) => ({
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: theme.custom.auth.page.background,
				px: { xs: 2, sm: 3, md: 4 },
				py: { xs: 4, md: 6 },
			})}
		>
			<Outlet />
		</Box>
	);
}
