import { Box } from "@mui/material";

import StatsCard from "./StatsCard";

const statsGridSx = {
	mt: { xs: 2, md: 3.5 },
	display: "grid",
	gridTemplateColumns: {
		xs: "1fr",
		sm: "repeat(2, minmax(0, 1fr))",
		lg: "repeat(4, minmax(0, 1fr))",
	},
	gap: { xs: 1.25, sm: 2, md: 2.5 },
};

export default function DashboardStatsSection({ stats = [], config = {} }) {
	return (
		<Box sx={statsGridSx}>
			{stats.map((stat) => {
				const statConfig = config[stat.id];

				return (
					<Box key={stat.id}>
						<StatsCard
							label={statConfig?.label ?? stat.title}
							value={stat.value}
							subtitle={stat.subtitle}
							icon={statConfig?.Icon ? <statConfig.Icon /> : null}
							accent={statConfig?.accent}
						/>
					</Box>
				);
			})}
		</Box>
	);
}
