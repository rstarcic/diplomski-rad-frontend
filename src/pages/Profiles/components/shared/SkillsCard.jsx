import { useState } from "react";
import { Paper, Box, Stack, Chip, Typography, Autocomplete, TextField } from "@mui/material";
import { sectionTitleSx } from "../../../../theme/layout";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

const chipRowSx = {
	mt: 2,
	flexWrap: "wrap",
	gap: 1,
	rowGap: 1.5,
};

const addRowSx = {
	mt: 2,
	alignItems: "center",
};

const addButtonSx = {
	height: 40,
	textTransform: "none",
	borderColor: "#d8ccff",
	color: "#6c47ff",
	fontWeight: 700,
	borderRadius: 1,
	flexShrink: 0,
};

const getSkillName = (skill) => {
	if (typeof skill === "string") return skill;
	return skill?.name || "";
};

const normalize = (skill) => getSkillName(skill).trim().toLowerCase();

export default function SkillsCard({
	skills = [],
	editable = false,
	availableSkills = [],
	onAddSkill,
	onRemoveSkill,
	title = "Skills",
	disablePaper = false,
}) {
	const [inputValue, setInputValue] = useState("");

	const handleAdd = (raw) => {
		if (!raw) return;

		const name = getSkillName(raw).trim();
		if (!name) return;

		if (skills.some((skill) => normalize(skill) === name.toLowerCase())) {
			setInputValue("");
			return;
		}

		const existing = availableSkills.find((skill) => normalize(skill) === name.toLowerCase());

		onAddSkill?.(existing ?? { name });
		setInputValue("");
	};

	const options = availableSkills.filter((option) => !skills.some((skill) => normalize(skill) === normalize(option)));

	const content = (
		<>
			<Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
				<Box>
					<Typography variant="h6" sx={sectionTitleSx}>
						{title}
					</Typography>
					{editable && (
						<Typography variant="body2" color="text.secondary">
							Showcase your skills to clients
						</Typography>
					)}
				</Box>
			</Stack>

			{skills.length > 0 ? (
				<Stack direction="row" sx={chipRowSx}>
					{skills.map((skill, index) => {
						const name = getSkillName(skill);

						return (
							<Chip
								key={skill.id ?? name ?? index}
								label={name}
								color="primary"
								variant={editable ? "outlined" : "filled"}
								onDelete={editable ? () => onRemoveSkill?.(skill) : undefined}
								sx={{ px: 0.5 }}
							/>
						);
					})}
				</Stack>
			) : (
				<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
					{editable ? "Add your first skill below." : "No skills listed yet."}
				</Typography>
			)}

			{editable && (
				<Stack direction="row" spacing={1} sx={addRowSx}>
					<Autocomplete
						freeSolo
						options={options}
						value={null}
						inputValue={inputValue}
						onInputChange={(_, value) => setInputValue(value)}
						onChange={(_, value) => handleAdd(value)}
						getOptionLabel={(option) => getSkillName(option)}
						isOptionEqualToValue={(option, value) => normalize(option) === normalize(value)}
						sx={{ flex: 1 }}
						renderInput={(params) => <TextField {...params} placeholder="Add a skill..." size="small" />}
					/>

					<PrimaryButton
						variant="outlined"
						onClick={() => handleAdd(inputValue)}
						disabled={!inputValue.trim()}
						sx={addButtonSx}
					>
						Add
					</PrimaryButton>
				</Stack>
			)}
		</>
	);

	if (disablePaper) return content;

	return (
		<Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
			{content}
		</Paper>
	);
}
