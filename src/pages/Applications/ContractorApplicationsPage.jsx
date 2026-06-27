import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";

import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";
import ContractorApplicationCard from "./components/ContractorApplicationCard";

import { APPLICATION_STATUSES } from "../../constants/statuses";
import { CURRENT_CONTRACTOR, MOCK_APPLICATIONS, MOCK_CLIENTS, MOCK_JOBS } from "../../mock/MockData";
import { findStatusKey } from "../../utils/jobs";

export default function ContractorApplicationsPage() {
	const [selectedStatus, setSelectedStatus] = useState("all");

	const applications = MOCK_APPLICATIONS.filter(
		(application) => application.contractorId === CURRENT_CONTRACTOR.id,
	).filter((application) => {
		if (selectedStatus === "all") return true;

		return findStatusKey(application.status, APPLICATION_STATUSES) === selectedStatus;
	});

	return (
		<Box>
			<PageHeader
				label="Applications"
				title="My applications"
				subtitle="Track your submitted applications, negotiations, contracts, and payments."
			/>

			<Stack spacing={2} sx={{ mt: 3 }}>
				<StatusFilter statuses={APPLICATION_STATUSES} value={selectedStatus} onChange={setSelectedStatus} />

				<Grid container spacing={2.5}>
					{applications.map((application) => {
						const job = MOCK_JOBS.find((item) => item.id === application.jobId);
						const client = MOCK_CLIENTS.find((item) => item.id === job?.clientId);
						return (
							<Grid key={application.id} size={{ xs: 12, sm: 6, lg: 4 }}>
								<ContractorApplicationCard application={application} job={job} client={client} />
							</Grid>
						);
					})}
				</Grid>
			</Stack>
		</Box>
	);
}
