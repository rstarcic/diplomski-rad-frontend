const CLIENT_APPLICATION_TYPES = new Set([
	"application_received",
	"payment_updated",
	"payment_released",
	"contract_signature_required",
]);

const CONTRACTOR_APPLICATION_TYPES = new Set([
	"application_updated",
	"application_approved",
	"payment_updated",
	"payment_released",
	"contract_signature_required",
]);

function getClientItemPath(item) {
	if (item.type === "review_applications" && item.job_id) {
		return `/client/jobs/${item.job_id}/applications`;
	}

	if (
		CLIENT_APPLICATION_TYPES.has(item.type) &&
		item.job_id &&
		item.application_id
	) {
		return `/client/jobs/${item.job_id}/applications/${item.application_id}`;
	}

	if (item.type === "setup_payment") {
		return "/client/stripe";
	}

	return null;
}

function getContractorItemPath(item) {
	if (
		CONTRACTOR_APPLICATION_TYPES.has(item.type) &&
		item.application_id
	) {
		return `/contractor/applications/${item.application_id}`;
	}

	if (item.type === "applications_in_progress") {
		return "/contractor/applications";
	}

	if (item.type === "setup_payout") {
		return "/contractor/stripe";
	}

	return null;
}

export function getDashboardItemPath(item, role) {
	if (!item?.type) return null;

	if (role === "client") {
		return getClientItemPath(item);
	}

	if (role === "contractor") {
		return getContractorItemPath(item);
	}

	return null;
}