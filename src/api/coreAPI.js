import { api } from "./client.js";
import {
	mapProfileFromAPI,
	mapProfileToFormData,
	mapProfileToAPI,
	mapReviewDataFromAPI,
	mapSkillsFromAPI,
	mapPortfolioItemFromAPI,
} from "./mapper/profileMapper.js";
import { mapJobToAPI, mapJobFromAPI, mapJobSummaryFromAPI, mapJobListItemFromAPI } from "./mapper/jobMapper.js";

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

export async function createJob(jobData) {
	const payload = mapJobToAPI(jobData);
	const { data } = await api.post("/jobs", payload);
	return data;
}

export async function getAllJobs() {
	const { data } = await api.get("/jobs");
	return data.map(mapJobListItemFromAPI);
}

export async function getJobById(jobId) {
	const { data } = await api.get(`/jobs/${jobId}`);
	return mapJobFromAPI(data);
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
