import { Chip, Stack } from "@mui/material";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import { chipRowSx, createFilterChipSx } from "./StatusFilter.styles";

export default function StatusFilter({ statuses, value, onChange }) {
	const options = [
		{ id: "all", label: "All", icon: AppsRoundedIcon },
		...Object.entries(statuses).map(([id, status]) => ({ id, ...status })),
	];

	return (
		<Stack direction="row" role="group" aria-label="Filter by status" sx={chipRowSx}>
			{options.map((option) => {
				const Icon = option.icon;
				const selected = option.id === value;

				return (
					<Chip
						key={option.id}
						label={option.label}
						icon={Icon ? <Icon /> : undefined}
						variant="outlined"
						clickable
						aria-pressed={selected}
						onClick={() => onChange(option.id)}
						sx={createFilterChipSx(option, selected)}
					/>
				);
			})}
		</Stack>
	);
}
