import { useState } from "react";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";

import CurrentOfferCard from "./CurrentOfferCard";
import DecisionSection from "./DecisionSection";
import NegotiationTimeline from "./Timeline";
import StatusChip from "../../../../components/ui/StatusChip";
import { NEGOTIATION_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";

export default function NegotiationSection({ negotiation, status, updates = [], role, onAcceptNegotiation }) {
	const sortedUpdates = [...updates].sort((a, b) => a.roundNumber - b.roundNumber);
	const currentOffer = sortedUpdates.at(-1) ?? null;

	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] = useState({
		budgetAmount: currentOffer?.budgetAmount ?? "",
		hoursPerWeek: currentOffer?.hoursPerWeek ?? "",
		duration: currentOffer?.duration ?? "",
		deliverables: currentOffer?.deliverables ?? "",
		message: "",
	});

	const statusKey = status ? findStatusKey(status, NEGOTIATION_STATUSES) : null;

	const handleEditChange = (field, value) => {
		setEditValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleCounterOffer = () => setIsEditing(true);

	const handleCancelEdit = () => {
		setEditValues({
			budgetAmount: currentOffer?.budgetAmount ?? "",
			hoursPerWeek: currentOffer?.hoursPerWeek ?? "",
			duration: currentOffer?.duration ?? "",
			deliverables: currentOffer?.deliverables ?? "",
			message: "",
		});
		setIsEditing(false);
	};

	const handleSubmitCounter = () => {
		// TODO: API call with editValues
		setIsEditing(false);
	};

	const handleAccept = () => {
		// TODO: API call
		onAcceptNegotiation?.();
	};

	const handleReject = () => {
		// TODO: API call
	};

	if (!negotiation) {
		return (
			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={1}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Negotiation
					</Typography>
					<Typography variant="body2" color="text.secondary">
						No negotiation has been started for this application yet.
					</Typography>
				</Stack>
			</Card>
		);
	}

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2.5}>
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Negotiation
					</Typography>
					{statusKey && <StatusChip status={statusKey} config={NEGOTIATION_STATUSES} />}
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
								onSubmitCounter={handleSubmitCounter}
								onCancelEdit={handleCancelEdit}
								message={editValues.message}
								onMessageChange={(value) => handleEditChange("message", value)}
							/>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<NegotiationTimeline updates={sortedUpdates} />
					</Grid>
				</Grid>
			</Stack>
		</Card>
	);
}
