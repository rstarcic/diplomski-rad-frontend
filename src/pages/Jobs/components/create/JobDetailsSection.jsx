import { Box, Grid, MenuItem, Stack } from "@mui/material";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import { DateField } from "@mui/x-date-pickers";

import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { LOCATION_TYPES } from "../../../../constants/jobFilters";
import { surfaceSectionSx } from "../../../../theme/layout";
import SectionHeading from "./SectionHeading";

const dateFieldSx = (theme) => ({
	"& .MuiInputBase-root": {
		minHeight: theme.custom.sizes.field.sm,
	},
	"& .MuiFormHelperText-root": {
		mt: { xs: 0.25, sm: 0.5 },
		minHeight: { xs: 16, sm: 18 },
		fontSize: { xs: "0.72rem", sm: "0.75rem" },
		lineHeight: 1.35,
	},
});

const LOCATION_REQUIRED_TYPES = ["onsite", "hybrid"];

export default function JobDetailsSection({ jobData, setJobData, fieldSpacing = 2 }) {
	const requiresLocation = jobData.locationType === "onsite" || jobData.locationType === "hybrid";
	const showsDeadlineInLocationRow = !requiresLocation;

	const updateField = (field) => (event) => {
		setJobData((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	const updateLocationType = (event) => {
		const locationType = event.target.value;

		setJobData((prev) => ({
			...prev,
			locationType,
			location: LOCATION_REQUIRED_TYPES.includes(locationType) ? prev.location : "",
		}));
	};

	const updateDeadline = (value) => {
		setJobData((prev) => ({
			...prev,
			deadline: value,
		}));
	};

	return (
		<Box sx={surfaceSectionSx}>
			<SectionHeading icon={<WorkRoundedIcon />} subtitle="Basic information about the job you want to post.">
				Job details
			</SectionHeading>

			<Stack spacing={fieldSpacing}>
				<Grid container spacing={fieldSpacing}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField label="Job title" name="title" value={jobData.title} onChange={updateField("title")} />
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Category"
							name="category"
							value={jobData.category}
							onChange={updateField("category")}
						/>
					</Grid>
				</Grid>

				<PrimaryTextField
					label="Description"
					name="description"
					value={jobData.description}
					onChange={updateField("description")}
					placeholder="Describe the work and any details applicants should know."
					multiline
					minRows={4}
				/>

				<Grid container spacing={fieldSpacing}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							select
							label="Location type"
							name="locationType"
							value={jobData.locationType}
							onChange={updateLocationType}
							placeholder="Select location type"
							required
						>
							{LOCATION_TYPES.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</PrimaryTextField>
					</Grid>

					{requiresLocation && (
						<Grid size={{ xs: 12, sm: 6 }}>
							<PrimaryTextField
								label="Location"
								name="location"
								value={jobData.location}
								onChange={updateField("location")}
								placeholder="City or country"
								required
							/>
						</Grid>
					)}

					{showsDeadlineInLocationRow && (
						<Grid size={{ xs: 12, sm: 6 }}>
							<DateField
								label="Application deadline"
								value={jobData.deadline}
								onChange={updateDeadline}
								format="DD.MM.YYYY"
								fullWidth
								size="small"
								sx={dateFieldSx}
							/>
						</Grid>
					)}
				</Grid>

				{requiresLocation && (
					<Grid container spacing={fieldSpacing}>
						<Grid size={{ xs: 12, sm: 6 }}>
							<DateField
								label="Application deadline"
								value={jobData.deadline}
								onChange={updateDeadline}
								format="DD.MM.YYYY"
								fullWidth
								size="small"
								sx={dateFieldSx}
							/>
						</Grid>
					</Grid>
				)}
			</Stack>
		</Box>
	);
}
