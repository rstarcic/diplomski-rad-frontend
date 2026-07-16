import { useState } from "react";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Button, Card, Stack, Typography } from "@mui/material";

import SignContractDialog from "./SignContractDialog";
import { isSignatureTooLarge } from "./signatureValidation";

import AppAlert from "../../../../components/ui/Alert";
import StatusChip from "../../../../components/ui/StatusChip";
import { CONTRACT_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";
import { parseApiError } from "../../../../utils/parseApiError";

const actionBtnSx = {
	textTransform: "none",
	fontWeight: 700,
	borderRadius: 2,
};

const signBtnSx = {
	...actionBtnSx,
	fontWeight: 800,
};

export default function ContractDetailsSection({ contract, role = "client", onSignContract }) {
	const [signDialogOpen, setSignDialogOpen] = useState(false);
	const [signing, setSigning] = useState(false);
	const [signFeedback, setSignFeedback] = useState(null);

	const statusKey = contract ? findStatusKey(contract.status, CONTRACT_STATUSES) : null;
	const contractIsActive = statusKey === "active";
	const currentPartySignedAt = role === "client" ? contract?.clientSignedAt : contract?.contractorSignedAt;
	const signingClosed = ["active", "signedByBoth", "completed", "cancelled"].includes(statusKey);
	const needsSignature = Boolean(contract) && !currentPartySignedAt && !signingClosed;

	const handleSignConfirm = async (signatureDataUrl) => {
		if (isSignatureTooLarge(signatureDataUrl)) {
			setSignFeedback({
				severity: "error",
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
				message: "Contract signed successfully.",
			});
			setSignDialogOpen(false);
		} catch (error) {
			const apiError = parseApiError(error, {}, "The contract could not be signed. Please try again.");
			setSignFeedback({ severity: "error", message: apiError.message });
			setSignDialogOpen(false);
		} finally {
			setSigning(false);
		}
	};

	const handlePreview = () => {
		window.open(`/contracts/${contract.id}/preview`, "_blank", "noopener,noreferrer");
	};

	const handleDownload = () => {
		// TODO: download PDF
	};

	const handleSendEmail = () => {
		// TODO: send contract to email
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
				disabled: !contractIsActive,
			},
			{
				label: "Send to my email",
				icon: <MarkEmailReadRoundedIcon />,
				onClick: handleSendEmail,
				disabled: !contractIsActive,
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
					<AppAlert
						severity={signFeedback.severity}
						title={signFeedback.severity === "success" ? "Contract signed" : "Contract could not be signed"}
						onClose={() => setSignFeedback(null)}
					>
						{signFeedback.message}
					</AppAlert>
				)}
				<Stack
					direction="row"
					spacing={2}
					sx={{
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h6" sx={sectionTitleSx}>
						Contract
					</Typography>

					{statusKey && <StatusChip status={statusKey} config={CONTRACT_STATUSES} />}
				</Stack>

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
							{action.label}
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
