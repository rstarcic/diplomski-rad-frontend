
import { mapReviewDataFromAPI } from "./profileMapper";

function mapStatusFromAPI(status = "") {
	const normalizedStatus = String(status).trim();

	if (!normalizedStatus) return "";
	if (!normalizedStatus.includes("_") && normalizedStatus !== normalizedStatus.toUpperCase()) return normalizedStatus;

	return normalizedStatus.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function mapJobApplicationFromAPI(item = {}) {
	const application = item.application ?? item;
	const contractor = item.contractor ?? {};
	const job = item.job ?? {};

	return {
		contractor: {
			id: contractor.user_id ?? contractor.id,
			fullName: contractor.full_name ?? "",
			profileImageUrl: contractor.profile_picture ?? "",
			city: contractor.city ?? "",
			country: contractor.country ?? "",
		},
		application: {
			id: application.id,
			jobId: job.id ?? application.job_id,
			status: mapStatusFromAPI(application.status ?? "pending"),
			coverLetter: application.cover_letter ?? "",
		},
		job: {
			id: job.id ?? application.job_id,
			title: job.title ?? "",
		},
	};
}

function mapApplicationFromAPI(application = {}) {
	return {
		id: application.id,
		status: mapStatusFromAPI(application.status),
		coverLetter: application.cover_letter ?? "",
		appliedAt: application.created_at
	};
}

function mapContractorFromAPI(contractor = {}) {


	return {
		userId: contractor.userId ?? contractor.user_id,
		fullName: contractor.fullName ?? contractor.full_name ?? "",
		profileImageUrl: contractor.profile_picture ?? null,
		email: contractor.email ?? "",
		phone: contractor.phone ?? "",
		city: contractor.city ?? "",
		country: contractor.country ?? "",
		createdAt: contractor.createdAt ?? contractor.created_at ?? "",
		about: contractor.about ?? "",
	};
}

function mapNegotiationFromAPI(negotiation = null) {
	if (!negotiation) return null;

	return {
		id: negotiation.id,
		status: mapStatusFromAPI(negotiation.status),
	};
}

function mapNegotiationUpdateFromAPI(update = {}) {
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

function mapContractFromAPI(contract = null) {
	if (!contract) return null;

	return {
		...contract,
		status: mapStatusFromAPI(contract.status),
	};
}

function mapPaymentFromAPI(payment = null) {
	if (!payment) return null;

	return {
		...payment,
		status: mapStatusFromAPI(payment.status),
	};
}

export function mapJobApplicationDetailsFromAPI(data = {}) {
	const negotiationUpdates = data.negotiationUpdates ?? data.negotiation_updates ?? [];

	return {
		application: mapApplicationFromAPI(data.application ?? {}),
		contractor: mapContractorFromAPI(data.contractor ?? {}),
		reviews: mapReviewDataFromAPI(data.reviews ?? {}),
		negotiation: mapNegotiationFromAPI(data.negotiation),
		negotiationUpdates: negotiationUpdates.map(mapNegotiationUpdateFromAPI),
		contract: mapContractFromAPI(data.contract),
		payment: mapPaymentFromAPI(data.payment),
	};
}
