import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeHeader from "./components/HomeHeader";
import RolePanel from "./components/RolePanel";
import { homePageSx } from "../../theme/layout";
const mainSx = {
	position: "relative",
	display: "grid",
	gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
	gap: { xs: 2.5, xl: 2.8 },
	alignItems: "stretch",
};

export default function HomePage() {
	const navigate = useNavigate();
	const goToSignup = (role) => navigate("/signup", { state: role ? { role } : undefined });

	return (
		<Box sx={homePageSx}>
			<Container maxWidth={false} sx={{ maxWidth: 1720, px: { xs: 2, md: 4, xl: 7 }, py: { xs: 2, md: 3 } }}>
				<HomeHeader onLogin={() => navigate("/login")} onSignup={goToSignup} />

				<Box component="main" sx={mainSx}>
					<RolePanel variant="client" onSignup={goToSignup} />
					<RolePanel variant="contractor" onSignup={goToSignup} />
				</Box>

			</Container>
		</Box>
	);
}
