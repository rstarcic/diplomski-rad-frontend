import { useNavigate } from "react-router-dom";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";

import StatusChip from "../../../../components/ui/StatusChip";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { findStatusKey } from "../../../../utils/jobs";
import { JOB_STATUSES } from "../../../../constants/statuses";
import { jobCardBaseSx } from "../../../../theme/layout";

const cardSx = {
	...jobCardBaseSx,
	borderRadius: 4,
	boxShadow: "0 14px 35px rgba(15, 23, 42, 0.07)",
	overflow: "hidden",
};

const actionRowSx = {
	p: 1.5,
	borderRadius: 2.5,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "rgba(99, 102, 241, 0.03)",
	alignItems: "center",
	justifyContent: "space-between",
};

const iconBoxBase = {
	width: 34,
	height: 34,
	borderRadius: 2,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const applicationsIconSx = (theme) => ({
	...iconBoxBase,
	bgcolor: theme.custom.iconPalette.applications.bg,
	color: theme.custom.iconPalette.applications.color,
});

const contractIconSx = (theme) => ({
	...iconBoxBase,
	bgcolor: theme.custom.iconPalette.contract.bg,
	color: theme.custom.iconPalette.contract.color,
});

const paymentIconSx = (theme) => ({
	...iconBoxBase,
	bgcolor: theme.custom.iconPalette.payment.bg,
	color: theme.custom.iconPalette.payment.color,
});

export default function MyJobCard({ job }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(job.status, JOB_STATUSES);

	const handleApplications = () => navigate(`/client/jobs/${job.id}/applications`);
	const handleEditJob = () => navigate(`/client/jobs/${job.id}/edit`);

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
						<Chip label={job.workMode} size="small" variant="outlined" />
						{job.workMode !== "Remote" && <Chip label={job.location} size="small" variant="outlined" />}
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

				<Box sx={{ pt: 2.2 }}>
					<Divider sx={{ mb: 2 }} />
					<Stack direction="row" spacing={1}>
						<PrimaryButton fullWidth size="small" onClick={handleApplications}>
							Applications
						</PrimaryButton>
						<Button
							fullWidth
							size="small"
							variant="outlined"
							startIcon={<EditOutlinedIcon />}
							onClick={handleEditJob}
							sx={{ borderRadius: 2, textTransform: "none", fontWeight: 800 }}
						>
							Edit
						</Button>
					</Stack>
				</Box>
			</CardContent>
		</Card>
	);
}
