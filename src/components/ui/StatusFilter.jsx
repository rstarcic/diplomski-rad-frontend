import { Chip, Stack } from "@mui/material";

const chipRowSx = {
	gap: 1,
	flexWrap: { xs: "nowrap", sm: "wrap" },
	overflowX: { xs: "auto", sm: "visible" },
	"&::-webkit-scrollbar": { display: "none" },
	scrollbarWidth: "none",
	"& .MuiChip-root": { flexShrink: 0 },
};

export default function StatusFilter({ statuses, value, onChange }) {
	const options = [
		{ id: "all", label: "All" },
		...Object.entries(statuses).map(([id, status]) => ({ id, label: status.label })),
	];

	return (
		<Stack direction="row" sx={chipRowSx}>
			{options.map((option) => (
				<Chip
					key={option.id}
					label={option.label}
					color={option.id === value ? "primary" : "default"}
					variant={option.id === value ? "filled" : "outlined"}
					onClick={() => onChange(option.id)}
				/>
			))}
		</Stack>
	);
}
