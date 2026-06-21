import { Box } from "@mui/material";

import StatsCard from "../../../Dashboards/components/StatsCard";

const statsGridSx = {
	display: "grid",
	gridTemplateColumns: {
		xs: "1fr",
		sm: "repeat(2, minmax(0, 1fr))",
	},
	gap: 2,
};

export default function ProfileStatsSection({ stats = [], config = {} }) {
	return (
		<Box sx={statsGridSx}>
			{stats.map((stat, index) => {
				const statConfig = config[stat.id];
				const Icon = statConfig?.Icon;

				const isLastOdd = stats.length % 2 !== 0 && index === stats.length - 1;

				return (
					<Box
						key={stat.id}
						sx={{
							gridColumn: {
								xs: "auto",
								sm: isLastOdd ? "1 / -1" : "auto",
							},
						}}
					>
						<StatsCard
							label={statConfig?.label ?? stat.title}
							value={stat.value}
							subtitle={stat.subtitle}
							icon={Icon ? <Icon /> : null}
							accent={statConfig?.accent}
						/>
					</Box>
				);
			})}
		</Box>
	);
}
