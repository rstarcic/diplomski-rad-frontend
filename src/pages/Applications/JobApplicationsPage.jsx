import { useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Grid, Stack } from "@mui/material";

import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";
import { APPLICATION_STATUSES } from "../../constants/statuses";
import { MOCK_APPLICATIONS, MOCK_CONTRACTORS, MOCK_JOBS } from "../../mock/MockData";
import { pageSx } from "../../theme/layout";
import { findStatusKey } from "../../utils/jobs";

import ApplicationsCard from "./components/ApplicationsCard";
import { BackButton } from "../../components/ui/BackButton";

export default function JobApplicationsPage() {
	const { jobId } = useParams();
	const [selectedStatus, setSelectedStatus] = useState("all");

	const job = MOCK_JOBS.find((j) => j.id === jobId);

	const applications = MOCK_APPLICATIONS.filter((app) => {
		if (app.jobId !== jobId) return false;
		if (selectedStatus === "all") return true;
		return findStatusKey(app.status, APPLICATION_STATUSES) === selectedStatus;
	});

	return (
		<Box sx={pageSx}>
			<BackButton backTo="/client/jobs" sx={{ mb: 2 }} />
			<PageHeader
				label="Applications"
				title={job ? `Applications for "${job.title}"` : "Job Applications"}
				subtitle="Review and manage all applications submitted for this job."
			/>
			<Stack sx={{ gap: 2, mt: 3 }}>
				<StatusFilter statuses={APPLICATION_STATUSES} value={selectedStatus} onChange={setSelectedStatus} />
				<Grid container spacing={2.5}>
					{applications.map((application) => {
						const contractor = MOCK_CONTRACTORS.find((c) => c.id === application.contractorId);
						return (
							<Grid key={application.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
								<ApplicationsCard application={application} contractor={contractor} />
							</Grid>
						);
					})}
				</Grid>
			</Stack>
		</Box>
	);
}
