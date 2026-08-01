export const rightPanelTitleSx = {
	fontWeight: 800,
	mb: 1.5,
};

export const timelineItemSx = {
	display: "flex",
	gap: 1.5,
};

export const timelineRailSx = {
	width: 16,
	alignItems: "center",
	flexShrink: 0,
	mt: 0.3,
};

export const timelineDotSx = (isLast) => ({
	width: 10,
	height: 10,
	borderRadius: (theme) => theme.custom.radius.circle,
	flexShrink: 0,
	bgcolor: isLast ? "primary.main" : "background.paper",
	border: "2px solid",
	borderColor: isLast ? "primary.main" : "divider",
});

export const timelineConnectorSx = {
	width: 2,
	flex: 1,
	bgcolor: "divider",
	my: 0.5,
	minHeight: 20,
};

export const timelineContentSx = (isLast) => ({
	pb: isLast ? 0 : 2,
	minWidth: 0,
});

export const timelineHeadingSx = {
	alignItems: "center",
	flexWrap: "wrap",
};

export const latestChipSx = {
	height: 17,
	fontSize: 10,
	fontWeight: 700,
};

export const timelineMetaSx = {
	textTransform: "capitalize",
	display: "block",
};
