import { api } from "./client.js";
import {
	mapBillingDetailsFromAPI,
	mapBillingDetailsToAPI,
	mapCheckoutSessionFromAPI,
	mapStripeOnboardingFromAPI,
} from "./mapper/paymentMapper.js";

export async function createStripeConnectAccount(billingDetails) {
	const { data } = await api.post(
		"/payments/connect/onboarding",
		mapBillingDetailsToAPI(billingDetails),
	);
	return mapStripeOnboardingFromAPI(data);
}

export async function getMyBillingDetails() {
	const { data } = await api.get("/payments/status");
	return mapBillingDetailsFromAPI(data);
}

export async function createSetupSession(billingDetails) {
	const { data } = await api.post(
		"/payments/setup-session",
		mapBillingDetailsToAPI(billingDetails),
	);
	return mapCheckoutSessionFromAPI(data);
}

export async function createContractCheckoutSession(contractId) {
	const { data } = await api.post(`/payments/contracts/${contractId}/checkout-session`);
	return mapCheckoutSessionFromAPI(data);
}
