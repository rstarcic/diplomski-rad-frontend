import { Chip } from "@mui/material";

const createStatusChipSx = (entry, customSx) => (theme) => {
	const palette = theme.custom.alerts[entry.paletteKey];

	return {
		height: 28,
		fontWeight: 700,
		flexShrink: 0,
		bgcolor: palette.background,
		color: palette.color,
		border: `1px solid ${palette.border}`,
		"& .MuiChip-label": { px: 1.1 },
		"& .MuiChip-icon": { color: palette.color, fontSize: 16, ml: 0.8 },
		...(typeof customSx === "function" ? customSx(theme) : customSx),
	};
};

export default function StatusChip({ status, config, showIcon = true, label, sx, ...props }) {
	const entry = config?.[status];
	if (!entry) return null;

	const Icon = showIcon ? entry.icon : null;

	return (
		<Chip
			label={label ?? entry.label}
			size="small"
			icon={Icon ? <Icon /> : undefined}
			{...props}
			sx={createStatusChipSx(entry, sx)}
		/>
	);
}
