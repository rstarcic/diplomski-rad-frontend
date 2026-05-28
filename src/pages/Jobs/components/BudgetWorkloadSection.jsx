import { Box, Grid, MenuItem, Stack, Typography } from "@mui/material";

import PrimaryTextField from "../../../components/PrimaryTextField";

const sectionSx = (theme) => ({
	p: { xs: 2, sm: 3 },
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: 3,
	bgcolor: "background.paper",
});

const budgetTypes = [
	{ value: "fixed", label: "Fixed price" },
	{ value: "hourly", label: "Hourly rate" },
];

const positiveNumberInputProps = {
	htmlInput: {
		min: 0,
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
		<Box sx={sectionSx}>
			<Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
				Budget and workload
			</Typography>

			<Stack spacing={2}>
				<PrimaryTextField
					select
					label="Budget type"
					name="budgetType"
					value={jobData.budgetType}
					onChange={updateField("budgetType")}
					required
				>
					{budgetTypes.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</PrimaryTextField>

				<Grid container spacing={2}>
					<Grid size={{ xs: 12, sm: 8 }}>
						<PrimaryTextField
							label={rateLabel}
							name="rate"
							type="number"
							value={jobData.rate}
							onChange={updateField("rate")}
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
							label="Duration"
							name="durationDays"
							type="number"
							value={jobData.durationDays}
							onChange={updateField("durationDays")}
							placeholder="Days"
							slotProps={positiveNumberInputProps}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Hours per week"
							name="hoursPerWeek"
							type="number"
							value={jobData.hoursPerWeek}
							onChange={updateField("hoursPerWeek")}
							placeholder="Optional"
							slotProps={positiveNumberInputProps}
						/>
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
}
