import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import ReviewForm from "../../../components/reviews/ReviewForm";
import ContractDetailsSection from "../components/contract/ContractDetailsSection";
import NegotiationSection from "../components/negotiation/NegotiationSection";
import PaymentsSection from "../components/payment/PaymentsSection";

export function useApplicationTabs({
	application,
	job,
	negotiation,
	negotiationUpdates = [],
	contract,
	payments = [],
	role = "client",
	onAcceptNegotiation,
	onRejectNegotiation,
	onSubmitCounterOffer,
	onSignContract,
}) {
	const reviewTarget = role === "client" ? "contractor" : "client";
	const applicationIsSelected = String(application?.status).toLowerCase() === "selected";
	const showNegotiation = applicationIsSelected || Boolean(negotiation);
	const negotiationStatus = negotiation?.status ?? (applicationIsSelected ? "pendingContractor" : "");
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
			locked: false,
			content: (
				<NegotiationSection
					initialOffer={initialOffer}
					negotiation={negotiation}
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
			locked: false,
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
			locked: false,
			content: <PaymentsSection payments={payments} />,
		},
		{
			label: "Review",
			icon: <RateReviewOutlinedIcon fontSize="small" />,
			locked: false,
			content: (
				<ReviewForm
					type={reviewTarget}
					title="Leave a review"
					subtitle={`Share your experience working with this ${reviewTarget}.`}
				/>
			),
		},
	].filter((tab) => tab.label !== "Negotiation" || showNegotiation);
}
