
import { mapReviewDataFromAPI } from "./profileMapper";
import { mapJobFromAPI } from "./jobMapper";

// Status mappers

function mapStatusFromAPI(status = "") {
	const normalizedStatus = String(status).trim();

	if (!normalizedStatus) return "";
	if (!normalizedStatus.includes("_") && normalizedStatus !== normalizedStatus.toUpperCase()) return normalizedStatus;

	return normalizedStatus.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function mapApplicationStatusFromAPI(status = "") {
	return mapStatusFromAPI(status);
}

export function mapContractStatusFromAPI(status = "") {
	return mapStatusFromAPI(status);
}

// Shared entity mappers

function mapApplicationFromAPI(application = {}) {
	return {
		id: application.id,
		status: mapApplicationStatusFromAPI(application.status),
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

export function mapContractFromAPI(contract = null) {
	if (!contract) return null;
	const rawContract = Array.isArray(contract) ? contract[0] : contract;
	const contractData = rawContract?.contract ?? rawContract;
	if (!contractData) return null;

	return {
		id: contractData.id ?? contractData.contractId ?? contractData.contract_id,
		contractNumber: contractData.contractNumber ?? contractData.contract_number ?? "",
		platformName: contractData.platformName ?? contractData.platform_name ?? "",
		applicationId: contractData.applicationId ?? contractData.application_id,
		negotiationId: contractData.negotiationId ?? contractData.negotiation_id ?? null,

		clientId: contractData.clientId ?? contractData.client_id,
		clientName: contractData.clientName ?? contractData.client_name ?? "",
		clientEmail: contractData.clientEmail ?? contractData.client_email ?? "",
		clientSignedAt: contractData.clientSignedAt ?? contractData.client_signed_at ?? null,
		clientSignatureUrl: contractData.clientSignatureUrl ?? contractData.client_signature_url ?? null,

		contractorId: contractData.contractorId ?? contractData.contractor_id,
		contractorName: contractData.contractorName ?? contractData.contractor_name ?? "",
		contractorEmail: contractData.contractorEmail ?? contractData.contractor_email ?? "",
		contractorSignedAt: contractData.contractorSignedAt ?? contractData.contractor_signed_at ?? null,
		contractorSignatureUrl: contractData.contractorSignatureUrl ?? contractData.contractor_signature_url ?? null,

		jobId: contractData.jobId ?? contractData.job_id,
		jobTitle: contractData.jobTitle ?? contractData.job_title ?? "",
		jobDescription: contractData.jobDescription ?? contractData.job_description ?? "",

		budgetAmount: contractData.budgetAmount ?? contractData.budget_amount ?? "",
		budgetType: contractData.budgetType ?? contractData.budget_type ?? "",
		currency: contractData.currency ?? "EUR",
		duration: contractData.duration ?? "",
		hoursPerWeek: contractData.hoursPerWeek ?? contractData.hours_per_week ?? "",
		deliverables: contractData.deliverables ?? "",

		status: mapStatusFromAPI(contractData.status),
		startsAt: contractData.startsAt ?? contractData.starts_at ?? null,
		endsAt: contractData.endsAt ?? contractData.ends_at ?? null,
		createdAt: contractData.createdAt ?? contractData.created_at ?? null,
		updatedAt: contractData.updatedAt ?? contractData.updated_at ?? null,
	};
}

function getContractFromDetails(data = {}) {
	const contract = data.contract ?? data.contracts;
	if (contract) return mapContractFromAPI(contract);

	const id = data.contractId ?? data.contract_id;
	const status = data.contractStatus ?? data.contract_status;
	return id || status ? mapContractFromAPI({ id, status }) : null;
}

function mapPaymentFromAPI(payment = null) {
	if (!payment) return null;

	return {
		...payment,
		status: mapStatusFromAPI(payment.status),
	};
}

// Client application mappers

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
			status: mapApplicationStatusFromAPI(application.status ?? "pending"),
			coverLetter: application.cover_letter ?? "",
		},
		job: {
			id: job.id ?? application.job_id,
			title: job.title ?? "",
		},
	};
}
export function mapJobApplicationDetailsFromAPI(data = {}) {
	const negotiationUpdates = data.negotiationUpdates ?? data.negotiation_updates ?? [];

	return {
		application: mapApplicationFromAPI(data.application ?? {}),
		job: data.job ? mapJobFromAPI(data.job) : null,
		contractor: mapContractorFromAPI(data.contractor ?? {}),
		reviews: mapReviewDataFromAPI(data.reviews ?? {}),
		negotiation: mapNegotiationFromAPI(data.negotiation),
		negotiationUpdates: negotiationUpdates.map(mapNegotiationUpdateFromAPI),
		contract: getContractFromDetails(data),
		payment: mapPaymentFromAPI(data.payment),
	};
}

// Contractor application mappers

export function mapMyApplicationFromAPI(item = {}) {
	const job = item.job ?? {};
	const client = item.client ?? {};
	const application = item.application ?? {};

	return {
		job: {
			id: job.id,
			title: job.title ?? "",
			category: job.category ?? "",
		},

		client: {
			id: client.user_id ?? client.id,
			userId: client.user_id,
			fullName: client.full_name ?? "",
			city: client.city ?? "",
			country: client.country ?? "",
			profileImageUrl: client.profile_picture ?? null,
			email: client.email ?? "",
			phone: client.phone ?? "",
			about: client.about ?? "",
			createdAt: client.created_at ?? null,
		},

		application: {
			id: application.id,
			status: mapApplicationStatusFromAPI(
				application.status ?? "pending"
			),
			coverLetter: application.cover_letter ?? "",
			createdAt: application.created_at ?? null,
			appliedAt: application.created_at ?? null,
		},
	};
}

export function mapMyApplicationDetailsFromAPI(data = {}) {
	const baseDetails = mapMyApplicationFromAPI(data);
	const rawJob = data.job ?? {};
	const rawReviews = data.reviews ?? {};

	const negotiationUpdates =
		data.negotiation_updates ??
		data.negotiationUpdates ??
		[];

	const reviewItems =
		rawReviews.items ??
		rawReviews.reviews ??
		[];

	const normalizedReviews = {
		...rawReviews,
		items: reviewItems.map((review) => ({
			...review,
			reviewer: review.reviewer ?? {
				user_id: review.reviewer_user_id,
				full_name: review.reviewer_full_name,
				profile_picture: review.reviewer_profile_picture,
			},
		})),
	};

	return {
		application: baseDetails.application,

		job: {
			...mapJobFromAPI(rawJob),
			budgetType:
				rawJob.budget_type === "hourly"
					? "Hourly"
					: rawJob.budget_type === "fixed"
						? "Fixed"
						: rawJob.budget_type ?? "",
		},

		client: baseDetails.client,

		reviews: mapReviewDataFromAPI(normalizedReviews),

		negotiation: mapNegotiationFromAPI(
			data.negotiation,
		),

		negotiationUpdates: negotiationUpdates.map(
			mapNegotiationUpdateFromAPI,
		),

		contract: getContractFromDetails(data),

		payment: mapPaymentFromAPI(data.payment),
	};
}
