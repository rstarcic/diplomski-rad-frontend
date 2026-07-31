import dayjs from "dayjs";
import { mapReviewDataFromAPI } from "./review.mapper.js";
import { mapStatusFromAPI, mapStatusGroupFromAPI } from "./status.mapper";

const LOCATION_TYPE_LABELS = {
	remote: "Remote",
	hybrid: "Hybrid",
	on_site: "On-site",
};

const LOCATION_TYPE_FROM_API = {
	on_site: "onsite",
};

const LOCATION_TYPE_TO_API = {
	onsite: "on_site",
};

const BUDGET_TYPE_LABELS = {
	fixed: "Fixed",
	hourly: "Hourly",
};

export function mapJobToAPI(job = {}) {
	return {
		title: job.title,
		category: job.category,
		description: job.description,
		location_type: LOCATION_TYPE_TO_API[job.locationType] ?? job.locationType,
		location: job.location ?? "",
		deadline: job.deadline ? dayjs(job.deadline).toISOString() : null,
		deliverables: job.deliverables,
		requirements: job.requirements,
		budget_type: job.budgetType,
		budget_amount: job.budgetAmount,
		currency: job.currency,
		duration: job.durationDays,
		hours_per_week: job.hoursPerWeek,
		status: job.status,
		...(job.sourceJobId && {
			source_job_id: job.sourceJobId,
		}),
	};
}

export function mapJobFromAPI(job = {}) {
	return {
		id: job.id,
		title: job.title,
		category: job.category,
		description: job.description,
		locationType: LOCATION_TYPE_FROM_API[job.location_type] ?? job.location_type,
		location: job.location ?? "",
		deadline: job.deadline ? dayjs(job.deadline) : null,
		deliverables: job.deliverables,
		requirements: job.requirements,
		budgetType: job.budget_type,
		budgetAmount: job.budget_amount ?? "",
		currency: job.currency,
		durationDays: job.duration ?? "",
		hoursPerWeek: job.hours_per_week,
		status: mapStatusFromAPI(job.status),
		updatedAt: job.updated_at,
	};
}

export function mapJobSummaryFromAPI(job = {}) {
	return {
		id: job.id,
		title: job.title,
		category: job.category,
		location: job.location,
		locationType: LOCATION_TYPE_LABELS[job.location_type] ?? job.location_type,
		budgetType: BUDGET_TYPE_LABELS[job.budget_type] ?? job.budget_type,
		deadline: job.deadline ? dayjs(job.deadline) : null,
		applications: {
			total:
				job.applications?.total ??
				job.applications?.count ??
				job.applicants_count ??
				job.applications_count ??
				job.application_count ??
				0,
			new:
				job.applications?.new ??
				job.applications?.new_count ??
				job.new_applicants_count ??
				job.new_applications_count ??
				0,
		},
		contracts: mapStatusGroupFromAPI(job.contracts ?? job.contract ?? job.contract_status ?? null),
		payments: mapStatusGroupFromAPI(job.payments ?? job.payment ?? job.payment_status ?? null),
		hoursPerWeek: job.hours_per_week,
		status: mapStatusFromAPI(job.status),
		updatedAt: job.updated_at,
		replacementJobId: job.replacement_job_id ?? null,
	};
}

export function mapJobListItemFromAPI(item = {}) {
	const job = item.job ?? item;
	const client = item.client ?? job.client ?? {};

	return {
		id: job.id,
		title: job.title,
		category: job.category,
		description: job.description,
		location: job.location,
		locationType: LOCATION_TYPE_LABELS[job.location_type] ?? job.location_type,

		budgetType: BUDGET_TYPE_LABELS[job.budget_type] ?? job.budget_type,
		budgetTypeKey: job.budget_type,
		budgetAmount: job.budget_amount ?? "",
		currency: job.currency ?? "EUR",
		deadline: job.deadline ? dayjs(job.deadline) : null,
		status: mapStatusFromAPI(job.status),
		createdAt: job.created_at,
		updatedAt: job.updated_at,

		client: {
			id: client.user_id ?? job.user_id ?? job.client_id,
			fullName: client.full_name ?? job.full_name ?? job.client_full_name ?? "",
			profilePicture: client.profile_picture ?? job.profile_picture ?? job.client_profile_picture ?? null,
		},
	};
}

export function mapJobDetailsPageFromAPI(data = {}) {
	console.log(data?.application_status);
	const client = data.client ?? {};
	const job = data.job ?? {};

	return {
		job: {
			...mapJobFromAPI(job),
		},

		client: {
			id: client.user_id,
			fullName: client.full_name ?? "",
			email: client.email ?? "",
			phone: client.phone ?? "",
			country: client.country ?? "",
			city: client.city ?? "",
			about: client.about ?? "",
			profileImageUrl: client.profile_picture ?? null,
			createdAt: client.created_at ?? null,
		},

		reviews: mapReviewDataFromAPI(data.reviews),

		applicationStatus: data?.application_status,
		alreadyApplied: data?.already_applied,
	};
}

export function mapPaginationFromAPI(data) {
	return {
		page: data?.page ?? 1,
		pageSize: data?.page_size ?? 9,
		total: data?.total ?? 0,
		totalPages: data?.total_pages ?? 0,
	};
}
