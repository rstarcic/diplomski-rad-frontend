import { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import JobDetailsSection from "./components/create/JobDetailsSection";
import ContractSection from "./components/create/ContractSection";
import BudgetWorkloadSection from "./components/create/BudgetWorkloadSection";
import PreviewSection from "./components/create/PreviewSection";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AppAlert from "../../components/ui/Alert";
import AccountSetupAlert from "../../components/account/AccountAlert";
import { getMissingFields, getMissingFieldsMessage } from "../../utils/jobs";
import { parseApiError } from "../../utils/parseApiError";
import { JOB_ERRORS } from "../../constants/apiErrors";
import { createJob } from "../../api/coreAPI";
import { useAuth } from "../../hooks/useAuth";
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

export default function CreateJobPage() {
	const { accountSetup, role } = useAuth();
	const [jobData, setJobData] = useState(initialJobData);
	const [success, setSuccess] = useState("");
	const [validationWarning, setValidationWarning] = useState("");
	const [submitError, setSubmitError] = useState("");
	const [publishing, setPublishing] = useState(false);
	const setup = {
		...accountSetup,
		role: role ?? "client",
		paymentCompleted: true,
	};

	const missingFields = getMissingFields(jobData);
	const formIsComplete = missingFields.length === 0;
	const accountIsComplete = setup.profileCompleted && setup.paymentCompleted;
	const canPublish = formIsComplete && accountIsComplete && !publishing;
	const showSetupAlert = !accountIsComplete;

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!formIsComplete) {
			setSuccess("");
			setSubmitError("");
			setValidationWarning(getMissingFieldsMessage(missingFields));
			window.scrollTo({ top: 0, behavior: "smooth" });
			return;
		}

		if (!accountIsComplete || publishing) {
			return;
		}

		setSuccess("");
		setValidationWarning("");
		setSubmitError("");
		setPublishing(true);

		try {
			const createdJob = await createJob(jobData);
			console.log("Created job:", createdJob);
			setSuccess("Job created successfully.");
			setJobData(initialJobData);
		} catch (error) {
			console.error("Error submitting job:", error);
			const apiError = parseApiError(error, JOB_ERRORS, "We couldn't create the job. Please try again later.");
			setSubmitError(apiError.message);
		} finally {
			setPublishing(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
		<Box>
			<PageHeader
				label="Job creation"
				title="Create New Job"
				subtitle="Fill in the details below to create a new job."
			/>
			{showSetupAlert && (
				<AccountSetupAlert
					accountSetup={setup}
					actionName="publish a job"
					settingsPath="/client/settings"
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
					{/* LEFT COLUMN */}
					<Grid size={{ xs: 12, md: 8 }}>
						<Stack spacing={3}>
							<JobDetailsSection jobData={jobData} setJobData={setJobData} />
							<ContractSection jobData={jobData} setJobData={setJobData} />
							<Box
								sx={{
									display: { xs: "none", md: "flex" },
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

					{/* RIGHT COLUMN*/}
					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={3}>
							<BudgetWorkloadSection jobData={jobData} setJobData={setJobData} />
							<Box sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: 0.75 }}>
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
