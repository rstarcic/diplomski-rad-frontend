import { useNavigate } from "react-router-dom";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { Avatar, Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../components/ui/StatusChip";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { findStatusKey, formatBudget, formatDeadline } from "../../../../utils/jobs";
import { JOB_STATUSES } from "../../../../constants/statuses";
import { jobCardBaseSx } from "../../../../theme/layout";

const cardSx = {
	...jobCardBaseSx,
	borderRadius: 3,
	boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
};

const detailsButtonSx = {
	borderRadius: 2,
	px: 2.5,
	whiteSpace: "nowrap",
	flexShrink: 0,
};

const cardContentSx = {
	p: 3,
	height: "100%",
	display: "flex",
	flexDirection: "column",
};

const avatarSx = {
	width: 36,
	height: 36,
	bgcolor: "primary.light",
	flexShrink: 0,
};

export default function JobCard({ job }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(job.status, JOB_STATUSES);

	const handleViewDetails = () => navigate(`/contractor/jobs/${job.id}`);

	return (
		<Card sx={cardSx}>
			<CardContent sx={cardContentSx}>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
						<Box sx={{ minWidth: 0 }}>
							<Typography variant="h6">{job.title}</Typography>
							<Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.75 }}>
								<WorkOutlineRoundedIcon fontSize="small" color="primary" />
								<Typography variant="body2" color="text.secondary" noWrap>
									{job.category}
								</Typography>
							</Stack>
						</Box>
						{statusKey && <StatusChip status={statusKey} config={JOB_STATUSES} />}
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
					<Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
						<Stack direction="row" spacing={1.25} sx={{ minWidth: 0, alignItems: "center" }}>
							<Avatar
								src={job.client?.profileImageUrl}
								alt={`${job.client?.firstName} ${job.client?.lastName}`}
								sx={avatarSx}
							>
								<PersonOutlineRoundedIcon fontSize="small" />
							</Avatar>
							<Typography variant="body2" fontWeight={700}>
								{job.client?.firstName} {job.client?.lastName}
							</Typography>
						</Stack>
						<PrimaryButton size="small" sx={detailsButtonSx} onClick={handleViewDetails}>
							View details
						</PrimaryButton>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
}
