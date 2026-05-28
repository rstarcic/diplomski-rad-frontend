import { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import JobDetailsSection from "./components/JobDetailsSection";
import ContractSection from "./components/ContractSection";
import BudgetWorkloadSection from "./components/BudgetWorkloadSection";
import PreviewSection from "./components/PreviewSection";
import PrimaryButton from "../../components/PrimaryButton";

const pageSx = {
	width: "100%",
	maxWidth: "1440px",
	mx: "auto",
	px: { xs: 0, md: 1 },
	pb: { xs: 3, md: 5 },
};

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

	return (
		<Box sx={pageSx}>
			<PageHeader
				label="Job creation"
				title="Create New Job"
				subtitle="Fill in the details below to create a new job."
			/>

			<Box component="form" sx={{ mt: 3 }}>
				<Grid container spacing={3}>
					{/* LEFT COLUMN */}
					<Grid size={{ xs: 12, md: 8 }}>
						<Stack spacing={3}>
							<JobDetailsSection jobData={jobData} setJobData={setJobData} />
							<ContractSection jobData={jobData} setJobData={setJobData} />
							<Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-end" }}>
								<PrimaryButton type="submit" size="large">
									Publish job
								</PrimaryButton>
							</Box>
						</Stack>
					</Grid>

					{/* RIGHT COLUMN*/}
					<Grid size={{ xs: 12, md: 4 }}>
						<Stack spacing={3}>
							<BudgetWorkloadSection jobData={jobData} setJobData={setJobData} />
							<Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}>
								<PrimaryButton type="submit" size="large">
									Publish job
								</PrimaryButton>
							</Box>
							<PreviewSection jobData={jobData} />
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}
