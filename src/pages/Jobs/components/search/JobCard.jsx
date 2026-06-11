import { useNavigate } from "react-router-dom";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { Avatar, Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../components/ui/StatusChip";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { formatBudget, formatDeadline } from "../../../../utils/jobs";
import { JOB_STATUSES } from "../../../../constants/statuses";
import { hoverLiftSx } from "../../../../theme/layout";

const cardSx = {
	...hoverLiftSx,
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	borderRadius: 3,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
	boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
};

const detailsButtonSx = {
	borderRadius: 2,
	px: 2.5,
	whiteSpace: "nowrap",
	flexShrink: 0,
};

export default function JobCard({ job }) {
	const navigate = useNavigate();
	return (
		<Card sx={cardSx}>
			<CardContent
				sx={{
					p: 3,
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Stack spacing={2}>
					<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }} spacing={2}>
						<Box sx={{ minWidth: 0 }}>
							<Typography variant="h6">{job.title}</Typography>

							<Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.75 }}>
								<WorkOutlineRoundedIcon fontSize="small" color="primary" />
								<Typography variant="body2" color="text.secondary" noWrap>
									{job.category}
								</Typography>
							</Stack>
						</Box>

						{job.status && <StatusChip status={job.status} config={JOB_STATUSES[job.status]} />}
					</Stack>

					<Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
						<Chip label={job.workMode} size="small" variant="outlined" />
						<Chip label={job.location} size="small" variant="outlined" />
						<Chip label={job.budgetType} size="small" color="primary" variant="outlined" />
					</Stack>

					<Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
						<Box>
							<Typography variant="caption" color="text.secondary">
								Budget
							</Typography>

							<Typography fontWeight={800} color="primary.main">
								{formatBudget(job)}
							</Typography>
						</Box>

						<Box>
							<Typography variant="caption" color="text.secondary">
								Deadline
							</Typography>

							<Typography fontWeight={700}>{formatDeadline(job.deadline)}</Typography>
						</Box>
					</Stack>
				</Stack>

				<Box sx={{ mt: "auto", pt: 2 }}>
					<Divider sx={{ mb: 2 }} />

					<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }} spacing={2}>
						<Stack direction="row" spacing={1.25} sx={{ minWidth: 0, justifyContent: "center", alignItems: "center" }}>
							<Avatar
								src={job.client?.profileImageUrl}
								alt={`${job.client?.firstName} ${job.client?.lastName}`}
								sx={{
									width: 36,
									height: 36,
									bgcolor: "primary.light",
									flexShrink: 0,
								}}
							>
								<PersonOutlineRoundedIcon fontSize="small" />
							</Avatar>

							<Typography variant="body2" fontWeight={700}>
								{job.client?.firstName} {job.client?.lastName}
							</Typography>
						</Stack>

						<PrimaryButton size="small" sx={detailsButtonSx} onClick={() => navigate(`/contractor/jobs/${job.id}`)}>
							View details
						</PrimaryButton>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
}
