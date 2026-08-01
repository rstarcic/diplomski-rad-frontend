import { useState } from "react";
import { Autocomplete, Box, Chip, Paper, Stack, TextField, Typography } from "@mui/material";

import SecondaryButton from "../../../../components/ui/SecondaryButton";
import { sectionTitleSx } from "../../../../theme/layout";

const cardSx = {
	p: 2.5,
	borderRadius: 2,
};

const chipRowSx = {
	mt: 2,
	flexWrap: "wrap",
	gap: 1,
	rowGap: 1.5,
};

const addRowSx = {
	mt: 2,
	alignItems: { xs: "stretch", sm: "center" },
};

const skillInputSx = {
	flex: 1,
};

const addButtonSx = {
	height: 40,
	flexShrink: 0,
};

const getSkillName = (skill) => {
	if (typeof skill === "string") return skill;

	return skill?.name ?? "";
};

const normalizeSkill = (skill) => getSkillName(skill).trim().toLowerCase();

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

	const handleAdd = (rawSkill) => {
		const name = getSkillName(rawSkill).trim();

		if (!name) return;

		const normalizedName = name.toLowerCase();
		const alreadyAdded = skills.some((skill) => normalizeSkill(skill) === normalizedName);

		if (alreadyAdded) {
			setInputValue("");
			return;
		}

		const existingSkill = availableSkills.find((skill) => normalizeSkill(skill) === normalizedName);

		onAddSkill?.(existingSkill ?? { name });
		setInputValue("");
	};

	const options = availableSkills.filter(
		(option) => !skills.some((skill) => normalizeSkill(skill) === normalizeSkill(option)),
	);

	const content = (
		<>
			<Box>
				<Typography variant="h6" sx={sectionTitleSx}>
					{title}
				</Typography>

				{editable && (
					<Typography variant="body2" color="text.secondary">
						Showcase your skills to clients.
					</Typography>
				)}
			</Box>

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
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={addRowSx}>
					<Autocomplete
						freeSolo
						options={options}
						value={null}
						inputValue={inputValue}
						onInputChange={(_, value) => setInputValue(value)}
						onChange={(_, value) => handleAdd(value)}
						getOptionLabel={getSkillName}
						isOptionEqualToValue={(option, value) => normalizeSkill(option) === normalizeSkill(value)}
						sx={skillInputSx}
						renderInput={(params) => <TextField {...params} placeholder="Add a skill..." />}
					/>

					<SecondaryButton
						onClick={() => handleAdd(inputValue)}
						disabled={!inputValue.trim()}
						sx={addButtonSx}
					>
						Add
					</SecondaryButton>
				</Stack>
			)}
		</>
	);

	if (disablePaper) return content;

	return (
		<Paper variant="outlined" sx={cardSx}>
			{content}
		</Paper>
	);
}
