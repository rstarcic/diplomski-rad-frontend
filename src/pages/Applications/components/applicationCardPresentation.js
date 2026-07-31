import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

export const applicationCardPresentation = {
	pending: {
		color: "#d97706",
		background: "linear-gradient(110deg, #fffbeb, #fff7e6)",
		avatar: "linear-gradient(145deg, #fff7df, #ffedbd)",
		border: "#fde4a7",
		Icon: InfoOutlinedIcon,
		message: "This application is waiting for your decision.",
		action: "Review application",
	},
	selected: {
		color: "#155eef",
		background: "linear-gradient(110deg, #eff6ff, #eaf2ff)",
		avatar: "linear-gradient(145deg, #eff6ff, #dbeafe)",
		border: "#cfe0ff",
		Icon: HandshakeOutlinedIcon,
		message: "Waiting for contractor response",
		detail: "The contractor can accept, decline or send a counter-offer.",
		action: "View selection",
	},
	accepted: {
		color: "#07883f",
		background: "linear-gradient(110deg, #ecfdf5, #e4f8ef)",
		avatar: "linear-gradient(145deg, #ecfdf5, #d1fae5)",
		border: "#c9efdd",
		Icon: CheckCircleRoundedIcon,
		message: "Offer accepted",
		detail: "The contractor accepted your offer. You can now create the contract.",
		action: "Create contract",
	},
	rejected: {
		color: "#ef233c",
		background: "linear-gradient(110deg, #fff1f2, #fff5f5)",
		avatar: "linear-gradient(145deg, #fff1f2, #ffe2e5)",
		border: "#ffd0d6",
		Icon: CancelOutlinedIcon,
		message: "Application rejected",
		detail: "You rejected this application.",
		action: "View details",
	},
	withdrawn: {
		color: "#536483",
		background: "linear-gradient(110deg, #f3f6fa, #f7f8fb)",
		avatar: "linear-gradient(145deg, #f1f5f9, #e2e8f0)",
		border: "#dfe5ee",
		Icon: BlockRoundedIcon,
		message: "Application withdrawn",
		detail: "The contractor withdrew their application.",
		action: null,
	},
};
