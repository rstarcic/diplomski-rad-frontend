export const MAX_NEGOTIATION_ROUNDS = 3;

export function normalizeBudgetType(value) {
	return String(value ?? "").trim().toLowerCase();
}

export function createCounterOfferValues(offer) {
	return {
		budgetType: normalizeBudgetType(offer?.budgetType),
		budgetAmount: offer?.budgetAmount ?? "",
		hoursPerWeek: offer?.hoursPerWeek ?? "",
		duration: offer?.duration ?? "",
		deliverables: offer?.deliverables ?? "",
		message: "",
	};
}

export function getNegotiationTerms(initialOffer, updates = []) {
	const sortedUpdates = [...updates].sort(
		(first, second) => first.roundNumber - second.roundNumber,
	);
	const currentOffer = sortedUpdates.at(-1) ?? initialOffer ?? null;
	const parsedRound = Number(currentOffer?.roundNumber ?? 1);
	const currentRound = Math.min(
		Number.isFinite(parsedRound) ? parsedRound : 1,
		MAX_NEGOTIATION_ROUNDS,
	);

	return {
		sortedUpdates,
		currentOffer,
		currentRound,
	};
}
