import { api } from "./client.js";

import {
	mapBillingDetailsFromAPI,
	mapBillingDetailsToAPI,
	mapCheckoutSessionFromAPI,
	mapStripeOnboardingFromAPI,
	mapTransactionFromAPI,
} from "./mappers/payment.mapper.js";

export async function createStripeConnectAccount(billingDetails) {
	const { data } = await api.post("/payments/connect/onboarding", mapBillingDetailsToAPI(billingDetails));
	return mapStripeOnboardingFromAPI(data);
}

export async function getMyBillingDetails(signal) {
	const { data } = await api.get("/payments/status", { signal });
	return mapBillingDetailsFromAPI(data);
}

export async function createSetupSession(billingDetails) {
	const { data } = await api.post("/payments/setup-session", mapBillingDetailsToAPI(billingDetails));
	return mapCheckoutSessionFromAPI(data);
}

export async function createContractCheckoutSession(contractId) {
	const { data } = await api.post(`/payments/contracts/${contractId}/checkout-session`);
	return mapCheckoutSessionFromAPI(data);
}

export async function getMyPaymentStatus() {
	const { data } = await api.get("/payments/status");

	return {
		paymentCompleted: data.payment_setup_completed ?? false,
		payoutCompleted: data.payout_setup_completed ?? false,
	};
}

export async function getMyTransactions({ page = 1, pageSize = 10 } = {}, signal) {
	const { data } = await api.get("/payments/transactions", {
		params: {
			page,
			page_size: pageSize,
		},
		signal,
	});

	return {
		items: (data.items ?? []).map(mapTransactionFromAPI),
		page: data.page ?? page,
		pageSize: data.page_size ?? pageSize,
		total: data.total ?? 0,
		hasMore: data.has_more ?? false,
	};
}
