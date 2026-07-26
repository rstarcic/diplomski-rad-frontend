
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

export function mapContractFromAPI(contract = null, fallbackJob = null) {
	if (!contract) return null;
	const contractData = contract?.contract ?? contract;
	if (!contractData) return null;

	const fallback = fallbackJob ?? {};
	const client = contractData.client ?? contractData.client_details ?? contractData.clientInfo ?? {};
	const contractor = contractData.contractor ?? contractData.contractor_details ?? contractData.contractorInfo ?? {};
	const platform = contractData.platform ?? {};
	const job = contractData.job ?? fallback;

	const buildPersonName = (person = {}) => {
		if (!person || typeof person !== "object") return "";
		return (
			person.full_name ??
			person.fullName ??
			person.name ??
			person.username ??
			[person.first_name, person.last_name].filter(Boolean).join(" ") ??
			""
		);
	};

	return {
		id: contractData.id ?? contractData.contractId ?? contractData.contract_id,
		contractNumber: contractData.contract_number ?? contractData.contractNumber ?? "",
		platformName: contractData.platform_name ?? contractData.platformName ?? platform.name ?? platform.title ?? fallback.platform_name ?? fallback.platformName ?? fallback.platform ?? "",
		applicationId: contractData.application_id ?? contractData.applicationId ?? "",
		negotiationId: contractData.negotiation_id ?? contractData.negotiationId ?? null,

		clientId: contractData.client_id ?? contractData.clientId ?? client.id ?? client.user_id ?? null,
		clientName: contractData.client_name ?? contractData.clientName ?? buildPersonName(client) ?? fallback.client_name ?? fallback.clientName ?? "",
		clientEmail: contractData.client_email ?? contractData.clientEmail ?? client.email ?? fallback.client_email ?? fallback.clientEmail ?? "",
		clientSignedAt: contractData.client_signed_at ?? contractData.clientSignedAt ?? null,
		clientSignatureUrl: contractData.client_signature_url ?? contractData.clientSignatureUrl ?? null,

		contractorId: contractData.contractor_id ?? contractData.contractorId ?? contractor.id ?? contractor.user_id ?? null,
		contractorName: contractData.contractor_name ?? contractData.contractorName ?? buildPersonName(contractor) ?? fallback.contractor_name ?? fallback.contractorName ?? "",
		contractorEmail: contractData.contractor_email ?? contractData.contractorEmail ?? contractor.email ?? fallback.contractor_email ?? fallback.contractorEmail ?? "",
		contractorSignedAt: contractData.contractor_signed_at ?? contractData.contractorSignedAt ?? null,
		contractorSignatureUrl: contractData.contractor_signature_url ?? contractData.contractorSignatureUrl ?? null,

		jobId: contractData.job_id ?? contractData.jobId ?? job.id ?? fallback.id ?? null,
		jobTitle: contractData.job_title ?? contractData.jobTitle ?? job.title ?? fallback.title ?? "",
		jobDescription: contractData.job_description ?? contractData.jobDescription ?? job.description ?? fallback.description ?? "",

		budgetAmount: contractData.budget_amount ?? contractData.budgetAmount ?? job.budget_amount ?? job.budgetAmount ?? fallback.budget_amount ?? fallback.budgetAmount ?? "",
		budgetType: contractData.budget_type ?? contractData.budgetType ?? job.budget_type ?? job.budgetType ?? fallback.budget_type ?? fallback.budgetType ?? "",
		currency: contractData.currency ?? job.currency ?? fallback.currency ?? "EUR",
		duration: contractData.duration ?? contractData.duration_days ?? contractData.durationDays ?? job.duration ?? job.duration_days ?? job.durationDays ?? fallback.duration ?? fallback.duration_days ?? fallback.durationDays ?? "",
		hoursPerWeek: contractData.hours_per_week ?? contractData.hoursPerWeek ?? job.hours_per_week ?? job.hoursPerWeek ?? fallback.hours_per_week ?? fallback.hoursPerWeek ?? "",
		deliverables: contractData.deliverables ?? job.deliverables ?? fallback.deliverables ?? "",

		status: mapStatusFromAPI(contractData.status),
		startsAt: contractData.starts_at ?? contractData.startsAt ?? null,
		endsAt: contractData.ends_at ?? contractData.endsAt ?? null,
		createdAt: contractData.created_at ?? contractData.createdAt ?? null,
		updatedAt: contractData.updated_at ?? contractData.updatedAt ?? null,
	};
}

function getContractFromDetails(data = {}) {
	const contract = data.contract ?? data.contracts;
	const fallbackJob = data.job ?? null;
	if (contract) return mapContractFromAPI(contract, fallbackJob);

	const id = data.contractId ?? data.contract_id;
	const status = data.contractStatus ?? data.contract_status;
	return id || status ? mapContractFromAPI({ id, status }, fallbackJob) : null;
}

function mapPaymentFromAPI(payment = null) {
	if (!payment) return null;

	const amountMinor = payment.amountMinor ?? payment.amount_minor ?? null;

	return {
		id: payment.id,
		contractId: payment.contractId ?? payment.contract_id,
		amountMinor,
		amount: amountMinor != null ? amountMinor / 100 : null,
		currency: payment.currency ?? "EUR",
		status: mapStatusFromAPI(payment.status),
		checkoutAttempt: payment.checkoutAttempt ?? payment.checkout_attempt ?? 0,
		createdAt: payment.createdAt ?? payment.created_at ?? null,
		updatedAt: payment.updatedAt ?? payment.updated_at ?? null,
		checkoutUrl: payment.checkoutUrl ?? payment.checkout_url ?? payment.payment_url ?? "",
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
