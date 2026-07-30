import { api } from "./client.js";
import {
	mapProfileFromAPI,
	mapProfileToFormData,
	mapProfileToAPI,
	mapReviewDataFromAPI,
	mapSkillsFromAPI,
	mapPortfolioItemFromAPI,
	mapProfileStatsFromAPI,
} from "./mapper/profileMapper.js";
import { mapJobToAPI, mapJobFromAPI, mapJobSummaryFromAPI, mapJobListItemFromAPI, mapJobDetailsPageFromAPI, mapPaginationFromAPI } from "./mapper/jobMapper.js";
import { mapApplicationStatusFromAPI, mapJobApplicationFromAPI, mapJobApplicationDetailsFromAPI, mapMyApplicationFromAPI, mapMyApplicationDetailsFromAPI, mapContractFromAPI, mapContractStatusFromAPI, mapCounterOfferToAPI } from "./mapper/applicationMapper.js"
import { mapReviewToAPI } from "./mapper/reviewMapper.js";

// _______________PROFILES _______________

export async function getMyProfile() {
	const { data } = await api.get("/profiles/me");

	const {
		profile,
		reviews,
		skills = [],
	} = data;

	const portfolio = data.portfolio ?? data.portfolio_items ?? [];

	return {
		profile: mapProfileFromAPI(profile),
		reviews: mapReviewDataFromAPI(reviews),
		skills: mapSkillsFromAPI(skills),
		portfolio: portfolio.map(mapPortfolioItemFromAPI),
	};
}

export async function getContractorPublicProfile(contractorId) {
	const { data } = await api.get(`/profiles/contractors/${contractorId}`);

	const {
		profile,
		reviews,
		skills = [],
		stats = [],
	} = data;

	const portfolio = data.portfolio ?? data.portfolio_items ?? [];

	return {
		profile: mapProfileFromAPI(profile),
		portfolio: portfolio.map(mapPortfolioItemFromAPI),
		skills: mapSkillsFromAPI(skills),
		stats: mapProfileStatsFromAPI(stats),
		reviews: mapReviewDataFromAPI(reviews),
	};
}

export async function getClientPublicProfile(clientId, signal) {
	const { data } = await api.get(`/profiles/clients/${clientId}`, { signal });

	const {
		profile,
		reviews,
		stats = [],
	} = data;


	return {
		profile: mapProfileFromAPI(profile),
		stats: mapProfileStatsFromAPI(stats),
		reviews: mapReviewDataFromAPI(reviews),
	};
}

export async function updateMyProfile(profileData) {
	const hasImageUpload = profileData.image instanceof Blob;
	const payload = hasImageUpload ? mapProfileToFormData(profileData) : mapProfileToAPI(profileData);

	const { data } = await api.put("/profiles/me", payload, {
		headers: hasImageUpload ? { "Content-Type": "multipart/form-data" } : undefined,
	});

	const {
		profile,
		reviews,
		skills = [],
	} = data;

	const portfolio = data.portfolio ?? data.portfolio_items ?? [];

	return {
		profile: mapProfileFromAPI(profile),
		reviews: mapReviewDataFromAPI(reviews),
		skills: mapSkillsFromAPI(skills),
		portfolio: portfolio.map(mapPortfolioItemFromAPI),
	};
}

// _______________JOBS _______________

export async function createJob(jobData) {
	const payload = mapJobToAPI(jobData);
	const { data } = await api.post("/jobs", payload);
	return data;
}

export async function getAllJobs(
	{ search, filters, page, pageSize },
	signal
) {
	const normalizedSearch = search?.trim() ?? "";
	const locationType = filters.locationType === "onsite" ? "on_site" : filters.locationType;
	const minBudget = filters.minBudget === "" ? undefined : Number(filters.minBudget);
	const maxBudget = filters.maxBudget === "" ? undefined : Number(filters.maxBudget);

	const { data } = await api.get("/jobs", {
		params: {
			search: normalizedSearch || undefined,
			page,
			page_size: pageSize,

			category: filters.category || undefined,
			location_type: locationType || undefined,
			location: locationType === "remote" ? undefined : filters.city || undefined,
			budget_type: filters.budgetType || undefined,
			min_budget: minBudget,
			max_budget: maxBudget,
		},
		signal,
	});

	return {
		jobs: data.items.map(mapJobListItemFromAPI),
		pagination: mapPaginationFromAPI(data),
	};
}

export async function getJobById(jobId) {
	const { data } = await api.get(`/jobs/${jobId}`);
	return mapJobFromAPI(data);
}

export async function getJobDetails(jobId, signal) {
	const { data } = await api.get(
		`/jobs/${jobId}/details`,
		{
			signal,
		}
	);

	return mapJobDetailsPageFromAPI(data);
}

export async function updateJob(jobId, jobData) {
	const payload = mapJobToAPI(jobData);
	const { data } = await api.put(`/jobs/${jobId}`, payload);
	return mapJobFromAPI(data);
}

export async function getMyJobs() {
	const { data } = await api.get("/jobs/me");
	return data.map(mapJobSummaryFromAPI);
}

export async function getJobFilterOptions() {
	const { data } = await api.get("/jobs/filter-options");
	return data;
}

export async function markJobDone(jobId) {
	const { data } = await api.patch(`/jobs/${jobId}/done`);
	return data;
}

