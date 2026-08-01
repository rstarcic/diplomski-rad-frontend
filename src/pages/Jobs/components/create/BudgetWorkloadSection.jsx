import { Box, Grid, MenuItem, Stack } from "@mui/material";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { BUDGET_TYPES } from "../../../../constants/jobFilters";
import { surfaceSectionSx } from "../../../../theme/layout";
import SectionHeading from "./SectionHeading";

const positiveNumberInputProps = {
	htmlInput: {
		min: 1,
	},
};

export default function BudgetWorkloadSection({ jobData, setJobData }) {
	const rateLabel = jobData.budgetType === "hourly" ? "Hourly rate" : "Budget";

	const updateField = (field) => (event) => {
		setJobData((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	return (
		<Box sx={surfaceSectionSx}>
			<SectionHeading icon={<PaidRoundedIcon />} subtitle="Set your budget and estimated workload.">
				Budget and workload
			</SectionHeading>

			<Stack spacing={2}>
				<PrimaryTextField
					select
					label="Budget type"
					name="budgetType"
					value={jobData.budgetType}
					onChange={updateField("budgetType")}
					required
				>
					{BUDGET_TYPES.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</PrimaryTextField>

				<Grid container spacing={2}>
					<Grid size={{ xs: 12, sm: 8 }}>
						<PrimaryTextField
							label={rateLabel}
							name="budgetAmount"
							type="number"
							value={jobData.budgetAmount}
							onChange={updateField("budgetAmount")}
							placeholder="Enter amount"
							required
							slotProps={positiveNumberInputProps}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 4 }}>
						<PrimaryTextField label="Currency" placeholder="EUR" value="EUR" disabled />
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							required
							label="Duration"
							name="durationDays"
							type="number"
							value={jobData.durationDays}
							onChange={updateField("durationDays")}
							placeholder="Enter duration in days"
							slotProps={positiveNumberInputProps}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							required
							label="Hours per week"
							name="hoursPerWeek"
							type="number"
							value={jobData.hoursPerWeek}
							onChange={updateField("hoursPerWeek")}
							placeholder="Enter weekly hours"
							slotProps={positiveNumberInputProps}
						/>
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
}
