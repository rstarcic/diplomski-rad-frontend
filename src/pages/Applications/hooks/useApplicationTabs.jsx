import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

import ReviewForm from "../../../components/reviews/ReviewForm";
import ContractDetailsSection from "../components/contract/ContractDetailsSection";
import NegotiationSection from "../components/negotiation/NegotiationSection";
import PaymentsSection from "../components/payment/PaymentsSection";

export function useApplicationTabs({ negotiation, contract, payments, role = "client" }) {
	const negotiationAccepted = true; // negotiation?.status === "accepted" || (!negotiation && !!contract);
	const contractCompleted = true;
	//contract?.status === "completed";
	const paymentCompleted = true;
	//payments?.status == "paid";
	return [
		{
			label: "Negotiation",
			icon: <HandshakeRoundedIcon fontSize="small" />,
			locked: false,
			content: <NegotiationSection negotiation={negotiation} role={role} />,
		},
		{
			label: "Contract",
			icon: <GavelRoundedIcon fontSize="small" />,
			locked: !negotiationAccepted,
			lockReason: "Negotiation must be accepted before viewing the contract",
			content: <ContractDetailsSection contract={contract} role={role} />,
		},
		{
			label: "Payment",
			icon: <PaymentsOutlinedIcon fontSize="small" />,
			locked: !contractCompleted,
			lockReason: "Contract must be completed before viewing payments",
			content: <PaymentsSection payments={payments} />,
		},
		{
			label: "Review",
			icon: <RateReviewOutlinedIcon fontSize="small" />,
			locked: !paymentCompleted,
			lockReason: "Payment must be completed before leaving a review",
			content: (
				<ReviewForm
					type="contractor"
					title="Leave a review"
					subtitle="Share your experience working with this contractor."
				/>
			),
		},
	];
}
