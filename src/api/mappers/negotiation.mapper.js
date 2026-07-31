import { mapStatusFromAPI } from "./status.mapper";

export function mapNegotiationFromAPI(negotiation = null) {
    if (!negotiation) return null;

    return {
        id: negotiation.id,
        status: mapStatusFromAPI(negotiation.status),
    };
}

export function mapNegotiationUpdateFromAPI(update = {}) {
    return {
        id: update.id,
        roundNumber: update.roundNumber ?? update.round_number,
        submittedBy: update.submittedBy ?? update.submitted_by ?? "",
        submittedAt: update.submittedAt ?? update.submitted_at ?? "",
        budgetAmount: update.budgetAmount ?? update.budget_amount ?? "",
        budgetType: update.budgetType ?? update.budget_type ?? "",
        currency: update.currency ?? "EUR",
        hoursPerWeek: update.hoursPerWeek ?? update.hours_per_week ?? "",
        duration: update.duration ?? "",
        deliverables: update.deliverables ?? "",
        message: update.message ?? "",
    };
}

export function mapCounterOfferToAPI(counterOffer = {}) {
    return {
        budget_type: counterOffer.budgetType,
        budget_amount: Number(counterOffer.budgetAmount),
        hours_per_week: Number(counterOffer.hoursPerWeek),
        duration: Number(counterOffer.duration),
        deliverables: counterOffer.deliverables?.trim() ?? "",
        message: counterOffer.message?.trim() ?? "",
    };
}
