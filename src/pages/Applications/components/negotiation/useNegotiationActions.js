import { useState } from "react";

import { createCounterOfferValues } from "./negotiation.utils";

export function useNegotiationActions({
	currentOffer,
	onAcceptNegotiation,
	onRejectNegotiation,
	onSubmitCounterOffer,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [isSubmittingCounter, setIsSubmittingCounter] = useState(false);
	const [counterError, setCounterError] = useState("");
	const [editValues, setEditValues] = useState(() =>
		createCounterOfferValues(currentOffer),
	);

	const resetEditValues = () => {
		setEditValues(createCounterOfferValues(currentOffer));
	};

	const handleEditChange = (field, value) => {
		setEditValues((previousValues) => ({
			...previousValues,
			[field]: value,
		}));
	};

	const handleCounterOffer = () => {
		resetEditValues();
		setCounterError("");
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		resetEditValues();
		setCounterError("");
		setIsEditing(false);
	};

	const handleSubmitCounter = async () => {
		if (isSubmittingCounter) return;

		if (!["fixed", "hourly"].includes(editValues.budgetType)) {
			setCounterError("Select a valid budget type.");
			return;
		}

		setIsSubmittingCounter(true);
		setCounterError("");

		try {
			await onSubmitCounterOffer?.(editValues);
			setIsEditing(false);
		} catch (error) {
			setCounterError(
				error?.message ||
					"Counter-offer could not be submitted. Please try again.",
			);
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

	return {
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
	};
}
