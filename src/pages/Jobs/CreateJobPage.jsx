import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";

import PageHeader from "../../components/ui/PageHeader";
import JobDetailsSection from "./components/create/JobDetailsSection";
import ContractSection from "./components/create/ContractSection";
import BudgetWorkloadSection from "./components/create/BudgetWorkloadSection";
import PreviewSection from "./components/create/PreviewSection";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AppAlert from "../../components/ui/AppAlert";
import AccountSetupAlert from "../../components/account/AccountAlert";

import { getMissingFields, getMissingFieldsMessage } from "../../utils/jobs";
import { parseApiError } from "../../utils/parseApiError";
import { JOB_ERRORS } from "../../constants/apiErrors";
import { createJob, getJobById } from "../../api/core.api";
import { useAuth } from "../../hooks/useAuth";
import { useTimedAlert } from "../../hooks/useTimedAlert";

const createInitialJobData = () => ({
	title: "",
	category: "",
	description: "",
	locationType: "",
	location: "",
	deadline: null,
	budgetType: "",
	budgetAmount: "",
	currency: "EUR",
	durationDays: "",
	hoursPerWeek: "",
	deliverables: "",
	requirements: [""],
});

export default function CreateJobPage() {
	const { accountSetup, accountIsComplete, role } = useAuth();
	const [searchParams] = useSearchParams();

	const duplicateFrom = searchParams.get("duplicateFrom");
	const isCreatingCopy = Boolean(duplicateFrom);

	const [jobData, setJobData] = useState(createInitialJobData);
	const [sourceJobTitle, setSourceJobTitle] = useState("");
	const [loadingSourceJob, setLoadingSourceJob] = useState(Boolean(duplicateFrom));
	const [sourceJobError, setSourceJobError] = useState("");

	const [success, setSuccess] = useTimedAlert();
	const [validationWarning, setValidationWarning] = useState("");
	const [submitError, setSubmitError] = useState("");
	const [publishing, setPublishing] = useState(false);

	const setup = {
		...accountSetup,
		role: role ?? "client",
	};

	useEffect(() => {
		if (!duplicateFrom) return;

		let ignore = false;

		async function loadSourceJob() {
			try {
				const job = await getJobById(duplicateFrom);

				if (ignore) return;

				setJobData({
					...createInitialJobData,
					...job,

					deadline: null,

					requirements: job.requirements?.length > 0 ? [...job.requirements] : [""],
				});

				setSourceJobTitle(job.title ?? "");
			} catch (error) {
				if (ignore) return;

				const apiError = parseApiError(error, JOB_ERRORS, "We couldn't load the job you want to copy.");

				setSourceJobError(apiError.message);
			} finally {
				if (!ignore) {
					setLoadingSourceJob(false);
				}
			}
		}

		loadSourceJob();

		return () => {
			ignore = true;
		};
	}, [duplicateFrom]);

	const missingFields = getMissingFields(jobData);
	const formIsComplete = missingFields.length === 0;

	const canPublish = formIsComplete && accountIsComplete && !publishing && !loadingSourceJob;

	const showSetupAlert = !accountIsComplete;

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!formIsComplete) {
			setSuccess("");
			setSubmitError("");
			setValidationWarning(getMissingFieldsMessage(missingFields));

			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});

			return;
		}

		if (!accountIsComplete || publishing || loadingSourceJob) {
			return;
		}

		setSuccess("");
		setValidationWarning("");
		setSubmitError("");
		setPublishing(true);

		try {
			const jobToCreate = {
				...jobData,
				...(duplicateFrom && {
					sourceJobId: Number(duplicateFrom),
				}),
			};

			await createJob(jobToCreate);

			setSuccess("Job created successfully.");
			setJobData(createInitialJobData());
			setSourceJobTitle("");
		} catch (error) {
			const apiError = parseApiError(error, JOB_ERRORS, "We couldn't create the job. Please try again later.");

			setSubmitError(apiError.message);
		} finally {
			setPublishing(false);

			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<Box>
			<PageHeader
				label={isCreatingCopy ? "Create similar job" : "Job creation"}
				title={isCreatingCopy ? "Create Similar Job" : "Create New Job"}
				subtitle={
					isCreatingCopy
						? "Review the copied details before publishing this as a new job."
						: "Fill in the details below to create a new job."
				}
			/>

			{isCreatingCopy && sourceJobTitle && (
				<AppAlert severity="info" title={`Creating a new job from "${sourceJobTitle}"`} sx={{ mt: 3 }}>
					Review the copied details, choose a new deadline, and make any changes before publishing. The original
					cancelled job will remain unchanged.
				</AppAlert>
			)}

			{loadingSourceJob && (
				<AppAlert title="Loading job details" sx={{ mt: 3 }}>
					Please wait while we prepare the copied job.
				</AppAlert>
			)}

			{sourceJobError && (
				<AppAlert severity="error" title="Job could not be copied" sx={{ mt: 3 }}>
					{sourceJobError}
				</AppAlert>
			)}

			{showSetupAlert && (
				<AccountSetupAlert
					accountSetup={setup}
					actionName="publish a job"
					settingsPath={setup.profileCompleted ? "/client/stripe" : "/client/profile"}
					sx={{ mt: 3 }}
				/>
			)}

			{validationWarning && (
				<AppAlert severity="warning" title="Complete the job details" sx={{ mt: 3 }}>
					{validationWarning}
				</AppAlert>
			)}

			{submitError && (
				<AppAlert severity="error" title="Job could not be created" sx={{ mt: 3 }}>
					{submitError}
				</AppAlert>
			)}

			{success && (
				<AppAlert severity="success" title="Job created" sx={{ mt: 3 }}>
					{success}
				</AppAlert>
			)}

			<Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, md: 8 }}>
						<Stack spacing={3}>
							<JobDetailsSection jobData={jobData} setJobData={setJobData} />

							<ContractSection jobData={jobData} setJobData={setJobData} />

							<Box
								sx={{
									display: {
										xs: "none",
										md: "flex",
									},
									justifyContent: "flex-end",
								}}
							>
								<Stack spacing={0.75} sx={{ width: "50%" }}>
									<PrimaryButton type="submit" size="large" fullWidth disabled={!canPublish}>
										{publishing ? "Publishing..." : "Publish job"}
									</PrimaryButton>

									{!formIsComplete && (
										<Typography variant="caption" color="text.secondary">
											Complete required fields to publish.
										</Typography>
									)}
								</Stack>
							</Box>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={3}>
							<BudgetWorkloadSection jobData={jobData} setJobData={setJobData} />

							<Box
								sx={{
									display: {
										xs: "flex",
										md: "none",
									},
									flexDirection: "column",
									gap: 0.75,
								}}
							>
								<PrimaryButton type="submit" size="large" fullWidth disabled={!canPublish}>
									{publishing ? "Publishing..." : "Publish job"}
								</PrimaryButton>

								{!formIsComplete && (
									<Typography variant="caption" color="text.secondary">
										Complete required fields to publish.
									</Typography>
								)}
							</Box>

							<PreviewSection jobData={jobData} />
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
