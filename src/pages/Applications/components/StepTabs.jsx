import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const tabsSx = {
	borderBottom: 1,
	borderColor: "divider",
	mb: 3,
};

const tabLabelSx = {
	display: "flex",
	alignItems: "center",
	gap: 0.5,
};

const getTabSx = (locked) => ({
	textTransform: "none",
	fontWeight: 700,
	minHeight: 52,
	minWidth: { xs: "auto", sm: 120 },
	fontSize: { xs: "0.75rem", sm: "0.875rem" },
	opacity: locked ? 0.4 : 1,
});

function findAvailableTab(tabs, preferredIndex) {
	if (!tabs[preferredIndex]?.locked) return preferredIndex;

	const firstAvailableIndex = tabs.findIndex((tab) => !tab.locked);
	return firstAvailableIndex >= 0 ? firstAvailableIndex : false;
}

function TabLabel({ label, locked, lockReason }) {
	if (!locked) return label;

	const content = (
		<Box sx={tabLabelSx}>
			{label}
			<LockRoundedIcon sx={{ fontSize: 13 }} />
		</Box>
	);

	return lockReason ? (
		<Tooltip title={lockReason} placement="top" arrow>
			<span>{content}</span>
		</Tooltip>
	) : (
		content
	);
}

export default function StepTabs({ tabs, initialTab = 0, selectedTab }) {
	const [active, setActive] = useState(() => findAvailableTab(tabs, initialTab));
	const visibleActive = tabs[active]?.locked ? findAvailableTab(tabs, initialTab) : active;
	const activeTab = tabs[visibleActive];

	useEffect(() => {
		if (!selectedTab) return;

		const requestedIndex = tabs.findIndex((tab) => tab.label === selectedTab && !tab.locked);
		if (requestedIndex >= 0) setActive(requestedIndex);
	}, [selectedTab, tabs]);

	const handleChange = (_, newValue) => {
		if (!tabs[newValue]?.locked) setActive(newValue);
	};

	return (
		<Box>
			<Tabs
				value={visibleActive}
				onChange={handleChange}
				sx={tabsSx}
				variant="scrollable"
				scrollButtons="auto"
				allowScrollButtonsMobile
			>
				{tabs.map((tab) => (
					<Tab
						key={tab.label}
						icon={tab.icon}
						iconPosition="start"
						label={<TabLabel label={tab.label} locked={tab.locked} lockReason={tab.lockReason} />}
						aria-disabled={tab.locked}
						sx={getTabSx(tab.locked)}
					/>
				))}
			</Tabs>

			{activeTab ? <Box key={activeTab.label}>{activeTab.content}</Box> : null}
		</Box>
	);
}
