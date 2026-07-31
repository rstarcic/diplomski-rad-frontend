import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";

export const dashboardStatCardConfig = {
	client: {
		active_jobs: {
			label: "Active jobs",
			Icon: WorkOutlineRoundedIcon,
			tone: "green",
		},
		applications: {
			label: "Applications",
			Icon: MailOutlineRoundedIcon,
			tone: "orange",
		},
		signed_contracts: {
			label: "Signed contracts",
			Icon: DrawRoundedIcon,
			tone: "violet",
		},
		hiring_spend: {
			label: "Hiring spend",
			Icon: PaymentsRoundedIcon,
			tone: "blue",
		},
	},

	contractor: {
		active_contracts: {
			label: "Active contracts",
			Icon: AssignmentTurnedInRoundedIcon,
			tone: "green",
		},
		pending_payments: {
			label: "Pending payments",
			Icon: PaymentsRoundedIcon,
			tone: "orange",
		},
		job_success: {
			label: "Job success",
			Icon: StarRoundedIcon,
			tone: "rating",
		},
		total_earnings: {
			label: "Total earnings",
			Icon: AccountBalanceWalletRoundedIcon,
			tone: "blue",
		},
	},
};
