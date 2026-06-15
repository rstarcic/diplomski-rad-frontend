import { Box, Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

const actionCardSx = (theme) => ({
	p: 2,
	borderRadius: 2,
	border: "1px solid",
	borderColor: theme.custom.tint.primaryBorder,
	bgcolor: theme.custom.tint.primarySubtle,
});

const waitingCardSx = (theme) => ({
	p: 2,
	borderRadius: 2,
	border: "1px dashed",
	borderColor: "divider",
	bgcolor: theme.palette.background.default,
	textAlign: "center",
});

const acceptBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	borderRadius: 2,
	bgcolor: "success.main",
	color: "#fff",
	px: 1.5,
	py: 1.1,
	"&:hover": { bgcolor: "success.dark" },
};

const rejectBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	borderRadius: 2,
	bgcolor: "error.main",
	color: "#fff",
	px: 1.5,
	py: 1.1,
	"&:hover": { bgcolor: "error.dark" },
};

const counterBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	px: 1.5,
	py: 1.1,
	borderRadius: 2,
};

const cancelBtnSx = {
	fontWeight: 800,
	textTransform: "none",
	borderRadius: 2,
};

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
