import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import PrimaryTextField from "../../../components/PrimaryTextField";

const sectionSx = (theme) => ({
	p: { xs: 2, sm: 3 },
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: 3,
	bgcolor: "background.paper",
});

const titleSx = {
	mb: 2,
	fontWeight: 800,
};

const requirementRowSx = {
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr) auto",
	gap: 1,
	alignItems: "start",
};

export default function ContractSection({ jobData, setJobData }) {
	const updateField = (field) => (event) => {
		setJobData((prev) => ({
			...prev,
			[field]: event.target.value,
		}));
	};

	const updateRequirement = (index) => (event) => {
		setJobData((prev) => ({
			...prev,
			requirements: prev.requirements.map((requirement, requirementIndex) =>
				requirementIndex === index ? event.target.value : requirement,
			),
		}));
	};

	const addRequirement = () => {
		setJobData((prev) => {
			if (prev.requirements.length >= 5) {
				return prev;
			}

			return {
				...prev,
				requirements: [...prev.requirements, ""],
			};
		});
	};

	const removeRequirement = (index) => {
		setJobData((prev) => ({
			...prev,
			requirements: prev.requirements.filter((_, requirementIndex) => requirementIndex !== index),
		}));
	};

	return (
		<Box sx={sectionSx}>
			<Typography variant="h6" sx={titleSx}>
				Contract expectations
			</Typography>

			<Stack spacing={2}>
				<PrimaryTextField
					label="Deliverables"
					name="deliverables"
					value={jobData.deliverables}
					onChange={updateField("deliverables")}
					placeholder="List the expected deliverables, milestones, or final outcomes."
					multiline
					minRows={4}
				/>

				<Box>
					<Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800 }}>
						Requirements
					</Typography>

					<Stack spacing={1.25}>
						{jobData.requirements.map((requirement, index) => (
							<Box key={index} sx={requirementRowSx}>
								<PrimaryTextField
									label={`Requirement ${index + 1}`}
									value={requirement}
									onChange={updateRequirement(index)}
									placeholder="Example: Experience with React"
								/>

								<IconButton
									aria-label="Remove requirement"
									onClick={() => removeRequirement(index)}
									disabled={jobData.requirements.length > 5}
									sx={{ mt: 0.25 }}
								>
									<DeleteOutlineRoundedIcon />
								</IconButton>
							</Box>
						))}
					</Stack>

					<Button
						type="button"
						variant="text"
						startIcon={<AddCircleOutlineRoundedIcon />}
						onClick={addRequirement}
						disabled={jobData.requirements.length >= 5}
						sx={{ mt: 1.5, fontWeight: 800 }}
					>
						Add requirement
					</Button>
				</Box>
			</Stack>
		</Box>
	);
}
