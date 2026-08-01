import { Box } from "@mui/material";

import StatsCard from "../../../../components/stats/StatsCard";

const statsGridSx = (columns) => ({
	display: "grid",
	gridTemplateColumns: {
		xs: "1fr",
		sm: "repeat(2, minmax(0, 1fr))",
		lg: `repeat(${columns}, minmax(0, 1fr))`,
	},
	gap: 2,
});

const statItemSx = (spanFullWidth) => ({
	gridColumn: {
		xs: "auto",
		sm: spanFullWidth ? "1 / -1" : "auto",
	},
});

export default function ProfileStatsSection({ stats = [], config = {}, columns = 2, compact = false, tone }) {
	return (
		<Box sx={statsGridSx(columns)}>
			{stats.map((stat, index) => {
				const statConfig = config[stat.id];
				const isLastItem = index === stats.length - 1;

				const shouldSpanFullWidth = columns === 2 && stats.length % 2 !== 0 && isLastItem;

				return (
					<Box key={stat.id} sx={statItemSx(shouldSpanFullWidth)}>
						<StatsCard
							label={statConfig?.label ?? stat.title}
							value={stat.value}
							subtitle={stat.subtitle}
							Icon={statConfig?.Icon}
							compact={compact}
							tone={tone ?? statConfig?.tone}
						/>
					</Box>
				);
			})}
		</Box>
	);
}
