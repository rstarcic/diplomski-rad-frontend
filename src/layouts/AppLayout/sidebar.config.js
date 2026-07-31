import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import ScreenSearchDesktopRoundedIcon from "@mui/icons-material/ScreenSearchDesktopRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";

export const sidebarItems = {
	client: [
		{ label: "Dashboard", path: "/client/dashboard", icon: DashboardRoundedIcon },
		{ label: "Create job", path: "/client/jobs/create", icon: WorkOutlineRoundedIcon },
		{ label: "My jobs", path: "/client/jobs", icon: WorkHistoryRoundedIcon },
		{ label: "Profile", path: "/client/profile", icon: AccountCircleIcon },
		{
			label: "Payments",
			path: "/client/stripe",
			icon: PaymentsRoundedIcon,
		},
	],
	contractor: [
		{ label: "Dashboard", path: "/contractor/dashboard", icon: DashboardRoundedIcon },
		{ label: "Search jobs", path: "/contractor/jobs/search", icon: ScreenSearchDesktopRoundedIcon },
		{ label: "Applications", path: "/contractor/applications", icon: StickyNote2RoundedIcon },
		{ label: "Profile", path: "/contractor/profile", icon: AccountCircleIcon },
		{
			label: "Payouts",
			path: "/contractor/stripe",
			icon: AccountBalanceWalletRoundedIcon,
		},
	],
};
