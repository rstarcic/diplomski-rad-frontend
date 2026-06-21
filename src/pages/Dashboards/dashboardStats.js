import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export const dashboardStatCardConfig = {
	client: {
		active_jobs: {
			label: "Active jobs",
			Icon: WorkOutlineRoundedIcon,
			accent: "#0f766e",
		},
		applications: {
			label: "Applications",
			Icon: MailOutlineRoundedIcon,
			accent: "#ea580c",
		},
		signed_contracts: {
			label: "Signed contracts",
			Icon: DrawRoundedIcon,
			accent: "#7c3aed",
		},
		hiring_spend: {
			label: "Hiring spend",
			Icon: PaymentsRoundedIcon,
			accent: "#1d4ed8",
		},
	},

	contractor: {
		active_contracts: {
			label: "Active contracts",
			Icon: AssignmentTurnedInRoundedIcon,
			accent: "#0f766e",
		},
		pending_payments: {
			label: "Pending payments",
			Icon: PaymentsRoundedIcon,
			accent: "#ea580c",
		},
		job_success: {
			label: "Job success",
			Icon: StarRoundedIcon,
			accent: "#f59e0b",
		},
		total_earnings: {
			label: "Total earnings",
			Icon: AccountBalanceWalletRoundedIcon,
			accent: "#1d4ed8",
		},
	},
};