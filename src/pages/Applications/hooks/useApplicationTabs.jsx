import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import ReviewForm from "../../../components/reviews/ReviewForm";
import ContractDetailsSection from "../components/contract/ContractDetailsSection";
import NegotiationSection from "../components/negotiation/NegotiationSection";
import PaymentsSection from "../components/payment/PaymentsSection";

const REJECTED_APPLICATION_STATUSES = ["incomplete", "cancelled", "rejected", "withdrawn"];
const ACTIVE_CONTRACT_STATUSES = ["created", "pendingClient", "pendingContractor", "signedByBoth", "completed"];

export function getDerivedNegotiationStatus({ negotiation, application, contract }) {
	const applicationStatus = application?.status;
	const contractStatus = contract?.status;

	if (REJECTED_APPLICATION_STATUSES.includes(applicationStatus)) {
		return "rejected";
	}

	if (applicationStatus === "accepted" || ACTIVE_CONTRACT_STATUSES.includes(contractStatus)) return "accepted";

	return negotiation?.status ?? null;
}

export function getApplicationWorkflowState({ application, negotiation, contract, payments = [] }) {
	const applicationStatus = application?.status;
	const contractStatus = contract?.status;
	const negotiationStatus = getDerivedNegotiationStatus({ negotiation, application, contract });
	const applicationRejected = REJECTED_APPLICATION_STATUSES.includes(applicationStatus);
	const contractCreated = Boolean(contract) || applicationStatus === "accepted";
	const contractSigned = contractStatus === "signedByBoth" || contractStatus === "completed";
	const contractCompleted = contractStatus === "completed";
	const paymentCompleted = payments.some((payment) => payment.status === "paid");

	return {
		applicationRejected,
		negotiationStatus,
		negotiationAccepted: negotiationStatus === "accepted",
		contractCreated,
		contractSigned,
		contractCompleted,
		paymentCompleted,
	};
}

export function useApplicationTabs({
	application,
	negotiation,
	negotiationUpdates = [],
	contract,
	payments = [],
	role = "client",
	onAcceptNegotiation,
}) {
	const workflow = getApplicationWorkflowState({ application, negotiation, contract, payments });

	const reviewTarget = role === "client" ? "contractor" : "client";

	return [
		{
			label: "Negotiation",
			icon: <HandshakeRoundedIcon fontSize="small" />,
			locked: false,
			content: (
				<NegotiationSection
					negotiation={negotiation}
					status={workflow.negotiationStatus}
					updates={negotiationUpdates}
					role={role}
					onAcceptNegotiation={onAcceptNegotiation}
				/>
			),
		},
		{
			label: "Contract",
			icon: <GavelRoundedIcon fontSize="small" />,
			locked: workflow.applicationRejected || !workflow.contractCreated,
			lockReason: workflow.applicationRejected
				? "This application is no longer active."
				: "Negotiation must be accepted before viewing the contract.",
			content: <ContractDetailsSection contract={contract} role={role} />,
		},
		{
			label: "Payment",
			icon: <PaymentsOutlinedIcon fontSize="small" />,
			locked: !workflow.contractSigned,
			lockReason: "Contract must be signed by both parties before viewing payments.",
			content: <PaymentsSection payments={payments} />,
		},
		{
			label: "Review",
			icon: <RateReviewOutlinedIcon fontSize="small" />,
			locked: !workflow.paymentCompleted,
			lockReason: "Payment must be completed before leaving a review.",
			content: (
				<ReviewForm
					type={reviewTarget}
					title="Leave a review"
					subtitle={`Share your experience working with this ${reviewTarget}.`}
				/>
			),
		},
	];
}
