import { Box, Stack } from "@mui/material";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
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

export default function ContractorDashboardPage() {
	const { data: dashboardData, loading, error } = useDashboard();

	const hasRecentActivity = dashboardData.recent_activity.length > 0;
	const hasPendingActions = dashboardData.pending_actions.length > 0;
	const hasDashboardItems = hasRecentActivity || hasPendingActions;

	return (
		<Box>
			<PageHeader
				label="Contractor Dashboard"
				title="Welcome back"
				subtitle="Track your active contracts, payments, client feedback, and upcoming work from one focused workspace."
			>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ width: { xs: "100%", sm: "auto" } }}>
					<PrimaryButton
						component={RouterLink}
						to="/contractor/jobs/search"
						variant="contained"
						color="primary"
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						Find Jobs
					</PrimaryButton>

					<SecondaryButton
						component={RouterLink}
						to="/contractor/applications"
						variant="contained"
						color="secondary"
						startIcon={<StickyNote2RoundedIcon />}
						sx={{ width: { xs: "100%", sm: "auto" } }}
					>
						View Applications
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
				<DashboardStatsSection stats={dashboardData.stats_cards} config={dashboardStatCardConfig.contractor} />
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
