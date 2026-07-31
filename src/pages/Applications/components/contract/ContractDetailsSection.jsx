import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";

import ContractDetail from "./ContractDetail";
import SignContractDialog from "./SignContractDialog";
import AppAlert from "../../../../components/ui/AppAlert";
import StatusChip from "../../../../components/ui/StatusChip";
import { CONTRACT_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { formatDate } from "../../../../utils/formatters";
import { getContractViewState } from "./contractDetails.utils";
import { useContractActions } from "./useContractActions";
import { actionBtnSx, descriptionSx, headerSx, signBtnSx, summaryGridSx } from "./ContractDetailsSection.styles";

export default function ContractDetailsSection({ contract, job, role = "client", onSignContract }) {
	const { statusKey, needsSignature, canShare, description } = getContractViewState(contract, job, role);
	const {
		signDialogOpen,
		signing,
		signFeedback,
		downloading,
		sendingEmail,
		openSignDialog,
		closeSignDialog,
		clearSignFeedback,
		handleSignConfirm,
		handlePreview,
		handleDownload,
		handleSendEmail,
	} = useContractActions({ contract, onSignContract });

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
					<AppAlert severity={signFeedback.severity} title={signFeedback.title} onClose={clearSignFeedback}>
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
					{description}
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
					<ContractDetail label="Duration">{contract.duration ? `${contract.duration} days` : ""}</ContractDetail>
					<ContractDetail label="Workload">
						{contract.hoursPerWeek ? `${contract.hoursPerWeek} hours per week` : ""}
					</ContractDetail>
					<ContractDetail label="Starts">{contract.startsAt ? formatDate(contract.startsAt) : ""}</ContractDetail>
					<ContractDetail label="Ends">{contract.endsAt ? formatDate(contract.endsAt) : ""}</ContractDetail>
					<ContractDetail label="Deliverables" fullWidth>
						{contract.deliverables}
					</ContractDetail>
				</Box>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
					{needsSignature && (
						<Button variant="contained" startIcon={<DrawRoundedIcon />} onClick={openSignDialog} sx={signBtnSx}>
							Sign contract
						</Button>
					)}

					<Button variant="outlined" startIcon={<VisibilityRoundedIcon />} onClick={handlePreview} sx={actionBtnSx}>
						Preview contract
					</Button>

					<Button
						variant="outlined"
						startIcon={<FileDownloadRoundedIcon />}
						onClick={handleDownload}
						disabled={!canShare || downloading}
						sx={actionBtnSx}
					>
						{downloading ? "Downloading..." : "Download PDF"}
					</Button>

					<Button
						variant="outlined"
						startIcon={<MarkEmailReadRoundedIcon />}
						onClick={handleSendEmail}
						disabled={!canShare || sendingEmail}
						sx={actionBtnSx}
					>
						{sendingEmail ? "Sending..." : "Send to my email"}
					</Button>
				</Stack>
			</Stack>

			<SignContractDialog
				open={signDialogOpen}
				onClose={closeSignDialog}
				onConfirm={handleSignConfirm}
				loading={signing}
			/>
		</Card>
	);
}
