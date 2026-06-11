import { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PageHeader from "../../components/ui/PageHeader";
import JobDetailsSection from "./components/create/JobDetailsSection";
import ContractSection from "./components/create/ContractSection";
import BudgetWorkloadSection from "./components/create/BudgetWorkloadSection";
import PreviewSection from "./components/create/PreviewSection";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AccountSetupAlert from "../../components/account/AccountAlert";
import { getMissingFields } from "../../utils/jobs";
import { getAccountSetupMock } from "../../mock/AccountSetup";
import pageSx from "../../theme/layout";

const initialJobData = {
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

export default function CreateJobPage() {
	const [jobData, setJobData] = useState(initialJobData);
	const accountSetup = getAccountSetupMock("client");
	const accountIsComplete = accountSetup.profileCompleted && accountSetup.paymentCompleted;

	const missingFields = getMissingFields(jobData);
	const formIsComplete = missingFields.length === 0;
	const canPublish = formIsComplete && accountIsComplete;
	const showSetupAlert = !accountIsComplete;

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!canPublish) {
			return;
		}
	};

	return (
		<Box sx={pageSx}>
			<PageHeader
				label="Job creation"
				title="Create New Job"
				subtitle="Fill in the details below to create a new job."
			/>
			{showSetupAlert && (
				<AccountSetupAlert
					accountSetup={accountSetup}
					actionName="publish a job"
					settingsPath="/client/settings"
					sx={{ mt: 3 }}
				/>
			)}
			<Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit} noValidate>
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
										Publish job
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
									Publish job
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
