import { Card, Chip, Divider, Grid, Stack, Typography } from "@mui/material";

import AppAlert from "../../../../components/ui/AppAlert";
import StatusChip from "../../../../components/ui/StatusChip";
import { NEGOTIATION_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";
import CurrentOfferCard from "./CurrentOfferCard";
import DecisionSection from "./DecisionSection";
import NegotiationTimeline from "./Timeline";
import { getCurrentTermsTitle } from "./negotiationLabels";
import {
	getNegotiationTerms,
	MAX_NEGOTIATION_ROUNDS,
} from "./negotiation.utils";
import {
	contentGridSx,
	headerSx,
	roundChipSx,
	statusGroupSx,
} from "./NegotiationSection.styles";
import { useNegotiationActions } from "./useNegotiationActions";

export default function NegotiationSection({
	initialOffer,
	status,
	updates = [],
	role,
	onAcceptNegotiation,
	onRejectNegotiation,
	onSubmitCounterOffer,
}) {
	const { sortedUpdates, currentOffer, currentRound } = getNegotiationTerms(
		initialOffer,
		updates,
	);
	const {
		isEditing,
		isSubmittingCounter,
		counterError,
		editValues,
		handleEditChange,
		handleCounterOffer,
		handleCancelEdit,
		handleSubmitCounter,
		handleAccept,
		handleReject,
	} = useNegotiationActions({
		currentOffer,
		onAcceptNegotiation,
		onRejectNegotiation,
		onSubmitCounterOffer,
	});

	const statusKey = status ? findStatusKey(status, NEGOTIATION_STATUSES) : null;
	const negotiationIsFinal = ["accepted", "rejected", "expired"].includes(statusKey);
	const canCounterOffer = currentRound < MAX_NEGOTIATION_ROUNDS;
	const termsTitle = getCurrentTermsTitle(sortedUpdates, isEditing);

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
					sx={headerSx}
				>
					<Typography variant="h6" sx={sectionTitleSx}>
						{termsTitle}
					</Typography>
					<Stack direction="row" spacing={1} sx={statusGroupSx}>
						<Chip
							label={`Round ${currentRound} of ${MAX_NEGOTIATION_ROUNDS}`}
							size="small"
							color="primary"
							variant="outlined"
							sx={roundChipSx}
						/>
						{statusKey && <StatusChip status={statusKey} config={NEGOTIATION_STATUSES} />}
					</Stack>
				</Stack>

				<Divider />

				<Grid container spacing={3} sx={contentGridSx}>
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
