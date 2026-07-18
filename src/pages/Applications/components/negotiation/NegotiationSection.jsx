import { useState } from "react";
import { Card, Chip, Divider, Grid, Stack, Typography } from "@mui/material";

import CurrentOfferCard from "./CurrentOfferCard";
import DecisionSection from "./DecisionSection";
import NegotiationTimeline from "./Timeline";
import StatusChip from "../../../../components/ui/StatusChip";
import { NEGOTIATION_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";
import { getCurrentTermsTitle } from "./negotiationLabels";
import AppAlert from "../../../../components/ui/Alert";

const MAX_NEGOTIATION_ROUNDS = 3;

function normalizeBudgetType(value) {
	return String(value ?? "").trim().toLowerCase();
}

export default function NegotiationSection({
	initialOffer,
	status,
	updates = [],
	role,
	onAcceptNegotiation,
	onRejectNegotiation,
	onSubmitCounterOffer,
}) {
	const sortedUpdates = [...updates].sort((a, b) => a.roundNumber - b.roundNumber);
	const currentOffer = sortedUpdates.at(-1) ?? initialOffer ?? null;
	const currentRound = Math.min(Number(currentOffer?.roundNumber ?? 1), MAX_NEGOTIATION_ROUNDS);

	const [isEditing, setIsEditing] = useState(false);
	const [isSubmittingCounter, setIsSubmittingCounter] = useState(false);
	const [counterError, setCounterError] = useState("");
	const [editValues, setEditValues] = useState({
		budgetType: normalizeBudgetType(currentOffer?.budgetType),
		budgetAmount: currentOffer?.budgetAmount ?? "",
		hoursPerWeek: currentOffer?.hoursPerWeek ?? "",
		duration: currentOffer?.duration ?? "",
		deliverables: currentOffer?.deliverables ?? "",
		message: "",
	});

	const statusKey = status ? findStatusKey(status, NEGOTIATION_STATUSES) : null;
	const negotiationIsFinal = ["accepted", "rejected", "expired"].includes(statusKey);
	const canCounterOffer = currentRound < MAX_NEGOTIATION_ROUNDS;
	const termsTitle = getCurrentTermsTitle(sortedUpdates, isEditing);

	const handleEditChange = (field, value) => {
		setEditValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleCounterOffer = () => {
		setEditValues({
			budgetType: normalizeBudgetType(currentOffer?.budgetType),
			budgetAmount: currentOffer?.budgetAmount ?? "",
			hoursPerWeek: currentOffer?.hoursPerWeek ?? "",
			duration: currentOffer?.duration ?? "",
			deliverables: currentOffer?.deliverables ?? "",
			message: "",
		});
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setEditValues({
			budgetType: normalizeBudgetType(currentOffer?.budgetType),
			budgetAmount: currentOffer?.budgetAmount ?? "",
			hoursPerWeek: currentOffer?.hoursPerWeek ?? "",
			duration: currentOffer?.duration ?? "",
			deliverables: currentOffer?.deliverables ?? "",
			message: "",
		});
		setIsEditing(false);
	};

	const handleSubmitCounter = async () => {
		if (isSubmittingCounter) return;

		if (!["fixed", "hourly"].includes(editValues.budgetType)) {
			setCounterError("Select a valid budget type.");
			return;
		}

		try {
			setIsSubmittingCounter(true);
			setCounterError("");
			await onSubmitCounterOffer?.(editValues);
			setIsEditing(false);
		} catch (error) {
			setCounterError(error?.message || "Counter-offer could not be submitted. Please try again.");
		} finally {
			setIsSubmittingCounter(false);
		}
	};

	const handleAccept = async () => {
		await onAcceptNegotiation?.();
	};

	const handleReject = async () => {
		await onRejectNegotiation?.();
	};

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2.5}>
				{counterError && (
					<AppAlert severity="error" title="Counter-offer could not be submitted">
						{counterError}
					</AppAlert>
				)}
				<Stack
					direction={{ xs: "column", sm: "row" }}
					sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1 }}
				>
					<Typography variant="h6" sx={sectionTitleSx}>
						{termsTitle}
					</Typography>
					<Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
						<Chip
							label={`Round ${currentRound} of ${MAX_NEGOTIATION_ROUNDS}`}
							size="small"
							color="primary"
							variant="outlined"
							sx={{ fontWeight: 800 }}
						/>
						{statusKey && <StatusChip status={statusKey} config={NEGOTIATION_STATUSES} />}
					</Stack>
				</Stack>

				<Divider />

				<Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
					<Grid size={{ xs: 12, md: 8 }}>
						<Stack spacing={2}>
							<CurrentOfferCard
								offer={currentOffer}
								isEditing={isEditing}
								editValues={editValues}
								onEditChange={handleEditChange}
							/>
							<DecisionSection
								status={statusKey}
								role={role}
								isEditing={isEditing}
								onAccept={handleAccept}
								onReject={handleReject}
								onCounterOffer={handleCounterOffer}
								canCounterOffer={canCounterOffer}
								onSubmitCounter={handleSubmitCounter}
								onCancelEdit={handleCancelEdit}
								isSubmittingCounter={isSubmittingCounter}
								message={editValues.message}
								onMessageChange={(value) => handleEditChange("message", value)}
							/>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={2}>
							<NegotiationTimeline updates={sortedUpdates} />
							{!negotiationIsFinal && currentRound === MAX_NEGOTIATION_ROUNDS - 1 && (
								<AppAlert severity="warning" title="Final round next">
									After the next counter-offer, the latest proposal must be accepted or rejected.
								</AppAlert>
							)}
							{!negotiationIsFinal && currentRound >= MAX_NEGOTIATION_ROUNDS && (
								<AppAlert severity="warning" title="Final round reached">
									No more counter-offers are available. Accept or reject the latest proposal.
								</AppAlert>
							)}
						</Stack>
					</Grid>
				</Grid>
			</Stack>
		</Card>
	);
}
