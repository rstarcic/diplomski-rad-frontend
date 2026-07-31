import { useEffect, useMemo, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { getJobApplicationDetails, getJobApplications } from "../../api/core.api";

import AppAlert from "../../components/ui/AppAlert";
import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import StatusFilter from "../../components/ui/StatusFilter";

import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import { APPLICATION_STATUSES } from "../../constants/statuses";
import { findStatusKey } from "../../utils/jobs";
import { parseApiError } from "../../utils/parseApiError";

import ApplicationsCard from "./components/ApplicationsCard";

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

				return findStatusKey(application.status, APPLICATION_STATUSES) === selectedStatus;
			}),
		[applications, selectedStatus],
	);

	useEffect(() => {
		async function loadJobApplications() {
			setLoadError("");
			setLoading(true);

			try {
				const applicationItems = await getJobApplications(jobId);
				const enrichedApplications = await Promise.all(
					applicationItems.map(async (item) => {
						const statusKey = findStatusKey(item.application.status, APPLICATION_STATUSES);

						if (statusKey !== "accepted" || item.contract || item.payment) {
							return item;
						}

						try {
							const details = await getJobApplicationDetails(jobId, item.application.id);

							return {
								...item,
								application: {
									...item.application,
									appliedAt: item.application.appliedAt ?? details.application?.appliedAt ?? null,
								},
								job: details.job ?? item.job,
								contract: details.contract ?? null,
								payment: details.payment ?? null,
							};
						} catch (error) {
							console.error(`Failed to load details for application ${item.application.id}:`, error);
							return item;
						}
					}),
				);

				setApplications(enrichedApplications);
				setJobTitle(enrichedApplications[0]?.job?.title ?? "");
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
				label="Applications for"
				title={jobTitle ? `${jobTitle}` : "Job Applications"}
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
					{filteredApplications.map(({ application, contractor, job, contract, payment }) => (
						<Grid key={application.id} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
							<ApplicationsCard
								application={application}
								contractor={contractor}
								job={job}
								contract={contract}
								payment={payment}
							/>
						</Grid>
					))}
				</Grid>
			</Stack>
		</Box>
	);
}
