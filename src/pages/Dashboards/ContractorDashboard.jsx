import { Box, Stack } from "@mui/material";
import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import { Link as RouterLink } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";
import SecondaryButton from "../../components/ui/SecondaryButton";
import NextStepsCard from "./components/NextStepsCard";
import RecentActivity from "./components/RecentActivity";
import DashboardStatsSection from "./components/DashboardStatsSection";
import AppAlert from "../../components/ui/Alert";

import { dashboardStatCardConfig } from "./dashboardStats";
import { useDashboard } from "./useDashboard";

const contentGridSx = {
	mt: { xs: 2, md: 3.5 },
	display: "grid",
	gap: { xs: 1.5, md: 2.5 },
	alignItems: "start",
};

export default function ContractorDashboardPage() {
	const { data: dashboardData, loading, error } = useDashboard();

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

			<DashboardStatsSection stats={dashboardData.stats_cards} config={dashboardStatCardConfig.contractor} />

			<Box sx={contentGridSx}>
				<RecentActivity activities={dashboardData.recent_activity} />
				<NextStepsCard actions={dashboardData.pending_actions} />
			</Box>
		</Box>
	);
}
