import { Box, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";

import PageHeader from "../../components/PageHeader";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import NextStepsCard from "./components/NextStepsCard";
import RecentActivity from "./components/RecentActivity";
import StatsCard from "./components/StatsCard";

import { clientDashboardData } from "../../mock/Dashboard";

const clientStatCardConfig = {
	active_jobs: {
		icon: <WorkOutlineRoundedIcon />,
		accent: "#0f766e",
	},
	applications: {
		icon: <MailOutlineRoundedIcon />,
		accent: "#ea580c",
	},
	signed_contracts: {
		icon: <DrawRoundedIcon />,
		accent: "#7c3aed",
	},
	hiring_spend: {
		icon: <PaymentsRoundedIcon />,
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

export default function ClientDashboardPage() {
	const dashboardData = clientDashboardData;

	return (
		<Box sx={pageSx}>
			<PageHeader
				label="Client Dashboard"
				title="Welcome back"
				subtitle="Track your active job ads, monitor contracts, and keep hiring moving from one focused workspace."
			>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ width: { xs: "100%", sm: "auto" } }}>
					<PrimaryButton variant="contained" color="primary" sx={{ width: { xs: "100%", sm: "auto" } }}>
						View My Jobs
					</PrimaryButton>
					<SecondaryButton
						variant="contained"
						color="secondary"
						startIcon={<AddCircleOutlineIcon />}
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						Create Job
					</SecondaryButton>
				</Stack>
			</PageHeader>

			<Box sx={statsGridSx}>
				{dashboardData.stats_cards.map((stat) => {
					const config = clientStatCardConfig[stat.id];
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
