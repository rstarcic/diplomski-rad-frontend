import { useState } from "react";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";

import CurrentOfferCard from "./CurrentOfferCard";
import DecisionSection from "./DecisionSection";
import NegotiationTimeline from "./Timeline";
import StatusChip from "../../../../components/ui/StatusChip";
import { NEGOTIATION_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";

export default function NegotiationSection({ negotiation, role }) {
	const [currentNegotiation, setCurrentNegotiation] = useState(negotiation);
	const [isEditing, setIsEditing] = useState(false);
	const [editValues, setEditValues] = useState({
		budgetAmount: negotiation?.budgetAmount ?? "",
		hoursPerWeek: negotiation?.hoursPerWeek ?? "",
		duration: negotiation?.duration ?? "",
		deliverables: negotiation?.deliverables ?? "",
	});

	const statusKey = currentNegotiation ? findStatusKey(currentNegotiation.status, NEGOTIATION_STATUSES) : null;

	const handleEditChange = (field, value) => {
		setEditValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleCounterOffer = () => setIsEditing(true);

	const handleCancelEdit = () => {
		setEditValues({
			budgetAmount: negotiation.budgetAmount,
			hoursPerWeek: negotiation.hoursPerWeek,
			duration: negotiation.duration,
			deliverables: negotiation.deliverables,
		});
		setIsEditing(false);
	};

	const handleSubmitCounter = () => {
		// TODO: API call with editValues
		setIsEditing(false);
	};

	const handleAccept = () => {
		// TODO: API call
		setCurrentNegotiation((prev) => ({
			...prev,
			status: "ACCEPTED",
		}));
	};

	const handleReject = () => {
		// TODO: API call
	};

	if (!currentNegotiation) {
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
								negotiation={currentNegotiation}
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
							/>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<NegotiationTimeline rounds={currentNegotiation.rounds} />
					</Grid>
				</Grid>
			</Stack>
		</Card>
	);
}
