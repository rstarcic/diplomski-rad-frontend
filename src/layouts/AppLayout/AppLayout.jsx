import { useRef, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";

import {
	contentSx,
	desktopSidebarSx,
	layoutSx,
	mobileDrawerPaperSx,
	mobileDrawerSx,
	pageContentSx,
} from "./AppLayout.styles";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";

export default function AppLayout() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const menuButtonRef = useRef(null);

	const openMobileMenu = () => {
		menuButtonRef.current?.blur();
		setMobileOpen(true);
	};

	const closeMobileMenu = () => {
		setMobileOpen(false);
	};

	const restoreMenuButtonFocus = () => {
		menuButtonRef.current?.focus();
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
					transition: {
						onExited: restoreMenuButtonFocus,
					},
				}}
			>
				<Sidebar onNavigate={closeMobileMenu} />
			</Drawer>

			<Box sx={contentSx}>
				<MobileHeader menuButtonRef={menuButtonRef} onMenuClick={openMobileMenu} />

				<Box sx={pageContentSx}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
}
