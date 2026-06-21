import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

export const profileStatCardConfig = {
	client: {
		jobsPosted: {
			label: "Jobs posted",
			Icon: WorkOutlineRoundedIcon,
			accent: "#0f766e",
		},
		jobsCompleted: {
			label: "Jobs completed",
			Icon: CheckCircleOutlineRoundedIcon,
			accent: "#16a34a",
		},
		activeJobs: {
			label: "Active jobs",
			Icon: AssignmentTurnedInRoundedIcon,
			accent: "#ea580c",
		},
		preferredCategories: {
			label: "Preferred categories",
			Icon: CategoryOutlinedIcon,
			accent: "#7c3aed",
		},
		averageResponseTime: {
			label: "Response time",
			Icon: AccessTimeRoundedIcon,
			accent: "#1d4ed8",
		},
	},

	contractor: {
		completedJobs: {
			label: "Completed jobs",
			Icon: CheckCircleOutlineRoundedIcon,
			accent: "#16a34a",
		},
		activeContracts: {
			label: "Active contracts",
			Icon: AssignmentTurnedInRoundedIcon,
			accent: "#0f766e",
		},
		totalEarnings: {
			label: "Total earnings",
			Icon: AccountBalanceWalletRoundedIcon,
			accent: "#1d4ed8",
		},
		specialties: {
			label: "Specialties",
			Icon: CategoryOutlinedIcon,
			accent: "#7c3aed",
		},
		averageResponseTime: {
			label: "Response time",
			Icon: AccessTimeRoundedIcon,
			accent: "#ea580c",
		},
	},
};
