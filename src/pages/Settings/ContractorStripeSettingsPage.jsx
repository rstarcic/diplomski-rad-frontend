import { useState } from "react";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { Box, Card, Stack, Typography } from "@mui/material";

import { createStripeConnectAccount } from "../../api/payment.api";
import AppAlert from "../../components/ui/AppAlert";
import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PrimaryTextField from "../../components/ui/PrimaryTextField";
import { PAYMENT_ERRORS } from "../../constants/apiErrors";
import { useAuth } from "../../hooks/useAuth";
import { surfaceSectionSx } from "../../theme/layout";
import { parseApiError } from "../../utils/parseApiError";

import TransactionHistory from "./components/TransactionHistory";

const INITIAL_BILLING_DETAILS = {
	address: "",
	postalCode: "",
	countryCode: "",
};

const STRIPE_SETUP_ERROR_MESSAGE = "We couldn't start Stripe account setup. Please try again later.";

const stripeAccountCardSx = {
	...surfaceSectionSx,
	mt: 3,
};

const stripeIconSx = {
	fontSize: 40,
};

const createAccountButtonSx = {
	alignSelf: { xs: "stretch", sm: "flex-start" },
	minWidth: 220,
};

function validateBillingDetails({ address, postalCode, countryCode }) {
	if (!address.trim() || !postalCode.trim()) {
		return "Address and postal code are required.";
	}

	if (!/^[A-Z]{2}$/.test(countryCode)) {
		return "Country code must contain exactly two letters.";
	}

	return "";
}

export default function ContractorStripeSettingsPage() {
	const { accountSetup } = useAuth();

	const [billingDetails, setBillingDetails] = useState(INITIAL_BILLING_DETAILS);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const updateField = (field) => (event) => {
		const { value } = event.target;
		const nextValue = field === "countryCode" ? value.toUpperCase().slice(0, 2) : value;

		setBillingDetails((current) => ({
			...current,
			[field]: nextValue,
		}));
	};

	const handleCreateAccount = async () => {
		const validationError = validateBillingDetails(billingDetails);

		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			setLoading(true);
			setError("");

			const { onboardingUrl } = await createStripeConnectAccount(billingDetails);

			if (!onboardingUrl) {
				setError(STRIPE_SETUP_ERROR_MESSAGE);
				return;
			}

			window.location.assign(onboardingUrl);
		} catch (error) {
			const apiError = parseApiError(error, PAYMENT_ERRORS, STRIPE_SETUP_ERROR_MESSAGE);

			setError(apiError.message);
		} finally {
			setLoading(false);
		}
	};

	const payoutSetupCompleted = accountSetup?.payoutCompleted === true;

	return (
		<Box>
			<PageHeader
				label="Settings"
				title="Stripe payouts"
				subtitle="Create or connect your Stripe account to receive payments for completed work."
			/>

			{error && (
				<AppAlert severity="error" title="Stripe setup could not be started" sx={{ mt: 3 }}>
					{error}
				</AppAlert>
			)}

			{!payoutSetupCompleted && (
				<Card elevation={0} sx={stripeAccountCardSx}>
					<Stack spacing={2.5}>
						<AccountBalanceRoundedIcon color="primary" sx={stripeIconSx} />

						<Stack spacing={0.75}>
							<Typography variant="h6" fontWeight={800}>
								Stripe account
							</Typography>

							<Typography variant="body2" color="text.secondary">
								Stripe will guide you through secure identity verification and payout account setup.
							</Typography>
						</Stack>

						<Stack spacing={2}>
							<Typography variant="subtitle1" fontWeight={800}>
								Private information
							</Typography>

							<Typography variant="body2" color="text.secondary">
								These details are used securely for payouts and won&apos;t be visible to other users.
							</Typography>

							<PrimaryTextField
								required
								label="Address"
								value={billingDetails.address}
								onChange={updateField("address")}
								autoComplete="street-address"
							/>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
								<PrimaryTextField
									required
									label="Postal code"
									value={billingDetails.postalCode}
									onChange={updateField("postalCode")}
									autoComplete="postal-code"
								/>

								<PrimaryTextField
									required
									label="Country code"
									value={billingDetails.countryCode}
									onChange={updateField("countryCode")}
									autoComplete="country"
									slotProps={{
										htmlInput: {
											maxLength: 2,
										},
									}}
								/>
							</Stack>
						</Stack>

						<PrimaryButton onClick={handleCreateAccount} loading={loading} sx={createAccountButtonSx}>
							Create Stripe account
						</PrimaryButton>
					</Stack>
				</Card>
			)}

			<TransactionHistory />
		</Box>
	);
}
