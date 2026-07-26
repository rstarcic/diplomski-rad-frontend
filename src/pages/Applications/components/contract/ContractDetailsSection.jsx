import { useRef, useState } from "react";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";

import SignContractDialog from "./SignContractDialog";
import { isSignatureTooLarge } from "./signatureValidation";

import AppAlert from "../../../../components/ui/Alert";
import StatusChip from "../../../../components/ui/StatusChip";
import { CONTRACT_STATUSES, JOB_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";
import { parseApiError, parseBlobApiError } from "../../../../utils/parseApiError";
import { downloadContractPdf, emailContractPdf } from "../../../../api/coreAPI";
import { useTimedAlert } from "../../../../hooks/useTimedAlert";
import { formatDate } from "../../../../utils/formatters";
import {
	actionBtnSx,
	descriptionSx,
	detailItemSx,
	detailLabelSx,
	fullWidthItemSx,
	headerSx,
	signatureGridSx,
	signatureItemSx,
	signBtnSx,
	summaryGridSx,
} from "./ContractDetailsSection.styles";

function ContractDetail({ label, children, fullWidth = false }) {
	return (
		<Box sx={[detailItemSx, fullWidth && fullWidthItemSx]}>
			<Typography variant="caption" color="text.secondary" sx={detailLabelSx}>
				{label}
			</Typography>
			<Typography variant="body2" fontWeight={700}>
				{children || "Not provided"}
			</Typography>
		</Box>
	);
}

export default function ContractDetailsSection({ contract, job, role = "client", onSignContract }) {
	const [signDialogOpen, setSignDialogOpen] = useState(false);
	const [signing, setSigning] = useState(false);
	const [signFeedback, setSignFeedback] = useTimedAlert();
	const [downloading, setDownloading] = useState(false);
	const [sendingEmail, setSendingEmail] = useState(false);
	const sendingEmailRef = useRef(false);

	const statusKey = contract ? findStatusKey(contract.status, CONTRACT_STATUSES) : null;
	const jobStatusKey = job ? findStatusKey(job.status, JOB_STATUSES) : null;
	const contractIsActive = statusKey === "active";
	const jobIsAwaitingReview = jobStatusKey === "doneByContractor";
	const jobIsCompleted = jobStatusKey === "completedByClient";
	const contractCanBeShared =
		statusKey !== "cancelled" && (contractIsActive || jobIsCompleted || statusKey === "completed");
	const currentPartySignedAt = role === "client" ? contract?.clientSignedAt : contract?.contractorSignedAt;
	const signingClosed = ["active", "signedByBoth", "completed", "cancelled"].includes(statusKey);
	const needsSignature = Boolean(contract) && !currentPartySignedAt && !signingClosed;
	const contractDescription = jobIsCompleted
		? "This job has been completed. You can still preview, download, or email a copy of the final contract."
		: jobIsAwaitingReview
			? "The contractor marked the job as done. The signed contract remains available while the client reviews the work."
			: contractIsActive
				? "This contract is active. You can preview it, download the PDF, or send a copy to your email."
				: "Review the contract details and complete any required signature before the work begins.";

	const handleSignConfirm = async (signatureDataUrl) => {
		if (isSignatureTooLarge(signatureDataUrl)) {
			setSignFeedback({
				severity: "error",
				title: "Contract could not be signed",
				message: "Signature image must not exceed 500 KB. Please clear it and draw a simpler signature.",
			});
			setSignDialogOpen(false);
			return;
		}

		try {
			setSigning(true);
			setSignFeedback(null);
			await onSignContract(signatureDataUrl);
			setSignFeedback({
				severity: "success",
				title: "Contract signed",
				message: "Contract signed successfully.",
			});
			setSignDialogOpen(false);
		} catch (error) {
			const apiError = parseApiError(error, {}, "The contract could not be signed. Please try again.");
			setSignFeedback({ severity: "error", title: "Contract could not be signed", message: apiError.message });
			setSignDialogOpen(false);
		} finally {
			setSigning(false);
		}
	};

	const handlePreview = () => {
		window.open(`/contracts/${contract.id}/preview`, "_blank", "noopener,noreferrer");
	};

	const handleDownload = async () => {
		try {
			setDownloading(true);
			setSignFeedback(null);
			await downloadContractPdf(contract.id, contract.contractNumber);
		} catch (error) {
			const apiError = await parseBlobApiError(
				error,
				{},
				"The contract PDF could not be downloaded. Please try again.",
			);
			setSignFeedback({ severity: "error", title: "Download failed", message: apiError.message });
		} finally {
			setDownloading(false);
		}
	};

	const handleSendEmail = async () => {
		if (!contract?.id || sendingEmailRef.current) {
			return;
		}

		try {
			sendingEmailRef.current = true;
			setSendingEmail(true);
			setSignFeedback(null);
			const result = await emailContractPdf(contract.id);
			setSignFeedback({
				severity: "success",
				title: "Email sent",
				message: result.message ?? "Contract sent to your email successfully.",
			});
		} catch (error) {
			const apiError = parseApiError(error, {}, "The contract could not be sent to your email. Please try again.");
			const isConflict = error?.response?.status === 409;
			setSignFeedback({
				severity: "error",
				title: isConflict ? "Email already sent" : "Email could not be sent",
				message: isConflict
					? "This contract was already sent to your email."
					: apiError.message,
			});
		} finally {
			sendingEmailRef.current = false;
			setSendingEmail(false);
		}
	};

	const contractActions = [
		{
			label: "Preview contract",
			icon: <VisibilityRoundedIcon />,
			onClick: handlePreview,
		},
		{
			label: "Download PDF",
			icon: <FileDownloadRoundedIcon />,
			onClick: handleDownload,
			disabled: !contractCanBeShared || downloading,
		},
		{
			label: "Send to my email",
			icon: <MarkEmailReadRoundedIcon />,
			onClick: handleSendEmail,
			disabled: !contractCanBeShared || sendingEmail,
		},
	];

	if (!contract) {
		return (
			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={1}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Contract
					</Typography>

					<Typography variant="body2" color="text.secondary">
						No contract has been created for this application yet.
					</Typography>
				</Stack>
			</Card>
		);
	}

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				{signFeedback && (
					<AppAlert severity={signFeedback.severity} title={signFeedback.title} onClose={() => setSignFeedback(null)}>
						{signFeedback.message}
					</AppAlert>
				)}
				<Stack direction="row" spacing={2} sx={headerSx}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Contract
					</Typography>

					{statusKey && <StatusChip status={statusKey} config={CONTRACT_STATUSES} />}
				</Stack>

				<Typography variant="body2" color="text.secondary" sx={descriptionSx}>
					{contractDescription}
				</Typography>

				<Divider />

				<Box sx={summaryGridSx}>
					<ContractDetail label="Contract number">{contract.contractNumber}</ContractDetail>
					<ContractDetail label="Job">{contract.jobTitle || job?.title}</ContractDetail>
					<ContractDetail label="Budget">
						{contract.budgetAmount !== "" && contract.budgetAmount != null
							? `${contract.budgetAmount} ${contract.currency || "EUR"} · ${contract.budgetType || "fixed"}`
							: ""}
					</ContractDetail>
					<ContractDetail label="Duration">
						{contract.duration ? `${contract.duration} days` : ""}
					</ContractDetail>
					<ContractDetail label="Workload">
						{contract.hoursPerWeek ? `${contract.hoursPerWeek} hours per week` : ""}
					</ContractDetail>
					<ContractDetail label="Starts">
						{contract.startsAt ? formatDate(contract.startsAt) : ""}
					</ContractDetail>
					<ContractDetail label="Ends">
						{contract.endsAt ? formatDate(contract.endsAt) : ""}
					</ContractDetail>
					<ContractDetail label="Deliverables" fullWidth>
						{contract.deliverables}
					</ContractDetail>
				</Box>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
					{needsSignature && (
						<Button
							variant="contained"
							startIcon={<DrawRoundedIcon />}
							onClick={() => setSignDialogOpen(true)}
							sx={signBtnSx}
						>
							Sign contract
						</Button>
					)}

					{contractActions.map((action) => (
						<Button
							key={action.label}
							variant="outlined"
							startIcon={action.icon}
							onClick={action.onClick}
							disabled={action.disabled}
							sx={actionBtnSx}
						>
							{action.label === "Download PDF" && downloading
								? "Downloading..."
								: action.label === "Send to my email" && sendingEmail
									? "Sending..."
									: action.label}
						</Button>
					))}
				</Stack>
			</Stack>

			<SignContractDialog
				open={signDialogOpen}
				onClose={() => setSignDialogOpen(false)}
				onConfirm={handleSignConfirm}
				loading={signing}
			/>
		</Card>
	);
}
