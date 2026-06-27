import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";
import MyJobCard from "./components/my-jobs/MyJobCard";
import { JOB_STATUSES } from "../../constants/statuses";
import { findStatusKey } from "../../utils/jobs";
import { MOCK_JOBS } from "../../mock/MockData";

export default function MyJobsPage() {
	const [selectedStatus, setSelectedStatus] = useState("all");
	const jobs = MOCK_JOBS.filter((job) => {
		if (job.clientId !== "client_1") return false;
		if (selectedStatus === "all") return true;
		return findStatusKey(job.status, JOB_STATUSES) === selectedStatus;
	});
	return (
		<Box>
			<PageHeader
				label="My jobs"
				title="Posted Jobs"
				subtitle="Manage your job posts, track their status, and review applications in one place."
			/>
			<Stack sx={{ gap: 2, mt: 3 }}>
				<StatusFilter statuses={JOB_STATUSES} value={selectedStatus} onChange={setSelectedStatus} />
				<Grid container spacing={2.5}>
					{jobs.map((job) => (
						<Grid key={job.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
							<MyJobCard job={job} />
						</Grid>
					))}
				</Grid>
			</Stack>
		</Box>
	);
}
