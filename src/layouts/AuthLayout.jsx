import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { authPageSx } from "../theme/layout";
import { useAuth } from "../hooks/useAuth";
import { getHomePath } from "../constants/roles";

export default function AuthLayout() {
	const { isAuthenticated, loading, role } = useAuth();

	if (loading) return null;
	if (isAuthenticated) return <Navigate to={getHomePath(role)} replace />;

	return (
		<Box sx={(theme) => [authPageSx, { bgcolor: theme.custom.auth.page.background }]}>
			<Outlet />
		</Box>
	);
}
