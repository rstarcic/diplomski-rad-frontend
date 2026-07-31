import { useState } from "react";
import {
	Box,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../components/ui/Logo";
import { ROLES } from "../../constants/roles";
import { useAuth } from "../../hooks/useAuth";
import { sidebarItems } from "./sidebar.config";
import {
	chevronSx,
	childItemSx,
	itemButtonSx,
	itemIconSx,
	secondaryTextSx,
	sidebarHeaderSx,
	sidebarSx,
	signOutAreaSx,
	signOutButtonSx,
} from "./Sidebar.styles";

function SidebarHeader({ isClientWorkspace }) {
	return (
		<Box sx={sidebarHeaderSx}>
			<Logo showMotto={false} />

			<Typography variant="body2" sx={secondaryTextSx}>
				{isClientWorkspace ? "Client workspace" : "Contractor workspace"}
			</Typography>
		</Box>
	);
}

function SidebarChildItem({ item, isActive, onNavigate }) {
	return (
		<ListItemButton
			component={RouterLink}
			to={item.path}
			onClick={onNavigate}
			className={isActive ? "is-active" : undefined}
			sx={childItemSx}
		>
			<ListItemText primary={item.label} primaryTypographyProps={{ variant: "body2" }} />
		</ListItemButton>
	);
}

function SidebarItem({ item, currentPath, onNavigate }) {
	const [isOpen, setIsOpen] = useState(() => item.children?.some((child) => currentPath === child.path));
	const Icon = item.icon;
	const hasChildren = Boolean(item.children?.length);
	const isActive = !hasChildren && currentPath === item.path;

	const toggleChildren = () => {
		setIsOpen((prev) => !prev);
	};

	if (hasChildren) {
		return (
			<Box sx={{ mb: 0.5 }}>
				<ListItemButton
					type="button"
					onClick={toggleChildren}
					className={isActive ? "is-active" : undefined}
					sx={itemButtonSx}
				>
					<ListItemIcon sx={itemIconSx}>
						<Icon />
					</ListItemIcon>

					<ListItemText primary={item.label} />
					<ExpandMoreRoundedIcon className={isOpen ? "is-open" : undefined} fontSize="small" sx={chevronSx} />
				</ListItemButton>

				<Collapse in={isOpen} timeout="auto" unmountOnExit>
					{item.children.map((child) => (
						<SidebarChildItem
							key={child.path}
							item={child}
							isActive={currentPath === child.path}
							onNavigate={onNavigate}
						/>
					))}
				</Collapse>
			</Box>
		);
	}

	return (
		<Box sx={{ mb: 0.5 }}>
			<ListItemButton
				component={RouterLink}
				to={item.path}
				onClick={onNavigate}
				className={isActive ? "is-active" : undefined}
				sx={itemButtonSx}
			>
				<ListItemIcon sx={itemIconSx}>
					<Icon />
				</ListItemIcon>

				<ListItemText primary={item.label} />
			</ListItemButton>
		</Box>
	);
}

export default function Sidebar({ onNavigate }) {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { role, logout } = useAuth();
	const workspaceItems = sidebarItems[role] ?? [];

	const handleSignOut = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<Box sx={sidebarSx}>
			<SidebarHeader isClientWorkspace={role === ROLES.CLIENT} />

			<List>
				{workspaceItems.map((item) => (
					<SidebarItem key={item.path} item={item} currentPath={pathname} onNavigate={onNavigate} />
				))}
			</List>

			<Box sx={signOutAreaSx}>
				<ListItemButton onClick={handleSignOut} sx={signOutButtonSx}>
					<ListItemIcon sx={itemIconSx}>
						<LogoutRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Sign out" />
				</ListItemButton>
			</Box>
		</Box>
	);
}
