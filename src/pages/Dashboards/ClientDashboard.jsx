import { Box, Stack } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Link as RouterLink } from "react-router-dom";

import AppAlert from "../../components/ui/AppAlert";
import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";

import DashboardStatsSection from "./components/DashboardStatsSection";
import NextStepsCard from "./components/NextStepsCard";
import RecentActivity from "./components/RecentActivity";
import { dashboardStatCardConfig } from "./dashboardStats";
import { useDashboard } from "./hooks/useDashboard";
import { dashboardContentSx } from "./Dashboard.styles";

export default function ClientDashboardPage() {
	const { data: dashboardData, loading, error } = useDashboard();

	const hasRecentActivity = dashboardData.recent_activity.length > 0;
	const hasPendingActions = dashboardData.pending_actions.length > 0;
	const hasDashboardItems = hasRecentActivity || hasPendingActions;

	return (
		<Box>
			<PageHeader
				label="Client Dashboard"
				title="Welcome back"
				subtitle="Track your active job ads, monitor contracts, and keep hiring moving from one focused workspace."
			>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ width: { xs: "100%", sm: "auto" } }}>
					<PrimaryButton
						component={RouterLink}
						to="/client/jobs"
						variant="contained"
						color="primary"
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						View My Jobs
					</PrimaryButton>

					<SecondaryButton
						component={RouterLink}
						to="/client/jobs/create"
						variant="contained"
						color="secondary"
						startIcon={<AddCircleOutlineRoundedIcon />}
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						Create Job
					</SecondaryButton>
				</Stack>
			</PageHeader>

			{loading && (
				<AppAlert title="Loading dashboard" sx={{ mt: 3 }}>
					Please wait while we load your latest activity.
				</AppAlert>
			)}

			{error && (
				<AppAlert severity="error" title="Dashboard could not be loaded" sx={{ mt: 3 }}>
					{error}
				</AppAlert>
			)}

			{!loading && !error && (
				<DashboardStatsSection stats={dashboardData.stats_cards} config={dashboardStatCardConfig.client} />
			)}

			{!loading && !error && hasDashboardItems && (
				<Box sx={dashboardContentSx}>
					{hasPendingActions && <NextStepsCard actions={dashboardData.pending_actions} />}

					{hasRecentActivity && <RecentActivity activities={dashboardData.recent_activity} />}
				</Box>
			)}

			{!loading && !error && !hasDashboardItems && (
				<AppAlert title="You're all caught up" sx={{ mt: 3 }}>
					There are no recent activities or pending actions.
				</AppAlert>
			)}
		</Box>
	);
}
