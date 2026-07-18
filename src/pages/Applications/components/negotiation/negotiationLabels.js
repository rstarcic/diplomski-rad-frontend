function capitalize(value = "") {
	return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";
}

export function getNegotiationUpdateLabel(update, index) {
	if (index === 0) {
		return `${capitalize(update?.submittedBy)} proposal`.trim();
	}

	return "Counter-offer";
}

export function getCurrentTermsTitle(updates, isEditing) {
	if (isEditing) return "Your proposed changes";
	if (!updates.length) return "Original job terms";

	const latestIndex = updates.length - 1;
	return getNegotiationUpdateLabel(updates[latestIndex], latestIndex);
}
