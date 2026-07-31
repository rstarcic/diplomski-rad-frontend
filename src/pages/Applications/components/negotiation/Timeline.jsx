import { Box, Chip, Stack, Typography } from "@mui/material";

import { formatDate } from "../../../../utils/formatters";
import { getNegotiationUpdateLabel } from "./negotiationLabels";
import {
	latestChipSx,
	rightPanelTitleSx,
	timelineConnectorSx,
	timelineContentSx,
	timelineDotSx,
	timelineHeadingSx,
	timelineItemSx,
	timelineMetaSx,
	timelineRailSx,
} from "./Timeline.styles";

export default function NegotiationTimeline({ updates }) {
	if (!updates?.length) return null;

	return (
		<Box>
			<Typography variant="subtitle2" sx={rightPanelTitleSx}>
				Negotiation Timeline
			</Typography>
			<Stack spacing={0}>
				{updates.map((update, index) => {
					const isLast = index === updates.length - 1;
					const updateLabel = getNegotiationUpdateLabel(update, index);
					return (
						<Box key={update.id} sx={timelineItemSx}>
							<Stack sx={timelineRailSx}>
								<Box sx={timelineDotSx(isLast)} />
								{!isLast && <Box sx={timelineConnectorSx} />}
							</Stack>

							<Box sx={timelineContentSx(isLast)}>
								<Stack direction="row" spacing={0.75} sx={timelineHeadingSx}>
									<Typography variant="body2" fontWeight={800}>
										{updateLabel}
									</Typography>
									{isLast && (
										<Chip
											label="Latest"
											size="small"
											color="primary"
											sx={latestChipSx}
										/>
									)}
								</Stack>
								<Typography
									variant="caption"
									color="text.secondary"
									sx={timelineMetaSx}
								>
									{update.submittedBy} · {formatDate(update.submittedAt)}
								</Typography>
								<Typography variant="caption" color="primary.main" fontWeight={800}>
									€{update.budgetAmount}
								</Typography>
							</Box>
						</Box>
					);
				})}
			</Stack>
		</Box>
	);
}
