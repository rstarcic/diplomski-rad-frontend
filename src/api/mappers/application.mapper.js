import { mapContractFromDetails } from "./contract.mapper";
import { mapJobFromAPI } from "./job.mapper";
import {
	mapNegotiationFromAPI,
	mapNegotiationUpdateFromAPI,
} from "./negotiation.mapper";
import { mapPaymentFromAPI } from "./payment.mapper";
import { mapReviewDataFromAPI } from "./review.mapper";
import {
	mapApplicationStatusFromAPI,
	mapStatusFromAPI,
} from "./status.mapper";
import { mapContractorFromAPI } from "./profile.mapper";


function mapApplicationFromAPI(application = {}) {
	return {
		id: application.id,
		status: mapApplicationStatusFromAPI(application.status),
		coverLetter: application.cover_letter ?? "",
		appliedAt:
			application.appliedAt ??
			application.applied_at ??
			application.createdAt ??
			application.created_at ??
			null,
	};
}

export function mapJobApplicationFromAPI(item = {}) {
	const application = item.application ?? item;
	const contractor = item.contractor ?? {};
	const job = item.job ?? {};
	const contractData =
		item.contract ??
		item.contracts ??
		application.contract ??
		job.contract ??
		job.contracts ??
		job.contract_status;
	const paymentData =
		item.payment ??
		item.payments ??
		application.payment ??
		job.payment ??
		job.payments ??
		job.payment_status;
	const normalizedContractData =
		typeof contractData === "string"
			? { status: contractData }
			: contractData;
	const normalizedPaymentData =
		typeof paymentData === "string"
			? { status: paymentData }
			: paymentData;

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
			appliedAt:
				application.appliedAt ??
				application.applied_at ??
				application.createdAt ??
				application.created_at ??
				null,
		},
		job: {
			id: job.id ?? application.job_id,
			title: job.title ?? "",
			status: mapStatusFromAPI(job.status),
		},
		contract: normalizedContractData
			? mapContractFromDetails({ contract: normalizedContractData, job })
			: mapContractFromDetails(item),
		payment: mapPaymentFromAPI(normalizedPaymentData),
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
		contract: mapContractFromDetails(data),
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

		contract: mapContractFromDetails(data),

		payment: mapPaymentFromAPI(data.payment),
	};
}
