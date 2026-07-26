import { useEffect, useState } from "react";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import { useSearchParams } from "react-router-dom";

import { createSetupSession, getMyBillingDetails } from "../../api/paymentAPI";
import AppAlert from "../../components/ui/Alert";
import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PrimaryTextField from "../../components/ui/PrimaryTextField";
import { parseApiError } from "../../utils/parseApiError";
import {
	cardIconSx,
	cardFooterSx,
	cardLabelSx,
	cardLayerSx,
	cardNumberSx,
	editAddressButtonSx,
	loadingStateSx,
	paymentCardSx,
	settingsCardSx,
	verifiedBadgeSx,
	verifiedIconSx,
} from "./ClientPaymentSettingsPage.styles";

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

export default function ClientPaymentSettingsPage() {
	const [searchParams] = useSearchParams();
	const setupResult = searchParams.get("setup");
	const [details, setDetails] = useState(emptyDetails);
	const [loading, setLoading] = useState(true);
	const [redirecting, setRedirecting] = useState(false);
	const [editingAddress, setEditingAddress] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadDetails() {
			const attempts = setupResult === "success" ? 8 : 1;

			try {
				for (let attempt = 0; attempt < attempts; attempt += 1) {
					const data = await getMyBillingDetails();
					if (!active) return;

					setDetails((current) => ({ ...current, ...data }));
					if (data.verified || attempt === attempts - 1) return;

					await new Promise((resolve) => window.setTimeout(resolve, 1000));
				}
			} catch (err) {
				if (active) {
					setError(parseApiError(err, {}, "We couldn't load your Stripe details.").message);
				}
			} finally {
				if (active) setLoading(false);
			}
		}

		loadDetails();

		return () => {
			active = false;
		};
	}, [setupResult]);

	const updateField = (field) => (event) => {
		const value = field === "countryCode" ? event.target.value.toUpperCase().slice(0, 2) : event.target.value;
		setDetails((current) => ({ ...current, [field]: value }));
	};

	const openStripe = async () => {
		setRedirecting(true);
		setError("");

		try {
			const { checkoutUrl } = await createSetupSession(details);
			if (!checkoutUrl) throw new Error("Stripe setup URL is missing.");
			window.location.assign(checkoutUrl);
		} catch (err) {
			setError(parseApiError(err, {}, "We couldn't open Stripe. Please try again.").message);
			setRedirecting(false);
		}
	};

	const expiry = `${String(details.cardExpMonth ?? "").padStart(2, "0")}/${String(details.cardExpYear ?? "").slice(-2)}`;
	const cardBrand = (details.cardBrand || "Card").toUpperCase();
	const cardLast4 = details.cardLast4 || "••••";

	return (
		<Box>
			<PageHeader
				label="Settings"
				title="Stripe"
				subtitle="Manage the payment method and billing address used for client payments."
			/>

			{error && (
				<AppAlert severity="error" title="Stripe could not be opened" sx={{ mt: 3 }}>
					{error}
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
							<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
								<Typography variant="h6" fontWeight={800}>
									Payment method
								</Typography>
								{details.verified && (
									<Stack direction="row" spacing={0.6} alignItems="center" sx={verifiedBadgeSx}>
										<CheckCircleRoundedIcon sx={verifiedIconSx} />
										<Typography variant="caption" fontWeight={800}>
											Verified
										</Typography>
									</Stack>
								)}
							</Stack>
							<Box sx={paymentCardSx}>
								<Stack direction="row" justifyContent="space-between" alignItems="center" sx={cardLayerSx}>
									<CreditCardRoundedIcon sx={cardIconSx} />
								</Stack>
								<Typography sx={cardNumberSx}>
									•••• •••• •••• {cardLast4}
								</Typography>
								<Box sx={cardFooterSx}>
									<Stack spacing={0.2}>
										<Typography variant="caption" sx={cardLabelSx}>
											Payment method
										</Typography>
										<Typography variant="body2" fontWeight={700}>
											{cardBrand}
										</Typography>
									</Stack>
									<Stack spacing={0.2} alignItems="flex-end">
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
									<PrimaryTextField label="Address" value={details.address} onChange={updateField("address")} />
									<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
										<PrimaryTextField label="Postal code" value={details.postalCode} onChange={updateField("postalCode")} />
										<PrimaryTextField label="Country code" value={details.countryCode} onChange={updateField("countryCode")} />
									</Stack>
								</Stack>
							)}

							<PrimaryButton
								variant="outlined"
								onClick={() => {
									if (editingAddress) {
										openStripe();
										return;
									}

									setEditingAddress(true);
								}}
								disabled={redirecting}
								sx={editAddressButtonSx}
							>
								{editingAddress ? (redirecting ? "Opening Stripe..." : "Save billing details") : "Edit billing details"}
							</PrimaryButton>
						</Stack>
					</Stack>
				)}
			</Card>
		</Box>
	);
}
