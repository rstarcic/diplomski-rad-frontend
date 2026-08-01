import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { surfaceSectionSx } from "../../../../theme/layout";
import SectionHeading from "./SectionHeading";

const MAX_REQUIREMENTS = 5;

const addRequirementSx = {
	mt: 1.5,
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
			if (prev.requirements.length >= MAX_REQUIREMENTS) {
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
		<Box sx={surfaceSectionSx}>
			<SectionHeading
				icon={<DescriptionRoundedIcon />}
				subtitle="Describe the deliverables and requirements for this job."
			>
				Contract expectations
			</SectionHeading>

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
									aria-label={`Remove requirement ${index + 1}`}
									onClick={() => removeRequirement(index)}
									disabled={jobData.requirements.length <= 1}
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
						disabled={jobData.requirements.length >= MAX_REQUIREMENTS}
						sx={addRequirementSx}
					>
						Add requirement
					</Button>
				</Box>
			</Stack>
		</Box>
	);
}
