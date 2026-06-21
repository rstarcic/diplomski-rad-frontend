import { Box, Chip, Stack, Typography } from "@mui/material";
import { formatDate } from "../../../../utils/formatters";

const rightPanelTitleSx = {
	fontWeight: 800,
	mb: 1.5,
};

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
					return (
						<Box key={update.id} sx={{ display: "flex", gap: 1.5 }}>
							<Stack sx={{ width: 16, alignItems: "center", flexShrink: 0, mt: 0.3 }}>
								<Box
									sx={{
										width: 10,
										height: 10,
										borderRadius: "50%",
										flexShrink: 0,
										bgcolor: isLast ? "primary.main" : "background.paper",
										border: "2px solid",
										borderColor: isLast ? "primary.main" : "divider",
									}}
								/>
								{!isLast && <Box sx={{ width: 2, flex: 1, bgcolor: "divider", my: 0.5, minHeight: 20 }} />}
							</Stack>

							<Box sx={{ pb: isLast ? 0 : 2, minWidth: 0 }}>
								<Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexWrap: "wrap" }}>
									<Typography variant="body2" fontWeight={800}>
										Offer #{update.roundNumber}
									</Typography>
									{isLast && (
										<Chip
											label="Latest"
											size="small"
											color="primary"
											sx={{ height: 17, fontSize: 10, fontWeight: 700 }}
										/>
									)}
								</Stack>
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ textTransform: "capitalize", display: "block" }}
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
