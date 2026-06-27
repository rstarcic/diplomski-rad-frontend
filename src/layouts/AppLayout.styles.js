import { sidebarWidth } from "./components/Sidebar.styles";
import { appPageContentSx } from "../theme/layout";

export const layoutSx = {
	width: "100%",
	height: "100vh",
	display: "flex",
	bgcolor: "background.default",
	overflow: "hidden",
};

export const desktopSidebarSx = {
	width: sidebarWidth,
	flexShrink: 0,
	height: "100vh",
	display: { xs: "none", md: "block" },
};

export const mobileDrawerSx = {
	display: { xs: "block", md: "none" },
};

export const mobileDrawerPaperSx = {
	width: sidebarWidth,
	maxWidth: "85vw",
};

export const contentSx = {
	flex: 1,
	minWidth: 0,
	width: "100%",
	height: "100vh",
	overflow: "auto",
};

export const pageContentSx = {
	...appPageContentSx,
};
