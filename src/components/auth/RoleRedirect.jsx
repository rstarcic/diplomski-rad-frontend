import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getHomePath } from "../../constants/roles";

export default function RoleRedirect() {
	const { isAuthenticated, role } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Navigate to={getHomePath(role)} replace />;
}
