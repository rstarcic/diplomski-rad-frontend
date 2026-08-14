import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../../components/ui/SecondaryButton";

import {
	actionCardSx,
	acceptBtnSx,
	cancelBtnSx,
	counterBtnSx,
	messageFieldSx,
	rejectBtnSx,
	waitingCardSx,
} from "./DecisionSection.styles";

function EditingCard({ message, onMessageChange, onSubmit, onCancel, isSubmitting }) {
	return (
		<Box sx={actionCardSx}>
			<Stack spacing={1.5}>
				<Typography variant="subtitle2" fontWeight={700}>
					Submit your counter-offer
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Review the updated terms above and submit when ready.
				</Typography>
				<TextField
					label="Message"
					value={message}
					onChange={(event) => onMessageChange(event.target.value)}
					placeholder="Add a short note about your counter-offer"
					multiline
					minRows={3}
					fullWidth
					size="small"
					sx={messageFieldSx}
				/>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
					<PrimaryButton
						startIcon={<SwapHorizRoundedIcon />}
						onClick={onSubmit}
						disabled={isSubmitting}
						sx={counterBtnSx}
					>
						{isSubmitting ? "Submitting..." : "Submit counter-offer"}
					</PrimaryButton>
					<SecondaryButton
						startIcon={<CloseRoundedIcon />}
						onClick={onCancel}
						disabled={isSubmitting}
						sx={cancelBtnSx}
					>
						Cancel
					</SecondaryButton>
				</Stack>
			</Stack>
		</Box>
	);
}

function ActionCard({ role, onAccept, onReject, onCounterOffer, canCounterOffer }) {
	const title = "Your response";
	const question = role === "client" ? "Do you accept the contractor's terms?" : "Do you accept the client's terms?";

	return (
		<Box sx={actionCardSx}>
			<Stack spacing={1.25}>
				<Typography variant="subtitle2" fontWeight={700}>
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{question}
				</Typography>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { sm: "center" } }}>
					<Button
						variant="contained"
						color="success"
						startIcon={<CheckRoundedIcon />}
						onClick={onAccept}
						sx={acceptBtnSx}
					>
						Accept
					</Button>

					{canCounterOffer && (
						<SecondaryButton
							startIcon={<SwapHorizRoundedIcon />}
							onClick={onCounterOffer}
							sx={counterBtnSx}
						>
							Counter-offer
						</SecondaryButton>
					)}

					<Button
						variant="outlined"
						color="error"
						startIcon={<CloseRoundedIcon />}
						onClick={onReject}
						sx={rejectBtnSx}
					>
						Reject
					</Button>
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

function FinalCard({ status }) {
	const isAccepted = status === "accepted";

	return (
		<Box sx={waitingCardSx}>
			<Stack spacing={0.5} sx={{ alignItems: "center" }}>
				{isAccepted ? (
					<CheckRoundedIcon fontSize="small" color="success" />
				) : (
					<CloseRoundedIcon fontSize="small" color="error" />
				)}
				<Typography variant="body2" color="text.secondary" fontWeight={700}>
					{isAccepted ? "Negotiation accepted" : "Negotiation rejected"}
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
	canCounterOffer = true,
	onSubmitCounter,
	onCancelEdit,
	message,
	onMessageChange,
	isSubmittingCounter,
}) {
	if (isEditing) {
		return (
			<EditingCard
				message={message}
				onMessageChange={onMessageChange}
				onSubmit={onSubmitCounter}
				onCancel={onCancelEdit}
				isSubmitting={isSubmittingCounter}
			/>
		);
	}

	if (["accepted", "rejected", "expired"].includes(status)) {
		return <FinalCard status={status} />;
	}

	const isActiveParty =
		(status === "pendingClient" && role === "client") || (status === "pendingContractor" && role === "contractor");

	if (isActiveParty) {
		return (
			<ActionCard
				role={role}
				onAccept={onAccept}
				onReject={onReject}
				onCounterOffer={onCounterOffer}
				canCounterOffer={canCounterOffer}
			/>
		);
	}

	return <WaitingCard waitingFor={status === "pendingClient" ? "client" : "contractor"} />;
}
