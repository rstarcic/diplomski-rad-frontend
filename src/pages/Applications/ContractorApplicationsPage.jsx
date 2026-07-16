import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

import AppAlert from "../../components/ui/Alert";
import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";
import ContractorApplicationCard from "./components/ContractorApplicationCard";

import { getMyApplications } from "../../api/coreAPI";
import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import { APPLICATION_STATUSES } from "../../constants/statuses";
import { parseApiError } from "../../utils/parseApiError";
import { findStatusKey } from "../../utils/jobs";

const contentSx = {
	mt: 3,
};

export default function ContractorApplicationsPage() {
	const [applications, setApplications] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		async function loadMyApplications() {
			try {
				setLoading(true);
				setLoadError("");

				const data = await getMyApplications(controller.signal);
				setApplications(data);
			} catch (error) {
				if (error.name === "CanceledError" || error.name === "AbortError") return;

				const apiError = parseApiError(
					error,
					APPLICATION_ERRORS,
					"We couldn't load your applications. Please try again later.",
				);

				setLoadError(apiError.message);
				setApplications([]);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}

		loadMyApplications();

		return () => controller.abort();
	}, []);

	const filteredApplications = useMemo(() => {
		if (selectedStatus === "all") return applications;

		return applications.filter(
			(item) => findStatusKey(item.application.status, APPLICATION_STATUSES) === selectedStatus,
		);
	}, [applications, selectedStatus]);

	return (
		<Box>
			<PageHeader
				label="Applications"
				title="My applications"
				subtitle="Track your submitted applications, negotiations, contracts, and payments."
			/>

			<Stack spacing={2} sx={contentSx}>
				<StatusFilter statuses={APPLICATION_STATUSES} value={selectedStatus} onChange={setSelectedStatus} />

				{loading ? (
					<AppAlert title="Loading applications">Please wait while we load your applications.</AppAlert>
				) : loadError ? (
					<AppAlert severity="error" title="Applications could not be loaded">
						{loadError}
					</AppAlert>
				) : filteredApplications.length === 0 ? (
					<Typography color="text.secondary">No applications match the selected status.</Typography>
				) : (
					<Grid container spacing={2.5}>
						{filteredApplications.map(({ application, job, client }) => (
							<Grid key={application.id} size={{ xs: 12, sm: 6, lg: 4 }}>
								<ContractorApplicationCard application={application} job={job} client={client} />
							</Grid>
						))}
					</Grid>
				)}
			</Stack>
		</Box>
	);
}
