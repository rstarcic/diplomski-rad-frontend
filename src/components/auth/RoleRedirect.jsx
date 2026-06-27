import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getHomePath } from "../../constants/roles";

export default function RoleRedirect() {
	const { isAuthenticated, loading, role } = useAuth();

	if (loading) return null;

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Navigate to={getHomePath(role)} replace />;
}
