import { Box, Stack } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import NextStepsCard from "./components/NextStepsCard";
import RecentActivity from "./components/RecentActivity";
import DashboardStatsSection from "./components/DashboardStatsSection";

import { dashboardStatCardConfig } from "./dashboardStats";
import { clientDashboardData } from "../../mock/Dashboard";
import pageSx from "../../theme/layout";

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

			<DashboardStatsSection stats={dashboardData.stats_cards} config={dashboardStatCardConfig.client} />

			<Box sx={contentGridSx}>
				<RecentActivity activities={dashboardData.recent_activity} />
				<NextStepsCard actions={dashboardData.pending_actions} />
			</Box>
		</Box>
	);
}
