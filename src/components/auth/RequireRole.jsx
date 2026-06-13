import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getHomePath } from "../../constants/roles";

export default function RequireRole({ role }) {
	const { isAuthenticated, role: currentRole } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	if (currentRole !== role) {
		return <Navigate to={getHomePath(currentRole)} replace />;
	}

	return <Outlet />;
}
