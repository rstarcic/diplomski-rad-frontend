import { useState } from "react";
import { Box, Tab, Tabs, Tooltip } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const tabsSx = {
	borderBottom: 1,
	borderColor: "divider",
	mb: 3,
};

const tabSx = {
	textTransform: "none",
	fontWeight: 700,
	minHeight: 52,
	minWidth: { xs: "auto", sm: 120 },
	
	fontSize: { xs: "0.75rem", sm: "0.875rem" },
};

function TabLabel({ label, locked }) {
	if (!locked) return label;
	return (
		<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
			{label}
			<LockRoundedIcon sx={{ fontSize: 13 }} />
		</Box>
	);
}

export default function StepTabs({ tabs, initialTab = 0 }) {
	const [active, setActive] = useState(initialTab);

	const handleChange = (_, newValue) => {
		if (!tabs[newValue]?.locked) setActive(newValue);
	};

	return (
		<Box>
			<Tabs
				value={active}
				onChange={handleChange}
				sx={tabsSx}
				variant="scrollable"
				scrollButtons="auto"
				allowScrollButtonsMobile
			>
				{tabs.map((tab) => {
					const tabEl = (
						<Tab
							key={tab.label}
							icon={tab.icon}
							iconPosition="start"
							label={<TabLabel label={tab.label} locked={tab.locked} />}
							disabled={tab.locked}
							sx={{
								...tabSx,
								opacity: tab.locked ? 0.4 : 1,
								pointerEvents: tab.locked ? "none" : "auto",
							}}
						/>
					);

					if (tab.locked && tab.lockReason) {
						return (
							<Tooltip key={tab.label} title={tab.lockReason} placement="top" arrow>
								<span style={{ display: "inline-flex" }}>{tabEl}</span>
							</Tooltip>
						);
					}

					return tabEl;
				})}
			</Tabs>

			{tabs.map((tab, index) =>
				active === index ? <Box key={tab.label}>{tab.content}</Box> : null
			)}
		</Box>
	);
}
