import { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { createSetupSession, getMyBillingDetails } from "../../api/payment.api";
import AppAlert from "../../components/ui/AppAlert";
import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PrimaryTextField from "../../components/ui/PrimaryTextField";
import SecondaryButton from "../../components/ui/SecondaryButton";
import { PAYMENT_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";

import {
	cardFooterSx,
	cardIconSx,
	cardLabelSx,
	cardLayerSx,
	cardNumberSx,
	editAddressButtonSx,
	expiryDetailsSx,
	loadingStateSx,
	paymentCardSx,
	paymentHeadingRowSx,
	settingsCardSx,
	verifiedBadgeSx,
	verifiedIconSx,
} from "./ClientPaymentSettingsPage.styles";
import TransactionHistory from "./components/TransactionHistory";

const LOAD_ERROR_MESSAGE = "We couldn't load your payment details.";
const STRIPE_ERROR_MESSAGE = "We couldn't open Stripe. Please try again.";

const emptyDetails = {
	address: "",
	postalCode: "",
	city: "",
	country: "",
	countryCode: "",
	cardBrand: "",
	cardLast4: "",
	cardExpMonth: null,
	cardExpYear: null,
	verified: false,
};

function isCanceledRequest(error) {
	return error.name === "CanceledError" || error.name === "AbortError";
}

function getBillingActionLabel({ editingAddress, redirecting, verified }) {
	if (redirecting) return "Opening Stripe...";
	if (editingAddress) return "Save billing details";

	return verified ? "Edit billing details" : "Add payment method";
}

export default function ClientPaymentSettingsPage() {
	const [searchParams] = useSearchParams();
	const setupResult = searchParams.get("setup");
	const [details, setDetails] = useState(emptyDetails);
	const [loading, setLoading] = useState(true);
	const [redirecting, setRedirecting] = useState(false);
	const [editingAddress, setEditingAddress] = useState(false);
	const [loadError, setLoadError] = useState("");
	const [stripeError, setStripeError] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		let active = true;

		async function loadDetails() {
			const attempts = setupResult === "success" ? 8 : 1;
			setLoadError("");

			try {
				for (let attempt = 0; attempt < attempts; attempt += 1) {
					const data = await getMyBillingDetails(controller.signal);
					if (!active) return;

					setDetails((current) => ({ ...current, ...data }));

					if (data.verified || attempt === attempts - 1) return;

					await new Promise((resolve) => window.setTimeout(resolve, 1000));
				}
			} catch (error) {
				if (!active || isCanceledRequest(error)) return;

				if (error.response?.status === 404) {
					setDetails(emptyDetails);
				} else {
					setLoadError(parseApiError(error, PAYMENT_ERRORS, LOAD_ERROR_MESSAGE).message);
				}
			} finally {
				if (active) {
					setLoading(false);
				}
			}
		}

		loadDetails();

		return () => {
			active = false;
			controller.abort();
		};
	}, [setupResult]);

	const updateField = (field) => (event) => {
		const value =
			field === "countryCode" ? event.target.value.toUpperCase().slice(0, 2) : event.target.value;

		setDetails((current) => ({
			...current,
			[field]: value,
		}));
	};

	const openStripe = async () => {
		setRedirecting(true);
		setStripeError("");

		try {
			const { checkoutUrl } = await createSetupSession(details);

			if (!checkoutUrl) {
				throw new Error("Stripe setup URL is missing.");
			}

			window.location.assign(checkoutUrl);
		} catch (error) {
			setStripeError(parseApiError(error, PAYMENT_ERRORS, STRIPE_ERROR_MESSAGE).message);
			setRedirecting(false);
		}
	};

	const handleBillingAction = () => {
		if (editingAddress) {
			openStripe();
			return;
		}

		setEditingAddress(true);
	};

	const expiry = `${String(details.cardExpMonth ?? "").padStart(2, "0")}/${String(
		details.cardExpYear ?? "",
	).slice(-2)}`;
	const cardBrand = (details.cardBrand || "Card").toUpperCase();
	const cardLast4 = details.cardLast4 || "••••";
	const BillingActionButton = editingAddress || !details.verified ? PrimaryButton : SecondaryButton;
	const billingActionLabel = getBillingActionLabel({
		editingAddress,
		redirecting,
		verified: details.verified,
	});

	return (
		<Box>
			<PageHeader
				label="Settings"
				title="Stripe"
				subtitle="Manage the payment method and billing address used for client payments."
			/>

			{loadError && (
				<AppAlert severity="error" title="Payment details could not be loaded" sx={{ mt: 3 }}>
					{loadError}
				</AppAlert>
			)}

			{stripeError && (
				<AppAlert severity="error" title="Stripe could not be opened" sx={{ mt: 3 }}>
					{stripeError}
				</AppAlert>
			)}

			{setupResult === "success" && details.verified && (
				<AppAlert severity="success" title="Payment method saved" sx={{ mt: 3 }}>
					Your card details have been updated successfully.
				</AppAlert>
			)}

			{setupResult === "cancelled" && (
				<AppAlert severity="info" title="Stripe setup cancelled" sx={{ mt: 3 }}>
					Your payment method was not changed.
				</AppAlert>
			)}

			<Card elevation={0} sx={settingsCardSx}>
				{loading ? (
					<Box sx={loadingStateSx}>
						<CircularProgress size={28} />
					</Box>
				) : (
					<Stack spacing={3}>
						<Stack spacing={2}>
							<Stack direction="row" spacing={2} sx={paymentHeadingRowSx}>
								<Typography variant="h6" fontWeight={800}>
									Payment method
								</Typography>

								{details.verified && (
									<Stack direction="row" spacing={0.6} sx={verifiedBadgeSx}>
										<CheckCircleRoundedIcon sx={verifiedIconSx} />
										<Typography variant="caption" fontWeight={800}>
											Verified
										</Typography>
									</Stack>
								)}
							</Stack>

							<Box sx={paymentCardSx}>
								<Stack direction="row" sx={cardLayerSx}>
									<CreditCardRoundedIcon sx={cardIconSx} />
								</Stack>

								<Typography sx={cardNumberSx}>•••• •••• •••• {cardLast4}</Typography>

								<Box sx={cardFooterSx}>
									<Stack spacing={0.2}>
										<Typography variant="caption" sx={cardLabelSx}>
											Payment method
										</Typography>
										<Typography variant="body2" fontWeight={700}>
											{cardBrand}
										</Typography>
									</Stack>

									<Stack spacing={0.2} sx={expiryDetailsSx}>
										<Typography variant="caption" sx={cardLabelSx}>
											Expires
										</Typography>
										<Typography variant="body2" fontWeight={700}>
											{details.cardExpMonth && details.cardExpYear ? expiry : "—/—"}
										</Typography>
									</Stack>
								</Box>
							</Box>
						</Stack>

						<Stack spacing={2}>
							{editingAddress && (
								<Stack spacing={2}>
									<PrimaryTextField
										label="Address"
										value={details.address}
										onChange={updateField("address")}
									/>

									<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
										<PrimaryTextField
											label="Postal code"
											value={details.postalCode}
											onChange={updateField("postalCode")}
										/>

										<PrimaryTextField
											label="Country code"
											value={details.countryCode}
											onChange={updateField("countryCode")}
										/>
									</Stack>
								</Stack>
							)}

							<BillingActionButton
								onClick={handleBillingAction}
								disabled={redirecting}
								sx={editAddressButtonSx}
							>
								{billingActionLabel}
							</BillingActionButton>
						</Stack>
					</Stack>
				)}
			</Card>

			<TransactionHistory />
		</Box>
	);
}
