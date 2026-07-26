import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
export const profileStatCardConfig = {
	client: {
		jobsPosted: {
			label: "Jobs posted",
			Icon: WorkRoundedIcon,
			accent: "#0f766e",
		},
		jobsCompleted: {
			label: "Jobs completed",
			Icon: CheckCircleRoundedIcon,
			accent: "#16a34a",
		},
		activeJobs: {
			label: "Active jobs",
			Icon: AssignmentTurnedInRoundedIcon,
			accent: "#ea580c",
		},
		averageResponseTime: {
			label: "Response time",
			Icon: AccessTimeFilledRoundedIcon,
			accent: "#1d4ed8",
		},
	},
	contractor: {
		completedJobs: {
			label: "Completed jobs",
			Icon: CheckCircleRoundedIcon,
			accent: "#16a34a",
		},
		activeContracts: {
			label: "Active contracts",
			Icon: AssignmentTurnedInRoundedIcon,
			accent: "#0f766e",
		},
		averageResponseTime: {
			label: "Response time",
			Icon: AccessTimeFilledRoundedIcon,
			accent: "#ea580c",
		},
		profileStrength: {
			label: "Profile strength",
			Icon: CategoryRoundedIcon,
			accent: "#7c3aed",
		},
	},
};
