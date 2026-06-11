import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../components/ui/StatusChip";
import { JOB_STATUSES } from "../../../../constants/statuses";
import { detailGridSx, sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { formatDate } from "../../../../utils/formatters";

function SectionTitle({ children }) {
	return (
		<Typography variant="subtitle2" sx={sectionTitleSx}>
			{children}
		</Typography>
	);
}

function DetailItem({ label, value }) {
	return (
		<Box sx={{ minWidth: 0 }}>
			<Typography variant="caption" color="text.secondary">
				{label}
			</Typography>

			<Typography variant="body2" sx={{ fontWeight: 700 }}>
				{value}
			</Typography>
		</Box>
	);
}

export default function JobDetailsSection({ job }) {
	const budgetLabel = job.budgetType === "Hourly" ? "Hourly rate" : "Fixed budget";
	const budgetValue = job.budgetType === "Hourly" ? `${job.budgetAmount} €/h` : `${job.budgetAmount} €`;

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				{/* Title + status */}
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 900 }}>
							{job.title}
						</Typography>

						<Typography variant="body" sx={{ fontWeight: 900 }}>
							{job.category}
						</Typography>
					</Box>

					<StatusChip status={job.status} config={JOB_STATUSES[job.status]} />
				</Stack>

				<Typography variant="body2" color="text.secondary">
					{job.description}
				</Typography>

				{/* Requirements */}
				{job.requirements?.some(Boolean) && (
					<>
						<Divider />

						<Stack spacing={1}>
							<SectionTitle>Requirements</SectionTitle>

							<Box component="ul" sx={{ m: 0, pl: 2.5 }}>
								{job.requirements.filter(Boolean).map((requirement, index) => (
									<Typography key={index} component="li" variant="body2" color="text.secondary">
										{requirement}
									</Typography>
								))}
							</Box>
						</Stack>
					</>
				)}

				<Divider />

				{/* Budget details */}
				<Stack spacing={1}>
					<SectionTitle>Budget details</SectionTitle>

					<Box sx={detailGridSx}>
						<DetailItem label={budgetLabel} value={budgetValue} />
						<DetailItem label="Duration" value={job.durationDays ? `${job.durationDays} days` : "Not set"} />
						<DetailItem label="Hours per week" value={job.hoursPerWeek || "Optional"} />
						<DetailItem label="Deadline" value={formatDate(job.deadline)} />
					</Box>
				</Stack>

				<Divider />

				{/* Contract expectations */}
				<Stack spacing={1}>
					<SectionTitle>Contract expectations</SectionTitle>

					<Typography variant="body2" color="text.secondary">
						{job.deliverables || "No deliverables specified."}
					</Typography>
				</Stack>
			</Stack>
		</Card>
	);
}
