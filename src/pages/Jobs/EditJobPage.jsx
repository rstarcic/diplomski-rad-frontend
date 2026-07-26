import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";

import PageHeader from "../../components/ui/PageHeader";
import JobDetailsSection from "./components/create/JobDetailsSection";
import ContractSection from "./components/create/ContractSection";
import BudgetWorkloadSection from "./components/create/BudgetWorkloadSection";
import PreviewSection from "./components/create/PreviewSection";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { BackButton } from "../../components/ui/BackButton";
import AccountSetupAlert from "../../components/account/AccountAlert";
import AppAlert from "../../components/ui/Alert";
import { getMissingFields, getMissingFieldsMessage } from "../../utils/jobs";
import { parseApiError } from "../../utils/parseApiError";
import { JOB_ERRORS } from "../../constants/apiErrors";
import { getJobById, updateJob } from "../../api/coreAPI";
import { useAuth } from "../../hooks/useAuth";
import { useTimedAlert } from "../../hooks/useTimedAlert";

const desktopSubmitWrapSx = {
	display: { xs: "none", md: "flex" },
	justifyContent: "flex-end",
};

const mobileSubmitWrapSx = {
	display: { xs: "flex", md: "none" },
	flexDirection: "column",
	gap: 0.75,
};

const initialJobData = {
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
};

export default function EditJobPage() {
	const { accountSetup, role } = useAuth();
	const { jobId } = useParams();
	const [jobData, setJobData] = useState(initialJobData);
	const [jobTitle, setJobTitle] = useState("");
	const [loadError, setLoadError] = useState("");
	const [success, setSuccess] = useTimedAlert();
	const [validationWarning, setValidationWarning] = useState("");
	const [submitError, setSubmitError] = useState("");
	const [saving, setSaving] = useState(false);

	const setup = {
		...accountSetup,
		role: role ?? "client",
	};

	const accountIsComplete = setup.profileCompleted;
	const missingFields = getMissingFields(jobData);
	const formIsComplete = missingFields.length === 0;
	const canSave = formIsComplete && !saving;
	useEffect(() => {
		async function loadJob() {
			setLoadError("");

			try {
				const job = await getJobById(jobId);
				setJobData({
					...initialJobData,
					...job,
					requirements: job.requirements?.length ? job.requirements : [""],
				});
				setJobTitle(job.title ?? "");
			} catch (error) {
				console.error("Error loading job:", error);
				const apiError = parseApiError(error, JOB_ERRORS, "We couldn't load this job. Please try again later.");
				setLoadError(apiError.message);
			}
		}

		loadJob();
	}, [jobId]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (missingFields.length > 0) {
			setSuccess("");
			setSubmitError("");
			setValidationWarning(getMissingFieldsMessage(missingFields));
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		if (saving) return;

		setSuccess("");
		setValidationWarning("");
		setSubmitError("");
		setSaving(true);

		try {
			const updatedJob = await updateJob(jobId, jobData);
			setJobData({
				...initialJobData,
				...updatedJob,
				requirements: updatedJob.requirements?.length ? updatedJob.requirements : [""],
			});
			setJobTitle(updatedJob.title ?? "");
			setSuccess("Job updated successfully.");
		} catch (error) {
			console.error("Error updating job:", error);
			const apiError = parseApiError(error, JOB_ERRORS, "We couldn't update the job. Please try again later.");
			setSubmitError(apiError.message);
		} finally {
			setSaving(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<Box>
			<BackButton backTo="/client/jobs" sx={{ mb: 2 }} />
			<PageHeader
				label="Job editing"
				title={jobTitle ? `Edit: ${jobTitle}` : "Edit Job"}
				subtitle="Update the details below and save your changes."
			/>

			{!accountIsComplete && (
				<AccountSetupAlert
					accountSetup={setup}
					actionName="edit a job"
					settingsPath="/client/profile"
					sx={{ mt: 3 }}
				/>
			)}

			{loadError && (
				<AppAlert severity="error" title="Job could not be loaded" sx={{ mt: 3 }}>
					{loadError}
				</AppAlert>
			)}

			{validationWarning && (
				<AppAlert severity="warning" title="Complete the job details" sx={{ mt: 3 }}>
					{validationWarning}
				</AppAlert>
			)}

			{submitError && (
				<AppAlert severity="error" title="Job could not be updated" sx={{ mt: 3 }}>
					{submitError}
				</AppAlert>
			)}

			{success && (
				<AppAlert severity="success" title="Job updated" sx={{ mt: 3 }}>
					{success}
				</AppAlert>
			)}

			<Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, md: 8 }}>
						<Stack spacing={3}>
							<JobDetailsSection jobData={jobData} setJobData={setJobData} />
							<ContractSection jobData={jobData} setJobData={setJobData} />
							<Box sx={desktopSubmitWrapSx}>
								<Stack spacing={0.75} sx={{ width: "50%" }}>
									<PrimaryButton type="submit" size="large" fullWidth disabled={!canSave}>
										{saving ? "Saving..." : "Save changes"}
									</PrimaryButton>

									{!formIsComplete && (
										<Typography variant="caption" color="text.secondary">
											Complete required fields to save changes.
										</Typography>
									)}
								</Stack>
							</Box>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={3}>
							<BudgetWorkloadSection jobData={jobData} setJobData={setJobData} />
							<Box sx={mobileSubmitWrapSx}>
								<PrimaryButton type="submit" size="large" fullWidth disabled={!canSave}>
									{saving ? "Saving..." : "Save changes"}
								</PrimaryButton>

								{!formIsComplete && (
									<Typography variant="caption" color="text.secondary">
										Complete required fields to save changes.
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
