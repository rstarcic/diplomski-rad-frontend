import { useNavigate, Link as RouterLink } from "react-router-dom";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import { Avatar, Box, ButtonBase, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../components/ui/StatusChip";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { findStatusKey, formatBudget, formatDeadline } from "../../../../utils/jobs";
import { JOB_STATUSES } from "../../../../constants/statuses";
import {
	cardSx,
	detailsButtonSx,
	cardContentSx,
	headerRowSx,
	titleWrapSx,
	categoryRowSx,
	chipRowSx,
	metaRowSx,
	footerSx,
	footerDividerSx,
	footerRowSx,
	avatarSx,
	clientLinkSx,
} from "./JobCard.styles";

export default function JobCard({ job }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(job.status, JOB_STATUSES);
	const clientName = job.client?.fullName || "Client";
	const showLocation = job.location && job.locationType !== "Remote";

	const handleViewDetails = () => navigate(`/contractor/jobs/${job.id}`);

	return (
		<Card sx={cardSx}>
			<CardContent sx={cardContentSx}>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2} sx={headerRowSx}>
						<Box sx={titleWrapSx}>
							<Typography variant="h6">{job.title}</Typography>
							<Stack direction="row" spacing={1} sx={categoryRowSx}>
								<WorkOutlineRoundedIcon fontSize="small" color="primary" />
								<Typography variant="body2" color="text.secondary" noWrap>
									{job.category}
								</Typography>
							</Stack>
						</Box>
						{statusKey && <StatusChip status={statusKey} config={JOB_STATUSES} />}
					</Stack>

					<Stack direction="row" spacing={1} useFlexGap sx={chipRowSx}>
						<Chip label={job.locationType} size="small" variant="outlined" />
						{showLocation && <Chip label={job.location} size="small" variant="outlined" />}
						<Chip label={job.budgetType} size="small" color="primary" variant="outlined" />
					</Stack>

					<Stack direction="row" spacing={3} useFlexGap sx={metaRowSx}>
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

				<Box sx={footerSx}>
					<Divider sx={footerDividerSx} />
					<Stack direction="row" spacing={2} sx={footerRowSx}>
						<ButtonBase component={RouterLink} to={`/contractor/clients/${job.client?.id}`} sx={clientLinkSx}>
							<Avatar src={job.client?.profilePicture} alt={clientName} sx={avatarSx}>
								<PersonOutlineRoundedIcon fontSize="small" />
							</Avatar>
							<Typography variant="body2" fontWeight={700}>
								{clientName}
							</Typography>
						</ButtonBase>
						<PrimaryButton size="small" sx={detailsButtonSx} onClick={handleViewDetails}>
							View details
						</PrimaryButton>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
}
