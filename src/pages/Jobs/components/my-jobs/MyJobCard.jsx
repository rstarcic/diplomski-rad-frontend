import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../../components/ui/SecondaryButton";
import StatusChip from "../../../../components/ui/StatusChip";
import { CONTRACT_STATUSES, JOB_STATUSES, PAYMENT_STATUSES } from "../../../../constants/statuses";
import { formatDate } from "../../../../utils/formatters";
import { findStatusKey, formatDeadline } from "../../../../utils/jobs";
import {
	actionButtonSx,
	actionButtonsSx,
	actionRowSx,
	applicationsIconSx,
	cardContentSx,
	cardSx,
	contractIconSx,
	footerDividerSx,
	footerSx,
	metaIconSx,
	metaItemSx,
	metaRowSx,
	overviewLabelSx,
	paymentIconSx,
	rowValueSx,
	summaryStatusChipSx,
} from "./MyJobCard.styles";

export default function MyJobCard({ job }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(job.status, JOB_STATUSES);
	const contractStatusKey = findStatusKey(job.contracts?.status, CONTRACT_STATUSES);
	const paymentStatusKey = findStatusKey(job.payments?.status, PAYMENT_STATUSES);
	const contractStatusLabel = contractStatusKey ? CONTRACT_STATUSES[contractStatusKey].label : "Not started";
	const paymentStatusLabel = paymentStatusKey ? PAYMENT_STATUSES[paymentStatusKey].label : "No payments yet";

	const handleApplications = () => navigate(`/client/jobs/${job.id}/applications`);
	const handleEditJob = () => navigate(`/client/jobs/${job.id}/edit`);
	const handleCreateSimilarJob = () => navigate(`/client/jobs/create?duplicateFrom=${job.id}`);

	const canCreateSimilarJob = statusKey === "cancelled" && !job.replacementJobId;
	return (
		<Card sx={cardSx}>
			<CardContent sx={cardContentSx}>
				<Stack spacing={2.2} sx={{ flex: 1 }}>
					<Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
						<Box sx={{ minWidth: 0 }}>
							<Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
								{job.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{job.category}
							</Typography>
						</Box>
						{statusKey && <StatusChip status={statusKey} config={JOB_STATUSES} />}
					</Stack>

					<Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
						<Chip label={job.locationType} size="small" variant="outlined" />
						{job.locationType !== "Remote" && <Chip label={job.location} size="small" variant="outlined" />}
						<Chip label={job.budgetType} size="small" color="primary" variant="outlined" />
					</Stack>

					<Stack spacing={1.2}>
						<Typography sx={overviewLabelSx}>Overview</Typography>

						<Stack direction="row" sx={actionRowSx}>
							<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
								<Box sx={applicationsIconSx}>
									<PeopleAltOutlinedIcon fontSize="small" />
								</Box>

								<Typography variant="body2" fontWeight={800}>
									Applications
								</Typography>
							</Stack>
							<Stack direction="row" spacing={1.75} sx={{ alignItems: "center" }}>
								{job.applications?.new > 0 && (
									<Chip label={`${job.applications.new} new`} size="small" color="primary" />
								)}
								<Typography variant="body2" sx={rowValueSx}>
									{job.applications?.total ?? 0}
								</Typography>
							</Stack>
						</Stack>

						<Stack direction="row" sx={actionRowSx}>
							<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
								<Box sx={contractIconSx}>
									<DescriptionOutlinedIcon fontSize="small" />
								</Box>

								<Typography variant="body2" fontWeight={800}>
									Contract
								</Typography>
							</Stack>
							<Chip label={contractStatusLabel} size="small" sx={summaryStatusChipSx} />
						</Stack>

						<Stack direction="row" sx={actionRowSx}>
							<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
								<Box sx={paymentIconSx}>
									<PaymentsOutlinedIcon fontSize="small" />
								</Box>
								<Typography variant="body2" fontWeight={800}>
									Payment
								</Typography>
							</Stack>
							<Chip label={paymentStatusLabel} size="small" sx={summaryStatusChipSx} />
						</Stack>
					</Stack>
				</Stack>

				<Box sx={footerSx}>
					<Divider sx={footerDividerSx} />
					<Stack sx={metaRowSx}>
						<Box sx={metaItemSx}>
							<CalendarMonthOutlinedIcon sx={metaIconSx} />
							<Box sx={{ minWidth: 0 }}>
								<Typography variant="caption" color="text.secondary">
									Deadline
								</Typography>
								<Typography variant="body2" fontWeight={800}>
									{formatDeadline(job.deadline)}
								</Typography>
							</Box>
						</Box>
						<Box sx={metaItemSx}>
							<UpdateOutlinedIcon sx={metaIconSx} />
							<Box sx={{ minWidth: 0 }}>
								<Typography variant="caption" color="text.secondary">
									Last updated
								</Typography>
								<Typography variant="body2" fontWeight={800}>
									{formatDate(job.updatedAt)}
								</Typography>
							</Box>
						</Box>
					</Stack>
					{statusKey === "cancelled" ? (
						<Stack sx={actionButtonsSx}>
							{canCreateSimilarJob && (
								<PrimaryButton
									size="large"
									startIcon={<ContentCopyOutlinedIcon />}
									onClick={handleCreateSimilarJob}
									sx={actionButtonSx}
								>
									Create similar job
								</PrimaryButton>
							)}

							<SecondaryButton
								size="large"
								startIcon={<PeopleAltOutlinedIcon />}
								onClick={handleApplications}
								sx={actionButtonSx}
							>
								Applications
							</SecondaryButton>
						</Stack>
					) : (
						<Stack sx={actionButtonsSx}>
							<PrimaryButton
								size="large"
								startIcon={<PeopleAltOutlinedIcon />}
								onClick={handleApplications}
								sx={actionButtonSx}
							>
								Applications
							</PrimaryButton>

							{statusKey === "open" && (
								<SecondaryButton
									size="large"
									startIcon={<EditOutlinedIcon />}
									onClick={handleEditJob}
									sx={actionButtonSx}
								>
									Edit
								</SecondaryButton>
							)}
						</Stack>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
