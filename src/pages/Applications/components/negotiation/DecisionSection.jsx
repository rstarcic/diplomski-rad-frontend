import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { actionCardSx, waitingCardSx, acceptBtnSx, rejectBtnSx, counterBtnSx, cancelBtnSx } from "./DecisionSection.styles";

function EditingCard({ onSubmit, onCancel }) {
	return (
		<Box sx={actionCardSx}>
			<Stack spacing={1.5}>
				<Typography variant="subtitle2" fontWeight={800}>
					Submit your counter-offer
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Review the updated terms above and submit when ready.
				</Typography>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
					<PrimaryButton
						fullWidth
						variant="contained"
						startIcon={<SwapHorizRoundedIcon />}
						onClick={onSubmit}
						sx={counterBtnSx}
					>
						Submit Counter-Offer
					</PrimaryButton>
					<PrimaryButton
						fullWidth
						variant="outlined"
						startIcon={<CloseRoundedIcon />}
						onClick={onCancel}
						sx={cancelBtnSx}
					>
						Cancel
					</PrimaryButton>
				</Stack>
			</Stack>
		</Box>
	);
}

function ActionCard({ role, onAccept, onReject, onCounterOffer }) {
	const title = role === "client" ? "Your Decision" : "Contractor Decision";
	const question = role === "client" ? "Do you accept the contractor's terms?" : "Do you accept the client's terms?";

	return (
		<Box sx={actionCardSx}>
			<Stack spacing={1.5}>
				<Typography variant="subtitle2" fontWeight={800}>
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{question}
				</Typography>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
					<PrimaryButton variant="contained" startIcon={<CheckRoundedIcon />} onClick={onAccept} sx={acceptBtnSx}>
						Accept
					</PrimaryButton>
					<PrimaryButton
						variant="outlined"
						startIcon={<SwapHorizRoundedIcon />}
						onClick={onCounterOffer}
						sx={counterBtnSx}
					>
						Counter-Offer
					</PrimaryButton>
					<PrimaryButton variant="contained" startIcon={<CloseRoundedIcon />} onClick={onReject} sx={rejectBtnSx}>
						Reject
					</PrimaryButton>
				</Stack>
			</Stack>
		</Box>
	);
}

function WaitingCard({ waitingFor }) {
	const label = waitingFor === "client" ? "client" : "contractor";
	return (
		<Box sx={waitingCardSx}>
			<Stack spacing={0.5} sx={{ alignItems: "center" }}>
				<HourglassEmptyRoundedIcon fontSize="small" color="disabled" />
				<Typography variant="body2" color="text.secondary" fontWeight={700}>
					Awaiting {label}'s response
				</Typography>
				<Typography variant="caption" color="text.secondary">
					You'll be notified once they respond.
				</Typography>
			</Stack>
		</Box>
	);
}

export default function DecisionSection({
	status,
	role,
	isEditing,
	onAccept,
	onReject,
	onCounterOffer,
	onSubmitCounter,
	onCancelEdit,
}) {
	if (isEditing) {
		return <EditingCard onSubmit={onSubmitCounter} onCancel={onCancelEdit} />;
	}

	const isActiveParty =
		(status === "pendingClient" && role === "client") || (status === "pendingContractor" && role === "contractor");

	if (isActiveParty) {
		return <ActionCard role={role} onAccept={onAccept} onReject={onReject} onCounterOffer={onCounterOffer} />;
	}

	const waitingFor = status === "pendingClient" ? "client" : "contractor";
	return <WaitingCard waitingFor={waitingFor} />;
}
