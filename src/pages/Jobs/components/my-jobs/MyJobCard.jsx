import { useNavigate } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";

import StatusChip from "../../../../components/ui/StatusChip";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { findStatusKey, formatDeadline } from "../../../../utils/jobs";
import { formatDate } from "../../../../utils/formatters";
import { JOB_STATUSES } from "../../../../constants/statuses";
import {
	cardSx,
	actionRowSx,
	applicationsIconSx,
	contractIconSx,
	paymentIconSx,
	footerSx,
	footerDividerSx,
	metaRowSx,
	metaItemSx,
	actionButtonsSx,
	actionButtonSx,
} from "./MyJobCard.styles";

export default function MyJobCard({ job }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(job.status, JOB_STATUSES);

	const handleApplications = () => navigate(`/client/jobs/${job.id}/applications`);
	const handleEditJob = () => navigate(`/client/jobs/${job.id}/edit`);
	const handleCreateSimilarJob = () => navigate(`/client/jobs/create?duplicateFrom=${job.id}`);

	const canCreateSimilarJob = statusKey === "cancelled" && !job.replacementJobId;
	return (
		<Card sx={cardSx}>
			<CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
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

					<Divider />

					<Stack spacing={1.2}>
						<Stack direction="row" sx={actionRowSx}>
							<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
								<Box sx={applicationsIconSx}>
									<PeopleAltOutlinedIcon fontSize="small" />
								</Box>
								<Box>
									<Typography variant="body2" fontWeight={800}>
										Applications
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{job.applications?.total ?? 0} applicants
									</Typography>
								</Box>
							</Stack>
							{job.applications?.new > 0 && <Chip label={`${job.applications.new} new`} size="small" color="primary" />}
						</Stack>

						<Stack direction="row" sx={actionRowSx}>
							<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
								<Box sx={contractIconSx}>
									<DescriptionOutlinedIcon fontSize="small" />
								</Box>
								<Box>
									<Typography variant="body2" fontWeight={800}>
										Contract
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{job.contracts?.status ?? "Not started"}
									</Typography>
								</Box>
							</Stack>
						</Stack>

						<Stack direction="row" sx={actionRowSx}>
							<Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
								<Box sx={paymentIconSx}>
									<PaymentsOutlinedIcon fontSize="small" />
								</Box>
								<Box>
									<Typography variant="body2" fontWeight={800}>
										Payment
									</Typography>
									<Typography variant="caption" color="text.secondary">
										{job.payments?.status ?? "No payments yet"}
									</Typography>
								</Box>
							</Stack>
						</Stack>
					</Stack>
				</Stack>

				<Box sx={footerSx}>
					<Divider sx={footerDividerSx} />
					<Stack sx={metaRowSx}>
						<Box sx={metaItemSx}>
							<Typography variant="caption" color="text.secondary">
								Deadline
							</Typography>
							<Typography variant="body2" fontWeight={800}>
								{formatDeadline(job.deadline)}
							</Typography>
						</Box>
						<Box sx={metaItemSx}>
							<Typography variant="caption" color="text.secondary">
								Last updated
							</Typography>
							<Typography variant="body2" fontWeight={800}>
								{formatDate(job.updatedAt)}
							</Typography>
						</Box>
					</Stack>
					{statusKey === "cancelled" ? (
						<Stack sx={actionButtonsSx}>
							{canCreateSimilarJob && (
								<PrimaryButton
									size="small"
									startIcon={<ContentCopyOutlinedIcon />}
									onClick={handleCreateSimilarJob}
									sx={actionButtonSx}
								>
									Create similar job
								</PrimaryButton>
							)}

							<Button
								size="small"
								variant="outlined"
								startIcon={<PeopleAltOutlinedIcon />}
								onClick={handleApplications}
								sx={actionButtonSx}
							>
								Applications
							</Button>
						</Stack>
					) : (
						<Stack sx={actionButtonsSx}>
							<PrimaryButton
								size="small"
								startIcon={<PeopleAltOutlinedIcon />}
								onClick={handleApplications}
								sx={actionButtonSx}
							>
								Applications
							</PrimaryButton>

							{statusKey === "open" && (
								<Button
									size="small"
									variant="outlined"
									startIcon={<EditOutlinedIcon />}
									onClick={handleEditJob}
									sx={actionButtonSx}
								>
									Edit
								</Button>
							)}
						</Stack>
					)}
				</Box>
			</CardContent>
		</Card>
	);
}
