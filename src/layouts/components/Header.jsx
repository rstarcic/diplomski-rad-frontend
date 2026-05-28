import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";

export default function Header({ onMenuClick }) {
	return (
		<Box
			component="header"
			sx={{
				height: 64,
				width: "100%",
				boxSizing: "border-box",
				display: { xs: "flex", md: "none" },
				alignItems: "center",
				px: 2,
				bgcolor: "primary.main",
				color: "primary.contrastText",
			}}
		>
			<IconButton onClick={onMenuClick} aria-label="Open sidebar" color="inherit">
				<MenuIcon />
			</IconButton>

			<Box
				component="img"
				src={logo}
				alt="WorkLink"
				sx={{
					height: 45,
					width: "auto",
					display: "block",
				}}
			/>
		</Box>
	);
}
