import { Box, Card, Divider, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
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

	const requirements = job.requirements?.filter(Boolean) ?? [];
	const hasRequirements = requirements.length > 0;

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				{/* Description title + status */}
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
					<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
						<Box
							sx={(theme) => ({
								width: 42,
								height: 42,
								borderRadius: (theme) => theme.custom.radius.circle,
								display: "grid",
								placeItems: "center",
								bgcolor: theme.custom.jobForm.sectionIconBackground,
								color: theme.custom.jobForm.sectionIconColor,
								flexShrink: 0,
							})}
						>
							<WorkRoundedIcon sx={{ fontSize: 21 }} />
						</Box>

						<Typography variant="h6" sx={{ fontWeight: 900 }}>
							Job description
						</Typography>
					</Stack>

					<StatusChip status={job.status} config={JOB_STATUSES} />
				</Stack>

				<Typography
					variant="subtitle2"
					sx={(theme) => ({
						width: "fit-content",
						px: 1,
						py: 0.25,
						borderRadius: 1.5,
						bgcolor: theme.custom.jobForm.sectionIconBackground,
						color: theme.custom.jobForm.sectionIconColor,
						fontWeight: 900,
					})}
				>
					{job.category}
				</Typography>

				<Typography variant="body2" color="text.secondary">
					{job.description}
				</Typography>

				{hasRequirements && (
					<>
						<Divider />

						<Stack spacing={1}>
							<SectionTitle>Requirements</SectionTitle>

							<Stack spacing={1}>
								{requirements.map((requirement, index) => (
									<Stack key={index} direction="row" spacing={1} sx={{ alignItems: "center" }}>
										<CheckCircleRoundedIcon sx={{ color: "primary.main", fontSize: 17, flexShrink: 0 }} />
										<Typography variant="body2" color="text.secondary">
											{requirement}
										</Typography>
									</Stack>
								))}
							</Stack>
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
						<DetailItem label="Hours per week" value={job.hoursPerWeek} />
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
