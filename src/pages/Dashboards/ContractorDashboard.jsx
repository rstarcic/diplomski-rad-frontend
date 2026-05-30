import { Box, Stack } from "@mui/material";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";

import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import NextStepsCard from "./components/NextStepsCard";
import RecentActivity from "./components/RecentActivity";
import StatsCard from "./components/StatsCard";

import { contractorDashboardData } from "../../mock/Dashboard";

const contractorStatCardConfig = {
	active_contracts: {
		icon: <AssignmentTurnedInRoundedIcon />,
		accent: "#0f766e",
	},
	pending_payments: {
		icon: <PaymentsRoundedIcon />,
		accent: "#ea580c",
	},
	job_success: {
		icon: <StarRoundedIcon />,
		accent: "#f59e0b",
	},
	total_earnings: {
		icon: <AccountBalanceWalletRoundedIcon />,
		accent: "#1d4ed8",
	},
};

const pageSx = {
	width: "100%",
	maxWidth: "1440px",
	mx: "auto",
	px: { xs: 0, md: 1 },
	pb: { xs: 3, md: 5 },
};

const statsGridSx = {
	mt: { xs: 2, md: 3.5 },
	display: "grid",
	gridTemplateColumns: {
		xs: "1fr",
		sm: "repeat(2, minmax(0, 1fr))",
		lg: "repeat(4, minmax(0, 1fr))",
	},
	gap: { xs: 1.25, sm: 2, md: 2.5 },
};

const contentGridSx = {
	mt: { xs: 2, md: 3.5 },
	display: "grid",
	gap: { xs: 1.5, md: 2.5 },
	alignItems: "start",
};

export default function ContractorDashboardPage() {
	const dashboardData = contractorDashboardData;

	return (
		<Box sx={pageSx}>
			<PageHeader
				label="Contractor Dashboard"
				title="Welcome back"
				subtitle="Track your active contracts, payments, client feedback, and upcoming work from one focused workspace."
			>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ width: { xs: "100%", sm: "auto" } }}>
					<PrimaryButton variant="contained" color="primary" sx={{ width: { xs: "100%", sm: "auto" } }}>
						Find Jobs
					</PrimaryButton>
					<SecondaryButton
						variant="contained"
						color="secondary"
						startIcon={<StickyNote2RoundedIcon />}
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						View Applications
					</SecondaryButton>
				</Stack>
			</PageHeader>

			<Box sx={statsGridSx}>
				{dashboardData.stats_cards.map((stat) => {
					const config = contractorStatCardConfig[stat.id];
					return (
						<Box key={stat.id}>
							<StatsCard
								label={stat.title}
								value={stat.value}
								subtitle={stat.subtitle}
								icon={config?.icon}
								accent={config?.accent}
							/>
						</Box>
					);
				})}
			</Box>

			<Box sx={contentGridSx}>
				<RecentActivity activities={dashboardData.recent_activity} />
				<NextStepsCard actions={dashboardData.pending_actions} />
			</Box>
		</Box>
	);
}
