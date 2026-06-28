import { useState } from "react";
import dayjs from "dayjs";
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
import { getMissingFields } from "../../utils/jobs";
import { MOCK_JOBS } from "../../mock/MockData";

const workModeMap = { Remote: "remote", Hybrid: "hybrid", "On-site": "onsite" };
const budgetTypeMap = { Fixed: "fixed", Hourly: "hourly" };

const desktopSubmitWrapSx = {
	display: { xs: "none", md: "flex" },
	justifyContent: "flex-end",
};

const mobileSubmitWrapSx = {
	display: { xs: "flex", md: "none" },
	flexDirection: "column",
	gap: 0.75,
};

const toFormData = (job) => ({
	title: job.title ?? "",
	category: job.category ?? "",
	description: job.description ?? "",
	locationType: workModeMap[job.workMode] ?? "",
	location: job.location ?? "",
	deadline: job.deadline ? dayjs(job.deadline) : null,
	budgetType: budgetTypeMap[job.budgetType] ?? "",
	rate: job.budgetAmount ?? "",
	currency: "EUR",
	durationDays: job.durationDays ?? "",
	hoursPerWeek: job.hoursPerWeek ?? "",
	deliverables: job.deliverables ?? "",
	requirements: job.requirements?.length ? job.requirements : [""],
});

const emptyJobData = {
	title: "",
	category: "",
	description: "",
	locationType: "",
	location: "",
	deadline: null,
	budgetType: "",
	rate: "",
	currency: "EUR",
	durationDays: "",
	hoursPerWeek: "",
	deliverables: "",
	requirements: [""],
};

export default function EditJobPage() {
	const { jobId } = useParams();
	const existing = MOCK_JOBS.find((j) => j.id === jobId);
	const [jobData, setJobData] = useState(existing ? toFormData(existing) : emptyJobData);
	const accountSetup = { role: "client", profileCompleted: true, paymentCompleted: true };
	const accountIsComplete = accountSetup.profileCompleted && accountSetup.paymentCompleted;

	const formIsComplete = getMissingFields(jobData).length === 0;
	const canSave = formIsComplete && accountIsComplete;

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!canSave) return;
	};

	return (
		<Box>
			<BackButton backTo="/client/jobs" sx={{ mb: 2 }} />
			<PageHeader
				label="Job editing"
				title={existing ? `Edit: ${existing.title}` : "Edit Job"}
				subtitle="Update the details below and save your changes."
			/>
			{!accountIsComplete && (
				<AccountSetupAlert
					accountSetup={accountSetup}
					actionName="Edit a job"
					settingsPath="/client/settings"
					sx={{ mt: 3 }}
				/>
			)}
			<Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
				<Grid container spacing={3}>
					{/* LEFT COLUMN */}
					<Grid size={{ xs: 12, md: 8 }}>
						<Stack spacing={3}>
							<JobDetailsSection jobData={jobData} setJobData={setJobData} />
							<ContractSection jobData={jobData} setJobData={setJobData} />
							<Box sx={desktopSubmitWrapSx}>
								<Stack spacing={0.75} sx={{ width: "50%" }}>
									<PrimaryButton type="submit" size="large" fullWidth disabled={!canSave}>
										Save changes
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
							<Box sx={mobileSubmitWrapSx}>
								<PrimaryButton type="submit" size="large" fullWidth disabled={!canSave}>
									Save changes
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
