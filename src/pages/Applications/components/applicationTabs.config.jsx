import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import ReviewForm from "../../../components/reviews/ReviewForm";
import { submitReview } from "../../../api/core.api";
import ContractDetailsSection from "./contract/ContractDetailsSection";
import NegotiationSection from "./negotiation/NegotiationSection";
import PaymentsSection from "./payment/PaymentsSection";

export function createApplicationTabs({
	application,
	job,
	negotiation,
	negotiationUpdates = [],
	contract,
	payment = null,
	role = "client",
	onAcceptNegotiation,
	onRejectNegotiation,
	onSubmitCounterOffer,
	onSignContract,
	canPay = false,
	paymentLoading = false,
	onPay,
}) {
	const reviewTarget = role === "client" ? "contractor" : "client";
	const applicationStatus = String(application?.status ?? "").trim().toLowerCase();
	const contractStatus = String(contract?.status ?? "").trim().toLowerCase();
	const paymentStatus = String(payment?.status ?? "").trim().toLowerCase();
	const applicationIsSelected = applicationStatus === "selected";
	const applicationAccepted = applicationStatus === "accepted";
	const hasContract = Boolean(contract);
	const contractCompleted = contractStatus === "completed";
	const paymentPaid = paymentStatus === "paid";
	const showNegotiation = applicationIsSelected || Boolean(negotiation);
	const negotiationStatus =
		negotiation?.status ??
		(applicationIsSelected ? "pendingContractor" : "");
	const initialOffer = job
		? {
				budgetAmount: job.budgetAmount,
				budgetType: job.budgetType,
				currency: job.currency,
				hoursPerWeek: job.hoursPerWeek,
				duration: job.durationDays,
				deliverables: job.deliverables,
				message: "",
			}
		: null;

	return [
		{
			label: "Negotiation",
			icon: <HandshakeRoundedIcon fontSize="small" />,
			locked: applicationAccepted,
			lockReason: applicationAccepted
				? "Negotiation is no longer available after the terms are accepted."
				: undefined,
			content: (
				<NegotiationSection
					initialOffer={initialOffer}
					status={negotiationStatus}
					updates={negotiationUpdates}
					role={role}
					onAcceptNegotiation={onAcceptNegotiation}
					onRejectNegotiation={onRejectNegotiation}
					onSubmitCounterOffer={onSubmitCounterOffer}
				/>
			),
		},
		{
			label: "Contract",
			icon: <GavelRoundedIcon fontSize="small" />,
			locked: !hasContract,
			lockReason: !hasContract
				? "The contract becomes available after the terms are accepted."
				: undefined,
			content: (
				<ContractDetailsSection
					contract={contract}
					job={job}
					role={role}
					onSignContract={onSignContract}
				/>
			),
		},
		{
			label: "Payment",
			icon: <PaymentsOutlinedIcon fontSize="small" />,
			locked: !contractCompleted,
			lockReason: !contractCompleted
				? "Payment becomes available after the contract is completed."
				: undefined,
			content: (
				<PaymentsSection
					payment={payment}
					contract={contract}
					role={role}
					canPay={role === "client" && canPay}
					paymentLoading={paymentLoading}
					onPay={onPay}
				/>
			),
		},
		{
			label: "Review",
			icon: <RateReviewOutlinedIcon fontSize="small" />,
			locked: !paymentPaid,
			lockReason: !paymentPaid
				? "A review becomes available after the payment is completed."
				: undefined,
			content: (
				<ReviewForm
					type={reviewTarget}
					title="Leave a review"
					subtitle={`Share your experience working with this ${reviewTarget}.`}
					onSubmit={(review) => submitReview(job.id, review)}
				/>
			),
		},
	].filter((tab) => tab.label !== "Negotiation" || showNegotiation);
}
