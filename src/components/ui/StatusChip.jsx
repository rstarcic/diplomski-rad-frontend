import { Chip } from "@mui/material";

export default function StatusChip({ status, config, showIcon = true, sx, ...props }) {
	const entry = config?.[status];
	if (!entry) return null;

	const Icon = showIcon ? entry.icon : null;

	return (
		<Chip
			label={entry.label}
			size="small"
			icon={Icon ? <Icon /> : undefined}
			{...props}
			sx={(theme) => {
				const palette = theme.custom.alerts[entry.paletteKey];
				return {
					fontWeight: 700,
					flexShrink: 0,
					bgcolor: palette.background,
					color: palette.color,
					border: `1px solid ${palette.border}`,
					"& .MuiChip-icon": { color: palette.color, fontSize: 15 },
					...(typeof sx === "function" ? sx(theme) : sx),
				};
			}}
		/>
	);
}
