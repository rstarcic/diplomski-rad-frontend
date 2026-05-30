import { useState } from "react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { sidebarItems } from "./SidebarConfig";

export const sidebarWidth = 270;

const isClient = false;
const currentRole = isClient ? "client" : "contractor";

const sidebarSx = (theme) => ({
	width: sidebarWidth,
	height: "100%",
	p: 2,
	display: "flex",
	flexDirection: "column",
	bgcolor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
});

const childItemSx = {
	ml: 3,
	my: 0.25,
	py: 0.85,
	pl: 3,
	borderRadius: 1,
	color: "primary.contrastText",
	opacity: 0.86,
	"&.is-active": {
		opacity: 1,
		bgcolor: "rgba(255, 255, 255, 0.16)",
	},
};

const itemIconSx = {
	minWidth: 38,
	color: "primary.contrastText",
};

const itemButtonSx = {
	borderRadius: 1,
	color: "primary.contrastText",
	"&.is-active": {
		bgcolor: "rgba(255, 255, 255, 0.12)",
	},
};

const chevronSx = {
	transition: "transform 160ms ease",
	"&.is-open": {
		transform: "rotate(180deg)",
	},
};

const secondaryTextSx = (theme) => ({
	color: theme.palette.primary.contrastText,
	opacity: 0.72,
});

function SidebarHeader({ isClientWorkspace }) {
	return (
		<Box sx={{ px: 1.5, mb: 3 }}>
			<Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
				WorkLink
			</Typography>

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
	const isActive = currentPath === item.path || item.children?.some((child) => currentPath === child.path);

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
	const workspaceItems = sidebarItems[currentRole];

	return (
		<Box sx={sidebarSx}>
			<SidebarHeader isClientWorkspace={isClient} />

			<List>
				{workspaceItems.map((item) => (
					<SidebarItem key={item.path} item={item} currentPath={pathname} onNavigate={onNavigate} />
				))}
			</List>

			<Box sx={{ mt: "auto", pt: 3 }}>
				<ListItemButton>
					<ListItemIcon sx={itemIconSx}>
						<LogoutRoundedIcon />
					</ListItemIcon>
					<ListItemText primary="Sign out" />
				</ListItemButton>
			</Box>
		</Box>
	);
}
