const ACTION_PRESENTATION = {
	review_applications: {
		title: "Review applications",
		ctaLabel: "Review",
	},
	setup_payment: {
		title: "Set up payments",
		ctaLabel: "Set up",
	},
	setup_payout: {
		title: "Set up payouts",
		ctaLabel: "Set up",
	},
	contract_signature_required: {
		title: "Review contract",
		ctaLabel: "Review",
	},
};

export function getActionPresentation(action = {}) {
	const presentation = ACTION_PRESENTATION[action.type];

	return {
		eyebrow: "Action required",
		title: presentation?.title ?? action.title ?? "Required action",
		ctaLabel: presentation?.ctaLabel ?? "Open",
	};
}