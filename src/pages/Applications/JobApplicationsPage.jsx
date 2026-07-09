import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import AppAlert from "../../components/ui/Alert";
import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";
import { APPLICATION_STATUSES } from "../../constants/statuses";
import { getJobApplications } from "../../api/coreAPI";
import { parseApiError } from "../../utils/parseApiError";
import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import ApplicationsCard from "./components/ApplicationsCard";
import { BackButton } from "../../components/ui/BackButton";

export default function JobApplicationsPage() {
	const { jobId } = useParams();
	const [applications, setApplications] = useState([]);
	const [jobTitle, setJobTitle] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [loadError, setLoadError] = useState("");
	const [loading, setLoading] = useState(true);

	const filteredApplications = useMemo(
		() =>
			applications.filter(({ application }) => {
				if (selectedStatus === "all") return true;

				return application.status?.toLowerCase() === selectedStatus;
			}),
		[applications, selectedStatus],
	);

	useEffect(() => {
		async function loadJobApplications() {
			setLoadError("");
			setLoading(true);

			try {
				console.log(jobId);
				const applications = await getJobApplications(jobId);
				console.log(applications);
				setApplications(applications);
				setJobTitle(applications[0]?.job?.title ?? "");
			} catch (error) {
				console.error("Error loading applications:", error);
				const apiError = parseApiError(
					error,
					APPLICATION_ERRORS,
					"We couldn't load applications. Please try again later.",
				);
				setLoadError(apiError.message);
			} finally {
				setLoading(false);
			}
		}

		loadJobApplications();
	}, [jobId]);

	return (
		<Box>
			<BackButton backTo="/client/jobs" sx={{ mb: 2 }} />
			<PageHeader
				label="Applications"
				title={jobTitle ? `Applications for "${jobTitle}"` : "Job Applications"}
				subtitle="Review and manage all applications submitted for this job."
			/>

			<Stack sx={{ gap: 2, mt: 3 }}>
				<StatusFilter statuses={APPLICATION_STATUSES} value={selectedStatus} onChange={setSelectedStatus} />
				{loadError && (
					<AppAlert severity="error" title="Applications could not be loaded">
						{loadError}
					</AppAlert>
				)}

				{loading && <AppAlert title="Loading applications">Please wait while we load applications.</AppAlert>}

				{!loading && !loadError && filteredApplications.length === 0 && (
					<AppAlert title="No applications">There are no applications for this status.</AppAlert>
				)}

				<Grid container spacing={2.5}>
					{filteredApplications.map(({ application, contractor }) => (
						<Grid key={application.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
							<ApplicationsCard application={application} contractor={contractor} />
						</Grid>
					))}
				</Grid>
			</Stack>
		</Box>
	);
}
