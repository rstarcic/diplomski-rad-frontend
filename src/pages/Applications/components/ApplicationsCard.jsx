import {
	Avatar,
	Box,
	ButtonBase,
	Card,
	CardActions,
	CardContent,
	Stack,
	Typography,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";

import ApplicationStatusChip from "../../../components/ui/ApplicationStatusChip";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { APPLICATION_STATUSES, JOB_STATUSES } from "../../../constants/statuses";
import { formatDate } from "../../../utils/formatters";
import { findStatusKey } from "../../../utils/jobs";
import {
	actionButtonSx,
	appliedRowSx,
	avatarSx,
	bodySx,
	cardSx,
	contentSx,
	contractorButtonSx,
	coverLetterSx,
	footerSx,
	metaRowSx,
	noticeSx,
	readMoreSx,
} from "./ApplicationsCard.styles";
import { applicationCardPresentation } from "./applicationCardPresentation";

export default function ApplicationsCard({ application, contractor, job, contract, payment }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);
	const jobStatusKey = findStatusKey(job?.status, JOB_STATUSES);
	const presentation = applicationCardPresentation[statusKey] ?? applicationCardPresentation.pending;
	const StatusNoticeIcon = presentation.Icon;
	const contractPhaseStarted =
		Boolean(contract?.id || contract?.status || payment) ||
		["inProgress", "doneByContractor", "completedByClient", "incomplete"].includes(jobStatusKey);
	const showLifecyclePrompt = statusKey !== "accepted" || !contractPhaseStarted;
	const compact = statusKey === "accepted" && contractPhaseStarted;
	const actionLabel = compact ? "View details" : presentation.action;

	const {
		id,
		firstName,
		lastName,
		fullName: contractorFullName,
		city,
		country,
		profileImageUrl,
	} = contractor ?? {};
	const fullName =
		contractorFullName ||
		(firstName && lastName ? `${firstName} ${lastName}` : "Unknown contractor");

	const openContractorProfile = () => {
		if (id) {
			navigate(`/client/contractors/${id}`, {
				state: { from: `/client/jobs/${application.jobId}/applications` },
			});
		}
	};

	const openApplicationDetails = () => {
		navigate(`/client/jobs/${application.jobId}/applications/${application.id}`);
	};

	const initials = fullName
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join("")
		.toUpperCase();

	return (
		<Card elevation={0} sx={cardSx(compact)}>
			<CardContent sx={contentSx(compact)}>
				<Stack spacing={2.25} sx={bodySx(compact)}>
					<Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
						<ButtonBase onClick={openContractorProfile} sx={contractorButtonSx}>
							<Avatar alt={fullName} src={profileImageUrl} sx={avatarSx(presentation)}>
								{initials}
							</Avatar>

							<Box sx={{ minWidth: 0 }}>
								<Typography
									variant="subtitle1"
									sx={{ fontWeight: 850, lineHeight: 1.2 }}
									noWrap
								>
									{fullName}
								</Typography>

								<Stack direction="row" spacing={0.5} sx={metaRowSx}>
									<LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
									<Typography variant="caption" color="text.secondary" noWrap>
										{city}, {country}
									</Typography>
								</Stack>
							</Box>
						</ButtonBase>

						<ApplicationStatusChip
							status={application.status}
							label={statusKey === "selected" ? "Selected by you" : undefined}
						/>
					</Stack>

					{showLifecyclePrompt && (
						<Box sx={noticeSx(presentation)}>
							<StatusNoticeIcon />
							<Box>
								<Typography
									variant="body2"
									sx={{ fontWeight: 700, color: "inherit", lineHeight: 1.45 }}
								>
									{presentation.message}
								</Typography>
								{presentation.detail && (
									<Typography
										variant="body2"
										sx={{ mt: 0.25, color: "text.primary", lineHeight: 1.45 }}
									>
										{presentation.detail}
									</Typography>
								)}
							</Box>
						</Box>
					)}

					<Box>
						<Typography variant="overline" color="text.primary" sx={{ fontWeight: 800 }}>
							Cover letter
						</Typography>

						<Typography variant="body2" sx={coverLetterSx}>
							{application.coverLetter}
						</Typography>
						<ButtonBase onClick={openApplicationDetails} sx={readMoreSx}>
							Read more
						</ButtonBase>
					</Box>

					<Stack direction="row" sx={appliedRowSx(compact)}>
						<CalendarMonthOutlinedIcon />
						<Typography variant="body2">Applied on {formatDate(application.appliedAt)}</Typography>
					</Stack>
				</Stack>
			</CardContent>

			<CardActions sx={footerSx}>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
					<PrimaryButton variant="outlined" onClick={openContractorProfile}>
						View profile
					</PrimaryButton>

					{actionLabel && (
						<PrimaryButton
							variant={statusKey === "rejected" ? "outlined" : "contained"}
							onClick={openApplicationDetails}
							sx={actionButtonSx(compact ? undefined : statusKey)}
						>
							{actionLabel}
						</PrimaryButton>
					)}
				</Stack>
			</CardActions>
		</Card>
	);
}
