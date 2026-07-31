import { useState } from "react";
import { Box, Card, Stack, Typography } from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";

import { createStripeConnectAccount } from "../../api/payment.api";
import AppAlert from "../../components/ui/AppAlert";
import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PrimaryTextField from "../../components/ui/PrimaryTextField";
import { PAYMENT_ERRORS } from "../../constants/apiErrors";
import { useAuth } from "../../hooks/useAuth";
import { parseApiError } from "../../utils/parseApiError";
import { surfaceSectionSx } from "../../theme/layout";
import TransactionHistory from "./components/TransactionHistory";

export default function ContractorStripeSettingsPage() {
	const { accountSetup } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [billingDetails, setBillingDetails] = useState({
		address: "",
		postalCode: "",
		countryCode: "",
	});

	const updateField = (field) => (event) => {
		const value = field === "countryCode" ? event.target.value.toUpperCase().slice(0, 2) : event.target.value;
		setBillingDetails((current) => ({ ...current, [field]: value }));
	};

	const handleCreateAccount = async () => {
		if (!billingDetails.address.trim() || !billingDetails.postalCode.trim()) {
			setError("Address and postal code are required.");
			return;
		}

		if (!/^[A-Z]{2}$/.test(billingDetails.countryCode)) {
			setError("Country code must contain exactly two letters.");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const { onboardingUrl } = await createStripeConnectAccount(billingDetails);

			if (!onboardingUrl) {
				throw new Error("Stripe onboarding URL is missing.");
			}

			window.location.assign(onboardingUrl);
		} catch (err) {
			const apiError = parseApiError(
				err,
				PAYMENT_ERRORS,
				"We couldn't start Stripe account setup. Please try again later.",
			);
			setError(apiError.message);
		} finally {
			setLoading(false);
		}
	};

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

			{accountSetup.payoutCompleted !== true && (
				<Card elevation={0} sx={{ ...surfaceSectionSx, mt: 3 }}>
					<Stack spacing={2.5}>
						<AccountBalanceRoundedIcon color="primary" sx={{ fontSize: 40 }} />
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
									inputProps={{ maxLength: 2 }}
								/>
							</Stack>
						</Stack>
						<PrimaryButton
							onClick={handleCreateAccount}
							loading={loading}
							sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, minWidth: 220 }}
						>
							Create Stripe account
						</PrimaryButton>
					</Stack>
				</Card>
			)}

			<TransactionHistory />
		</Box>
	);
}
