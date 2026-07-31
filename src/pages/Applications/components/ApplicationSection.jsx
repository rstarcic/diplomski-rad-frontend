import { Card, Divider, Stack, Typography } from "@mui/material";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

import PrimaryButton from "../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import ApplicationStatusChip from "../../../components/ui/ApplicationStatusChip";
import AppAlert from "../../../components/ui/AppAlert";
import { sectionTitleSx, surfaceSectionSx } from "../../../theme/layout";
import { formatDate } from "../../../utils/formatters";
import { findStatusKey } from "../../../utils/jobs";
import { APPLICATION_STATUSES, CONTRACT_STATUSES, JOB_STATUSES } from "../../../constants/statuses";

const labelSx = {
	fontWeight: 700,
	textTransform: "uppercase",
	letterSpacing: 0.6,
};

const headerSx = {
	justifyContent: "space-between",
	alignItems: "center",
};

const actionsSx = {
	justifyContent: "flex-end",
};

const reviewOfferBtnSx = {
	minHeight: 36,
	px: 1.75,
	py: 0.75,
	borderRadius: 1.5,
	fontSize: "0.8125rem",
	fontWeight: 650,
	boxShadow: "0 4px 12px rgba(91, 63, 214, 0.16)",
	"& .MuiButton-startIcon": { mr: 0.75 },
	"& .MuiSvgIcon-root": { fontSize: 18 },
};
export default function ApplicationSection({
	application,
	contract,
	job,
	role,
	onAccept,
	onReject,
	onReviewOffer,
	onApplicationWithdraw,
	onJobDone,
	onJobCompleted,
	onJobIncomplete,
	decisionLoading = false,
	applicationWithdrawLoading = false,
	jobDoneLoading = false,
	jobCompletedLoading = false,
	jobIncompleteLoading = false,
}) {
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);
	const contractStatusKey = contract ? findStatusKey(contract.status, CONTRACT_STATUSES) : null;
	const jobStatusKey = job ? findStatusKey(job.status, JOB_STATUSES) : null;
	const clientCanMakeDecision = role === "client" && statusKey === "pending";
	const contractorCanMakeDecision = role === "contractor" && statusKey === "selected";
	const contractorCanWithdraw =
		role === "contractor" &&
		["pending", "selected"].includes(statusKey) &&
		["open", "awaitingContract"].includes(jobStatusKey);
	const canMarkJobDone =
		role === "contractor" &&
		statusKey === "accepted" &&
		contractStatusKey === "active" &&
		jobStatusKey === "inProgress";
	const canMarkJobCompleted =
		role === "client" &&
		statusKey === "accepted" &&
		contractStatusKey === "active" &&
		jobStatusKey === "doneByContractor";
	const hasCompletionDispute = contractStatusKey === "cancelled" && jobStatusKey === "incomplete";
	return (
		<>
			{hasCompletionDispute && (
				<AppAlert severity="warning" title="Work completion dispute" sx={{ mb: 2 }}>
					The client and contractor did not reach an agreement about the completed work. The job and contract have
					therefore been closed as disputed. Any further resolution, including payment-related claims, must take place
					outside the application through the appropriate legal process or competent court.
				</AppAlert>
			)}

			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={2}>
					<Stack direction="row" sx={headerSx}>
						<Typography variant="h6" sx={sectionTitleSx}>
							Application
						</Typography>

						<ApplicationStatusChip status={application.status} />
					</Stack>

					<Divider />

					<Stack spacing={0.5}>
						<Typography variant="caption" color="text.secondary" sx={labelSx}>
							Cover letter
						</Typography>

						<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
							{application.coverLetter}
						</Typography>
					</Stack>

					<Divider />

					<Stack direction="row" spacing={3}>
						<Stack spacing={0.25}>
							<Typography variant="caption" color="text.secondary" sx={labelSx}>
								Applied
							</Typography>

							<Typography variant="body2" fontWeight={700}>
								{formatDate(application.appliedAt)}
							</Typography>
						</Stack>
					</Stack>

					{clientCanMakeDecision && (
						<>
							<Divider />

							<Stack
								direction={{
									xs: "column-reverse",
									sm: "row",
								}}
								spacing={1.5}
								sx={actionsSx}
							>
								<SecondaryButton disabled={decisionLoading} onClick={onReject}>
									Reject
								</SecondaryButton>

								<PrimaryButton disabled={decisionLoading} onClick={onAccept}>
									{decisionLoading ? "Updating..." : "Accept application"}
								</PrimaryButton>
							</Stack>
						</>
					)}

					{contractorCanMakeDecision && (
						<>
							<Divider />

							<Typography variant="body2" color="text.secondary">
								The client selected your application and wants to proceed with you. Review the original job terms before
								responding.
							</Typography>

							<Stack direction="row" sx={actionsSx}>
								<PrimaryButton
									startIcon={<SwapHorizRoundedIcon />}
									disabled={decisionLoading}
									onClick={onReviewOffer}
									sx={reviewOfferBtnSx}
								>
									Review job terms
								</PrimaryButton>
							</Stack>
						</>
					)}

					{contractorCanWithdraw && (
						<>
							<Divider />

							<Stack direction="row" sx={actionsSx}>
								<SecondaryButton disabled={applicationWithdrawLoading} onClick={onApplicationWithdraw}>
									{applicationWithdrawLoading ? "Withdrawing..." : "Withdraw application"}
								</SecondaryButton>
							</Stack>
						</>
					)}

					{canMarkJobDone && (
						<>
							<Divider />

							<Stack direction="row" sx={actionsSx}>
								<PrimaryButton
									startIcon={<TaskAltRoundedIcon />}
									disabled={jobDoneLoading}
									onClick={onJobDone}
									sx={reviewOfferBtnSx}
								>
									{jobDoneLoading ? "Updating..." : "Job done"}
								</PrimaryButton>
							</Stack>
						</>
					)}

					{canMarkJobCompleted && (
						<>
							<Divider />

							<Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={1.5} sx={actionsSx}>
								<SecondaryButton disabled={jobCompletedLoading || jobIncompleteLoading} onClick={onJobIncomplete}>
									{jobIncompleteLoading ? "Updating..." : "Job not done properly"}
								</SecondaryButton>

								<PrimaryButton
									startIcon={<TaskAltRoundedIcon />}
									disabled={jobCompletedLoading || jobIncompleteLoading}
									onClick={onJobCompleted}
									sx={reviewOfferBtnSx}
								>
									{jobCompletedLoading ? "Updating..." : "Confirm completion"}
								</PrimaryButton>
							</Stack>
						</>
					)}
				</Stack>
			</Card>
		</>
	);
}
