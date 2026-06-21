export const REQUIRED_PROFILE_FIELDS = [
	{ key: "firstName", label: "First name" },
	{ key: "lastName", label: "Last name" },
	{ key: "email", label: "Email" },
	{ key: "phone", label: "Phone" },
	{ key: "country", label: "Country" },
	{ key: "city", label: "City" },
	{ key: "about", label: "About you" },
	{ key: "image", label: "Image" },
];

const hasValue = (value) =>
	typeof value === "string" ? value.trim().length > 0 : Boolean(value);

export function getProfileCompletion(
	profileData = {},
	requiredFields = REQUIRED_PROFILE_FIELDS,
) {
	const missingFields = requiredFields.filter(
		({ key }) => !hasValue(profileData[key]),
	);

	const totalCount = requiredFields.length;
	const completedCount = totalCount - missingFields.length;

	return {
		completedCount,
		totalCount,
		completionPercent: totalCount
			? Math.round((completedCount / totalCount) * 100)
			: 0,
		isComplete: missingFields.length === 0,
		missingFields,
	};
}
