export function mapStripeOnboardingFromAPI(data = {}) {
	return {
		onboardingUrl: data.onboarding_url ?? data.account_link_url ?? data.url ?? "",
	};
}

export function mapBillingDetailsFromAPI(data = {}) {
	return {
		address: data.billing_address ?? "",
		postalCode: data.billing_postal_code ?? "",
		countryCode: data.billing_country_code ?? "",
		cardBrand: data.card_brand ?? "",
		cardLast4: data.card_last4 ?? "",
		cardExpMonth: data.card_exp_month ?? null,
		cardExpYear: data.card_exp_year ?? null,
		verified: data.payment_setup_completed ?? false,
	};
}

export function mapBillingDetailsToAPI(billingDetails = {}) {
	return {
		address: billingDetails.address?.trim() ?? "",
		postal_code: billingDetails.postalCode?.trim() ?? "",
		country_code: billingDetails.countryCode?.trim().toUpperCase() ?? "",
	};
}

export function mapCheckoutSessionFromAPI(data = {}) {
	return {
		checkoutUrl: data.checkout_url ?? data.setup_url ?? data.url ?? "",
	};
}
