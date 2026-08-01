export const profileContactBoxSx = {
	display: "flex",
	alignItems: "center",
	gap: 1,
	p: 1.25,
	minWidth: 0,
	overflow: "hidden",
	border: "1px solid",
	borderColor: "divider",
	borderRadius: 2,
};

export const profileContactIconSx = {
	fontSize: 18,
	color: "primary.main",
	flexShrink: 0,
};

export const profileContactTextSx = {
	fontWeight: 700,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
};

export const memberSinceBoxSx = (theme) => ({
	...profileContactBoxSx,
	borderColor: theme.custom.tint.primaryBorder,
	bgcolor: theme.custom.tint.primarySubtle,
});

export const memberSinceTextSx = {
	fontWeight: 700,
};
