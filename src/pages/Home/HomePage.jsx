import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { homePageSx } from "../../theme/layout";
import HomeHeader from "./components/HomeHeader";
import RolePanel from "./components/RolePanel";
import { mainSx, pageContainerSx } from "./HomePage.styles";

export default function HomePage() {
	const navigate = useNavigate();
	const { isAuthenticated, loading, role } = useAuth();

	const dashboardPath = role === "contractor" ? "/contractor/dashboard" : "/client/dashboard";

	const goToSignup = (selectedRole) => {
		navigate("/signup", {
			state: selectedRole ? { role: selectedRole } : undefined,
		});
	};
	return (
		<Box sx={homePageSx}>
			<Container maxWidth={false} sx={pageContainerSx}>
				<HomeHeader
					isAuthenticated={isAuthenticated}
					loading={loading}
					onDashboard={() => navigate(dashboardPath)}
					onLogin={() => navigate("/login")}
					onSignup={goToSignup}
				/>

				<Box component="main" sx={mainSx}>
					<RolePanel variant="client" onSignup={goToSignup} />
					<RolePanel variant="contractor" onSignup={goToSignup} />
				</Box>
			</Container>
		</Box>
	);
}
