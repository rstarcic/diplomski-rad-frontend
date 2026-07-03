import { api } from "./client.js";
import {
	mapProfileFromAPI,
	mapProfileToFormData,
	mapProfileToAPI,
	mapReviewDataFromAPI,
	mapSkillsFromAPI,
	mapPortfolioItemFromAPI,
} from "./mapper/profileMapper.js";

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
