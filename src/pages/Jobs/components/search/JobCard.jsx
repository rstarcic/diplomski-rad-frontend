import { useNavigate, Link as RouterLink } from "react-router-dom";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Avatar, Box, ButtonBase, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import StatusChip from "../../../../components/ui/StatusChip";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { findStatusKey, formatBudget, formatDeadline } from "../../../../utils/jobs";
import { JOB_STATUSES } from "../../../../constants/statuses";
import {
	cardSx,
	cardContentSx,
	headerSx,
	titleWrapSx,
	categorySx,
	titleSx,
	statusSx,
	chipRowSx,
	metaRowSx,
	metaItemSx,
	deadlineMetaSx,
	metaLabelSx,
	budgetSx,
	deadlineValueSx,
	deadlineIconSx,
	footerSx,
	footerDividerSx,
	footerRowSx,
	avatarSx,
	clientLinkSx,
	clientNameSx,
	detailsButtonSx,
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
				<Box sx={headerSx}>
					<Box sx={titleWrapSx}>
						<Typography variant="overline" sx={categorySx}>
							{job.category}
						</Typography>
						<Typography variant="subtitle1" sx={titleSx}>
							{job.title}
						</Typography>
					</Box>

					{statusKey && (
						<Box sx={statusSx}>
							<StatusChip status={statusKey} config={JOB_STATUSES} />
						</Box>
					)}
				</Box>

				<Stack direction="row" spacing={1} useFlexGap sx={chipRowSx}>
					<Chip label={job.locationType} size="small" variant="outlined" />
					{showLocation && <Chip label={job.location} size="small" variant="outlined" />}
					<Chip label={job.budgetType} size="small" color="primary" variant="outlined" />
				</Stack>

				<Box sx={metaRowSx}>
					<Box sx={metaItemSx}>
						<Typography variant="caption" sx={metaLabelSx}>
							Budget
						</Typography>
						<Typography variant="subtitle1" sx={budgetSx}>
							{formatBudget(job)}
						</Typography>
					</Box>
					<Box sx={deadlineMetaSx}>
						<Typography variant="caption" sx={metaLabelSx}>
							Deadline
						</Typography>
						<Typography variant="body1" sx={deadlineValueSx}>
							<CalendarMonthOutlinedIcon sx={deadlineIconSx} />
							{formatDeadline(job.deadline)}
						</Typography>
					</Box>
				</Box>

				<Box sx={footerSx}>
					<Divider sx={footerDividerSx} />
					<Stack sx={footerRowSx}>
						<ButtonBase component={RouterLink} to={`/contractor/clients/${job.client?.id}`} sx={clientLinkSx}>
							<Avatar src={job.client?.profilePicture} alt={clientName} sx={avatarSx}>
								<PersonOutlineRoundedIcon fontSize="small" />
							</Avatar>
							<Typography variant="body2" fontWeight={700} sx={clientNameSx}>
								{clientName}
							</Typography>
						</ButtonBase>
						<PrimaryButton
							endIcon={<ArrowForwardRoundedIcon />}
							sx={detailsButtonSx}
							onClick={handleViewDetails}
						>
							View details
						</PrimaryButton>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
}
