import { REQUIRED_PROFILE_FIELDS } from "./profileFields.config";

const hasValue = (value) => (typeof value === "string" ? value.trim().length > 0 : Boolean(value));

export function getProfileCompletion(profileData = {}, requiredFields = REQUIRED_PROFILE_FIELDS) {
	const missingFields = requiredFields.filter(({ key }) => !hasValue(profileData[key]));

	const totalCount = requiredFields.length;
	const completedCount = totalCount - missingFields.length;
	const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
	return {
		completedCount,
		totalCount,
		completionPercent,
		isComplete: missingFields.length === 0,
		missingFields,
	};
}
