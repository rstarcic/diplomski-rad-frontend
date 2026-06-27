import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import ScreenSearchDesktopRoundedIcon from '@mui/icons-material/ScreenSearchDesktopRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const clientSettingsItems = [
	{ label: "Payments", path: "/client/settings/payments" },
	{ label: "Password & security", path: "/client/settings/security" },

];

const contractorSettingsItems = [
	{ label: "Payouts", path: "/contractor/settings/payouts" },
	{ label: "Password & security", path: "/contractor/settings/security" },

];

export const sidebarItems = {
	client: [
		{ label: "Dashboard", path: "/client/dashboard", icon: DashboardRoundedIcon },
		{ label: "Create job", path: "/client/jobs/create", icon: WorkOutlineRoundedIcon },
		{ label: "My jobs", path: "/client/jobs", icon: WorkHistoryRoundedIcon },
		{ label: "Profile", path: "/client/profile", icon: AccountCircleIcon },
		{
			label: "Settings",
			path: "/client/settings",
			icon: SettingsRoundedIcon,
			children: clientSettingsItems,
		},
	],
	contractor: [
		{ label: "Dashboard", path: "/contractor/dashboard", icon: DashboardRoundedIcon },
		{ label: "Search jobs", path: "/contractor/jobs/search", icon: ScreenSearchDesktopRoundedIcon },
		{ label: "Applications", path: "/contractor/applications", icon: StickyNote2RoundedIcon },
		{ label: "Profile", path: "/contractor/profile", icon: AccountCircleIcon },
		{
			label: "Settings",
			path: "/contractor/settings",
			icon: SettingsRoundedIcon,
			children: contractorSettingsItems,
		},
	],
};
