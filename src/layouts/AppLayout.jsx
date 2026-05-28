import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import Header from "./components/Header";
import Sidebar, { sidebarWidth } from "./components/Sidebar";

const layoutSx = {
	width: "100%",
	height: "100vh",
	display: "flex",
	bgcolor: "background.default",
	overflow: "hidden",
};

const desktopSidebarSx = {
	width: sidebarWidth,
	flexShrink: 0,
	height: "100vh",
	display: { xs: "none", md: "block" },
};

const mobileDrawerSx = {
	display: { xs: "block", md: "none" },
};

const mobileDrawerPaperSx = {
	width: sidebarWidth,
	maxWidth: "85vw",
};

const contentSx = {
	flex: 1,
	minWidth: 0,
	width: "100%",
	height: "100vh",
	overflow: "auto",
};

const pageContentSx = {
	width: "100%",
	maxWidth: "lg",
	mx: "auto",
	p: { xs: 2, sm: 3, lg: 4 },
};

export default function AppLayout() {
	const [mobileOpen, setMobileOpen] = useState(false);

	const openMobileMenu = () => {
		setMobileOpen(true);
	};

	const closeMobileMenu = () => {
		setMobileOpen(false);
	};

	return (
		<Box sx={layoutSx}>
			<Box component="aside" sx={desktopSidebarSx}>
				<Sidebar />
			</Box>

			<Drawer
				open={mobileOpen}
				onClose={closeMobileMenu}
				sx={mobileDrawerSx}
				slotProps={{
					paper: {
						sx: mobileDrawerPaperSx,
					},
				}}
			>
				<Sidebar onNavigate={closeMobileMenu} />
			</Drawer>

			<Box sx={contentSx}>
				<Header onMenuClick={openMobileMenu} />

				<Box sx={pageContentSx}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}