export async function markJobCompleted(jobId) {
	const { data } = await api.patch(`/jobs/${jobId}/complete`);
	return data;
}

export async function markJobIncomplete(jobId) {
	const { data } = await api.patch(`/jobs/${jobId}/incomplete`);
	return data;
}

// _______________APPLICATIONS _______________

export async function getMyApplications(signal) {
	const { data } = await api.get("/applications/me", { signal });
	return Array.isArray(data) ? data.map(mapMyApplicationFromAPI) : [];
}

export async function getMyApplicationDetails(
	applicationId,
	signal
) {
	const { data } = await api.get(
		`/applications/${applicationId}/me`,
		{
			signal,
		}
	);

	const details = mapMyApplicationDetailsFromAPI(data);
	return attachApplicationContract(details, applicationId, signal);
}

export async function getJobApplications(jobId) {
	const { data } = await api.get(`/jobs/${jobId}/applications`);
	return Array.isArray(data) ? data.map(mapJobApplicationFromAPI) : [];
}

export async function getJobApplicationDetails(jobId, applicationId) {
	const { data } = await api.get(`/jobs/${jobId}/applications/${applicationId}`);
	const details = mapJobApplicationDetailsFromAPI(data);
	const [detailsWithContract, job] = await Promise.all([
		attachApplicationContract(details, applicationId),
		details.job ? Promise.resolve(details.job) : getJobById(jobId),
	]);

	return {
		...detailsWithContract,
		job,
	};
}

async function getContractByApplicationId(applicationId, signal, fallbackJob = null) {
	try {
		const { data } = await api.get(`/contracts/application/${applicationId}`, { signal });
		console.log("dataaaa",data)
		return mapContractFromAPI(data, fallbackJob);
	} catch (error) {
		if (error.response?.status === 404) return null;
		throw error;
	}
}

async function attachApplicationContract(details, applicationId, signal) {
	if (details.contract || String(details.application?.status).toLowerCase() !== "accepted") {
		return details;
	}

	const contract = await getContractByApplicationId(applicationId, signal, details.job);
	return { ...details, contract };
}

export async function signContract(contractId, signatureDataUrl) {
	const { data } = await api.post(`/contracts/${contractId}/sign`, {
		signature: signatureDataUrl,
	});

	return mapContractFromAPI(data.contract ?? data);
}

function getDownloadFilename(contentDisposition, fallback) {
	const encodedFilename = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
	if (encodedFilename) return decodeURIComponent(encodedFilename);

	return contentDisposition?.match(/filename="?([^";]+)"?/i)?.[1] ?? fallback;
}

export async function downloadContractPdf(contractId, contractNumber) {
	const response = await api.get(`/contracts/${contractId}/download`, {
		responseType: "blob",
	});
	const fallbackFilename = `${contractNumber || `contract-${contractId}`}.pdf`;
	const filename = getDownloadFilename(response.headers["content-disposition"], fallbackFilename);
	const objectUrl = URL.createObjectURL(response.data);
	const downloadLink = document.createElement("a");

	try {
		downloadLink.href = objectUrl;
		downloadLink.download = filename;
		document.body.appendChild(downloadLink);
		downloadLink.click();
	} finally {
		downloadLink.remove();
		URL.revokeObjectURL(objectUrl);
	}
}

export async function emailContractPdf(contractId) {
	const { data } = await api.post(`/contracts/${contractId}/email`);
	return data;
}


export async function createJobApplication(
	jobId,
	applicationData
) {
	const { data } = await api.post(
		`/jobs/${jobId}/applications`,
		{
			cover_letter: applicationData.coverLetter,
		}
	);

	return mapJobApplicationFromAPI(data);
}

export async function decideJobApplication(
	jobId,
	applicationId,
	decision
) {
	const { data } = await api.patch(
		`/jobs/${jobId}/applications/${applicationId}/decision`,
		{
			decision,
		}
	);

	const application = data.application ?? data;

	return {
		id: application.id ?? applicationId,
		status: mapApplicationStatusFromAPI(application.status),
	};
}

export async function withdrawApplication(applicationId) {
	const { data } = await api.patch(
		`/applications/${applicationId}/withdraw`,
	);

	return data;
}


// _______________NEGOTIATIONS _______________

export async function acceptNegotiationTerms(jobId, applicationId) {
	const { data } = await api.post(
		`/jobs/${jobId}/applications/${applicationId}/accept`,
	);

	return {
		message: data.message,
		contractId: data.contract_id,
		contractStatus: mapContractStatusFromAPI(data.contract_status),
	};
}

export async function rejectNegotiationTerms(jobId, applicationId) {
	const { data } = await api.post(
		`/jobs/${jobId}/applications/${applicationId}/reject`,
	);

	return {
		message: data.message,
	};
}

export async function submitCounterOffer(jobId, applicationId, counterOffer) {
	const { data } = await api.post(
		`/jobs/${jobId}/applications/${applicationId}/counter-offer`,
		mapCounterOfferToAPI(counterOffer),
	);

	return data;
}


// _______________REVIEWS_______________

export async function submitReview(jobId, review) {
	const { data } = await api.post(
		`/jobs/${jobId}/review`,
		mapReviewToAPI(review),
	);

	return data;
}
