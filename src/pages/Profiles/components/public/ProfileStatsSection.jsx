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

export default function ProfileStatsSection({ stats = [], config = {}, columns = 2, compact = false, tone }) {
	return (
		<Box
			sx={{
				...statsGridSx,
				gridTemplateColumns: {
					xs: "1fr",
					sm: "repeat(2, minmax(0, 1fr))",
					lg: `repeat(${columns}, minmax(0, 1fr))`,
				},
			}}
		>
			{stats.map((stat, index) => {
				const statConfig = config[stat.id];
				const Icon = statConfig?.Icon;

				const isLastOdd = columns === 2 && stats.length % 2 !== 0 && index === stats.length - 1;

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
							Icon={Icon}
							compact={compact}
							tone={tone ?? statConfig?.tone}
						/>
					</Box>
				);
			})}
		</Box>
	);
}
