import { Link, Typography } from "@mui/material";
import AppAlert from "../../components/ui/Alert";
import { ACCOUNT_SETUP_MESSAGES } from "../../constants/accountSetupMessages";

const getRequirementMessage = (accountSetup) => {
	const messages = ACCOUNT_SETUP_MESSAGES[accountSetup.role];
	if (!messages) {
		return null;
	}
	const isClient = accountSetup.role === "client";
	const isContractor = accountSetup.role === "contractor";
	const needsProfile = !accountSetup.profileCompleted;
	const needsPayment = isClient && !accountSetup.paymentCompleted;
	const needsPayout = isContractor && !accountSetup.payoutCompleted;

	if (needsProfile && needsPayment) {
		return messages.missingProfileAndPayment;
	}

	if (needsProfile && needsPayout) {
		return messages.missingProfileAndPayout;
	}

	if (needsProfile) {
		return messages.missingProfile;
	}

	if (needsPayment) {
		return messages.missingPayment;
	}

	if (needsPayout) {
		return messages.missingPayout;
	}

	return null;
};

export default function AccountSetupAlert({ accountSetup, actionName = "continue", settingsPath = "/settings", sx }) {
	const message = getRequirementMessage(accountSetup);

	return (
		<AppAlert severity="warning" sx={sx}>
			<Typography variant="body2">
				<strong>
					{message.title} to {actionName}.
				</strong>{" "}
				{message.description}{" "}
				<Link href={settingsPath} underline="hover" sx={{ fontWeight: 800 }}>
					Settings
				</Link>
				.
			</Typography>
		</AppAlert>
	);
}
