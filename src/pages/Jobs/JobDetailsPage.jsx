import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";

import AppAlert from "../../components/ui/Alert";
import PageHeader from "../../components/ui/PageHeader";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";
import ApplyCard from "./components/details/ApplyCard";
import ClientProfileSection from "./components/details/ClientProfileSection";
import JobDetailsSection from "./components/details/JobDetailsSection";

import { createJobApplication, getJobDetails } from "../../api/coreAPI";
import { APPLICATION_ERRORS, JOB_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";
import { useAuth } from "../../hooks/useAuth";

const loadingContainerSx = {
	minHeight: "50vh",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	gap: 1.5,
};

const detailsGridSx = {
	mt: 3,
	alignItems: "flex-start",
};

const sidebarSx = {
	position: { md: "sticky" },
	top: 24,
};

export default function JobDetailsPage() {
	const { jobId } = useParams();
	const { accountSetup, accountIsComplete } = useAuth();
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		async function loadJobDetails() {
			try {
				setLoading(true);
				setError("");

				const data = await getJobDetails(jobId, controller.signal);
				console.log("Job details", data);
				setDetails(data);
			} catch (err) {
				if (err.name === "CanceledError" || err.name === "AbortError") return;

				const apiError = parseApiError(err, JOB_ERRORS, "Could not load job details.");
				setError(apiError.message);
				setDetails(null);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}

		loadJobDetails();

		return () => controller.abort();
	}, [jobId]);

	const handleApply = async ({ coverLetter }) => {
		try {
			return await createJobApplication(jobId, {
				coverLetter,
			});
		} catch (err) {
			const apiError = parseApiError(err, APPLICATION_ERRORS, "Your application could not be submitted.");

			setError(apiError.message);
			setDetails(null);
		}
	};

	if (loading) {
		return (
			<Box sx={loadingContainerSx}>
				<CircularProgress />
				<Typography color="text.secondary">Loading job details...</Typography>
			</Box>
		);
	}

	if (error) {
		return (
			<AppAlert severity="error" title="Job details could not be loaded">
				{error}
			</AppAlert>
		);
	}

	if (!details) return null;

	const { job, client, reviews, applicationStatus, alreadyApplied } = details;

	return (
		<Box>
			<PageHeader
				label="Job details"
				title={job.title}
				subtitle="Review the full job description, client profile and client reviews."
			/>

			<Grid container spacing={3} sx={detailsGridSx}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={3}>
						<JobDetailsSection job={job} />
						<ApplyCard
							job={{ ...job, client }}
							alreadyApplied={alreadyApplied}
							applicationStatus={applicationStatus}
							onApply={handleApply}
							accountSetup={accountSetup}
							accountIsComplete={accountIsComplete}
						/>
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={3} sx={sidebarSx}>
						<ClientProfileSection client={client} />
						<ReviewSummaryCard
							title="Client reviews"
							reviews={reviews.reviews}
							summary={reviews.summary}
							criteria={reviewCriteria.client}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
