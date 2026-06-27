import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { layoutSx, desktopSidebarSx, mobileDrawerSx, mobileDrawerPaperSx, contentSx, pageContentSx } from "./AppLayout.styles";

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
