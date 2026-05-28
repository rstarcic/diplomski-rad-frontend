import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
export const sidebarWidth = 260;

const navItems = [
	{ label: "Dashboard", path: "/dashboard", icon: <DashboardRoundedIcon /> },
	{ label: "Jobs", path: "/jobs", icon: <WorkOutlineRoundedIcon /> },
	{ label: "Applications", path: "/applications", icon: <StickyNote2RoundedIcon /> },
	{ label: "Settings", path: "/settings", icon: <ManageAccountsRoundedIcon /> }, // TODO: Add depending on user role (client/contractor)
];

const isClient = true;

export default function Sidebar({ onNavigate }) {
	return (
		<Box
			sx={(theme) => ({
				width: sidebarWidth,
				height: "100%",
				p: 2,
				display: "flex",
				flexDirection: "column",
				bgcolor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
			})}
		>
			<Box sx={{ px: 1.5 }}>
				<Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
					WorkLink
				</Typography>
				<Typography
					variant="body2"
					sx={(theme) => ({
						color: theme.palette.primary.contrastText,
						opacity: 0.72,
						mb: 0.5,
					})}
				>
					{isClient ? "Client workspace" : "Contractor workspace"}
				</Typography>
			</Box>

			<List>
				{navItems.map((item) => (
					<ListItemButton key={item.path} component="a" href={item.path} onClick={onNavigate}>
						<ListItemIcon sx={{ color: "primary.contrastText" }}>{item.icon}</ListItemIcon>
						<ListItemText primary={item.label} />
					</ListItemButton>
				))}
			</List>
			<Box sx={{ mt: "auto", pt: 3 }}>
				<ListItemButton>
					<ListItemIcon sx={{ color: "primary.contrastText" }}>
						<LogoutRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Sign out" />
				</ListItemButton>
			</Box>
		</Box>
	);
}
