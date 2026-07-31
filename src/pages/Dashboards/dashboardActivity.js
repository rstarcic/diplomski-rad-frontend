import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

const ACTIVITY_VISUALS = {
	payment: {
		Icon: AccountBalanceWalletRoundedIcon,
		tone: "violet",
	},
	application: {
		Icon: AssignmentIndRoundedIcon,
		tone: "violet",
	},
	contract: {
		Icon: DescriptionRoundedIcon,
		tone: "green",
	},
	job: {
		Icon: WorkRoundedIcon,
		tone: "blue",
	},
	review: {
		Icon: StarRoundedIcon,
		tone: "orange",
	},
	default: {
		Icon: NotificationsNoneRoundedIcon,
		tone: "blue",
	},
};

const TYPE_CATEGORIES = {
	setup_payment: "payment",
	setup_payout: "payment",
	review_applications: "application",
	applications_in_progress: "application",
};

export function getActivityVisual(type = "") {
	const explicitCategory = TYPE_CATEGORIES[type];

	if (explicitCategory) {
		return ACTIVITY_VISUALS[explicitCategory];
	}

	const prefix = Object.keys(ACTIVITY_VISUALS).find(
		(category) =>
			category !== "default" &&
			type.startsWith(category),
	);

	return ACTIVITY_VISUALS[prefix] ?? ACTIVITY_VISUALS.default;
}