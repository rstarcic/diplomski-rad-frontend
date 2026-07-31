import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const headerSx = {
	height: 64,
	width: "100%",
	boxSizing: "border-box",
	display: { xs: "flex", md: "none" },
	position: "fixed",
	top: 0,
	left: 0,
	zIndex: (theme) => theme.zIndex.appBar,
	alignItems: "center",
	px: 2,
	bgcolor: "primary.main",
	color: "primary.contrastText",
	boxShadow: 2,
};

export default function MobileHeader({ onMenuClick }) {
	return (
		<Box component="header" sx={headerSx}>
			<IconButton onClick={onMenuClick} aria-label="Open sidebar" color="inherit">
				<MenuIcon />
			</IconButton>
		</Box>
	);
}
