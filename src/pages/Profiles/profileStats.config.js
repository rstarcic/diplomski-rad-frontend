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
			tone: "green",
		},
		jobsCompleted: {
			label: "Jobs completed",
			Icon: CheckCircleRoundedIcon,
			tone: "green",
		},
		activeJobs: {
			label: "Active jobs",
			Icon: AssignmentTurnedInRoundedIcon,
			tone: "orange",
		},
		averageResponseTime: {
			label: "Response time",
			Icon: AccessTimeFilledRoundedIcon,
			tone: "blue",
		},
	},

	contractor: {
		completedJobs: {
			label: "Completed jobs",
			Icon: CheckCircleRoundedIcon,
			tone: "green",
		},
		activeContracts: {
			label: "Active contracts",
			Icon: AssignmentTurnedInRoundedIcon,
			tone: "violet",
		},
		averageResponseTime: {
			label: "Response time",
			Icon: AccessTimeFilledRoundedIcon,
			tone: "orange",
		},
		profileStrength: {
			label: "Profile strength",
			Icon: CategoryRoundedIcon,
			tone: "violet",
		},
	},
};