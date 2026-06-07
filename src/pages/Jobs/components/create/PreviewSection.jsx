import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { formatDeadline, formatOption, formatValue, getEstimatedCost } from "../../utils";
import { surfaceSectionSx } from "../../../../theme/layout";

const previewCardSx = (theme) => ({
	p: 2,
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: 2,
	bgcolor: "background.default",
});

const metaRowSx = {
	display: "flex",
	flexWrap: "wrap",
	gap: 1,
};

const detailGridSx = {
	display: "grid",
	gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
	gap: 1.25,
};

export default function PreviewSection({ jobData }) {
	const hasRequirements = jobData.requirements?.some(Boolean);
	const budgetLabel = jobData.budgetType === "hourly" ? "Hourly rate" : "Fixed budget";
	const budgetValue = jobData.rate ? `${jobData.rate} ${jobData.currency}` : "Not set";
	const locationType = formatOption(jobData.locationType, "Location type");
	const budgetType = formatOption(jobData.budgetType, "Budget type");
	const estimatedCost = getEstimatedCost(jobData);
	return (
		<Box sx={surfaceSectionSx}>
			<Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
				Preview Job post
			</Typography>

			<Box sx={previewCardSx}>
				<Stack spacing={2}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 900 }}>
							{formatValue(jobData.title, "Untitled job")}
						</Typography>

						<Typography variant="body" sx={{ fontWeight: 900 }}>
							{formatValue(jobData.category, "No category")}
						</Typography>
					</Box>

					<Box sx={metaRowSx}>
						<Chip label={locationType} size="small" />
						<Chip label={budgetType} size="small" />
						<Chip label={formatDeadline(jobData.deadline)} size="small" />
					</Box>

					<Typography variant="body2" color="text.secondary">
						{formatValue(jobData.description, "Job description will appear here.")}
					</Typography>

					<Divider />

					<Stack spacing={1}>
						<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
							Budget details
						</Typography>

						<Box sx={detailGridSx}>
							<Box sx={{ minWidth: 0 }}>
								<Typography variant="caption" color="text.secondary">
									{budgetLabel}
								</Typography>

								<Typography variant="body2" sx={{ fontWeight: 700 }}>
									{budgetValue}
								</Typography>
							</Box>

							<Box sx={{ minWidth: 0 }}>
								<Typography variant="caption" color="text.secondary">
									Duration
								</Typography>

								<Typography variant="body2" sx={{ fontWeight: 700 }}>
									{jobData.durationDays ? `${jobData.durationDays} days` : "Not set"}
								</Typography>
							</Box>

							<Box sx={{ minWidth: 0 }}>
								<Typography variant="caption" color="text.secondary">
									Hours per week
								</Typography>

								<Typography variant="body2" sx={{ fontWeight: 700 }}>
									{jobData.hoursPerWeek || "Optional"}
								</Typography>
							</Box>
						</Box>
					</Stack>

					<Divider />

					<Stack spacing={1}>
						<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
							Contract expectations
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{formatValue(jobData.deliverables, "Deliverables will appear here.")}
						</Typography>

						{hasRequirements && (
							<>
								<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
									Requirements
								</Typography>

								<Box component="ul" sx={{ m: 0, pl: 2.5 }}>
									{jobData.requirements.filter(Boolean).map((requirement, index) => (
										<Typography key={index} component="li" variant="body2" color="text.secondary">
											{requirement}
										</Typography>
									))}
								</Box>
							</>
						)}
					</Stack>
				</Stack>
			</Box>
			<Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
				<Typography variant="body2" color="text.secondary">
					Total estimated cost:
				</Typography>

				<Typography variant="body2" sx={{ fontWeight: 900 }}>
					{estimatedCost}
				</Typography>
			</Stack>
		</Box>
	);
}
