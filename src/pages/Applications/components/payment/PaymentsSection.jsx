import { Card, Divider, Stack, Typography } from "@mui/material";

import AppAlert from "../../../../components/ui/Alert";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import StatusChip from "../../../../components/ui/StatusChip";
import { PAYMENT_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { formatCurrency, formatDate } from "../../../../utils/formatters";
import { findStatusKey } from "../../../../utils/jobs";
import { detailsGridSx, headerSx, payButtonSx } from "./PaymentsSection.styles";

export default function PaymentsSection({
	payment,
	contract,
	role = "client",
	canPay = false,
	paymentLoading = false,
	onPay,
}) {
	if (!payment) {
		return (
			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2} sx={headerSx}>
						<Typography variant="h6" sx={sectionTitleSx}>
							Payment
						</Typography>
						{contract?.budgetAmount != null && (
							<Typography variant="h6" fontWeight={800}>
								{formatCurrency(contract.budgetAmount, contract.currency)}
							</Typography>
						)}
					</Stack>
					<Typography variant="body2" color="text.secondary">
						{role === "client"
							? "Payment will become available when the work is ready for client payment."
							: "No payment has been recorded yet. The client will complete payment after approving the work."}
					</Typography>
				</Stack>
			</Card>
		);
	}

	const statusKey = findStatusKey(payment.status, PAYMENT_STATUSES);

	return (
		<Stack spacing={2}>
			{statusKey === "overdue" && (
				<AppAlert severity="error" title="Payment overdue">
					The payment deadline has passed. Please complete the payment as soon as possible or contact the other party.
				</AppAlert>
			)}

			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2} sx={headerSx}>
						<Typography variant="h6" sx={sectionTitleSx}>
							Payment
						</Typography>
						{statusKey && <StatusChip status={statusKey} config={PAYMENT_STATUSES} />}
					</Stack>

					<Divider />

					<Stack sx={detailsGridSx}>
						<Stack spacing={0.25}>
							<Typography variant="caption" color="text.secondary">
								Amount
							</Typography>
							<Typography variant="body2" fontWeight={700}>
								{formatCurrency(payment.amount, payment.currency)}
							</Typography>
						</Stack>

						{payment.createdAt && (
							<Stack spacing={0.25}>
								<Typography variant="caption" color="text.secondary">
									Created
								</Typography>
								<Typography variant="body2" fontWeight={700}>
									{formatDate(payment.createdAt)}
								</Typography>
							</Stack>
						)}

						{payment.updatedAt && (
							<Stack spacing={0.25}>
								<Typography variant="caption" color="text.secondary">
									Last updated
								</Typography>
								<Typography variant="body2" fontWeight={700}>
									{formatDate(payment.updatedAt)}
								</Typography>
							</Stack>
						)}
					</Stack>

					{canPay && statusKey === "pending" && (
						<PrimaryButton
							onClick={() => onPay?.(payment)}
							loading={paymentLoading}
							disabled={paymentLoading}
							sx={payButtonSx}
						>
							{paymentLoading ? "Opening Stripe..." : "Pay"}
						</PrimaryButton>
					)}
				</Stack>
			</Card>
		</Stack>
	);
}
