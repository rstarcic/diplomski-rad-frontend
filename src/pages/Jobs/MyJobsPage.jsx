import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";
import MyJobCard from "./components/my-jobs/MyJobCard";
import AppAlert from "../../components/ui/AppAlert";
import { JOB_STATUSES } from "../../constants/statuses";
import { findStatusKey } from "../../utils/jobs";
import { getMyJobs } from "../../api/core.api";
import { parseApiError } from "../../utils/parseApiError";
import { JOB_ERRORS } from "../../constants/apiErrors";

export default function MyJobsPage() {
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [jobs, setJobs] = useState([]);
	const [loadError, setLoadError] = useState("");
	const [loading, setLoading] = useState(true);

	const filteredJobs = useMemo(
		() =>
			jobs.filter((job) => {
				if (selectedStatus === "all") return true;
				return findStatusKey(job.status, JOB_STATUSES) === selectedStatus;
			}),
		[jobs, selectedStatus],
	);

	useEffect(() => {
		async function loadMyJobs() {
			setLoadError("");
			setLoading(true);

			try {
				const jobs = await getMyJobs();
				setJobs(jobs);
			} catch (error) {
				console.error("Error loading jobs:", error);
				const apiError = parseApiError(error, JOB_ERRORS, "We couldn't load your jobs. Please try again later.");
				setLoadError(apiError.message);
			} finally {
				setLoading(false);
			}
		}

		loadMyJobs();
	}, []);

	return (
		<Box>
			<PageHeader
				label="My jobs"
				title="Posted Jobs"
				subtitle="Manage your job posts, track their status, and review applications in one place."
			/>
			<Stack sx={{ gap: 2, mt: 3 }}>
				<StatusFilter statuses={JOB_STATUSES} value={selectedStatus} onChange={setSelectedStatus} />

				{loadError && (
					<AppAlert severity="error" title="Jobs could not be loaded">
						{loadError}
					</AppAlert>
				)}

				{loading && <AppAlert title="Loading jobs">Please wait while we load your posted jobs.</AppAlert>}

				{!loading && !loadError && filteredJobs.length === 0 && (
					<Typography color="text.secondary">No jobs match this filter.</Typography>
				)}

				<Grid container spacing={2.5}>
					{filteredJobs.map((job) => (
						<Grid key={job.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
							<MyJobCard job={job} />
						</Grid>
					))}
				</Grid>
			</Stack>
		</Box>
	);
}
