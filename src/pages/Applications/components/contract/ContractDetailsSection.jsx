import { useMemo, useState } from "react";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Button, Card, Stack, Typography } from "@mui/material";

import SignContractDialog from "./SignContractDialog";

import StatusChip from "../../../../components/ui/StatusChip";
import { CONTRACT_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";

const actionBtnSx = {
	textTransform: "none",
	fontWeight: 700,
	borderRadius: 2,
};

const signBtnSx = {
	...actionBtnSx,
	fontWeight: 800,
};

export default function ContractDetailsSection({ contract, role = "client" }) {
	const [signDialogOpen, setSignDialogOpen] = useState(false);

	const statusKey = contract ? findStatusKey(contract.status, CONTRACT_STATUSES) : null;

	const needsSignature =
		(statusKey === "pendingClient" && role === "client") ||
		(statusKey === "pendingContractor" && role === "contractor");

	const handleSignConfirm = (signatureDataUrl) => {
		// TODO: API call with signatureDataUrl
		console.log("Signature submitted:", signatureDataUrl);
		setSignDialogOpen(false);
	};

	const handlePreview = () => {
		// TODO: preview contract
	};

	const handleDownload = () => {
		// TODO: download PDF
	};

	const handleSendEmail = () => {
		// TODO: send contract to email
	};

	const contractActions = useMemo(
		() => [
			{
				label: "Preview contract",
				icon: <VisibilityRoundedIcon />,
				onClick: handlePreview,
			},
			{
				label: "Download PDF",
				icon: <FileDownloadRoundedIcon />,
				onClick: handleDownload,
			},
			{
				label: "Send to my email",
				icon: <MarkEmailReadRoundedIcon />,
				onClick: handleSendEmail,
			},
		],
		[],
	);

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
			/>
		</Card>
	);
}
