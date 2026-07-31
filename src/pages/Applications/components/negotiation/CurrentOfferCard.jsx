import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";

import {
	editFieldSx,
	editorNameSx,
	termBoxSx,
	termContentSx,
	termLabelSx,
	termRowSx,
} from "./CurrentOfferCard.styles";

const BUDGET_TYPE_OPTIONS = [
	{ value: "fixed", label: "Fixed" },
	{ value: "hourly", label: "Hourly" },
];

function TermCell({ label, value, editedBy, isEditing, inputType, multiline, editValue, onChange, options }) {
	return (
		<Stack direction="row" spacing={2} sx={termRowSx(multiline)}>
			<Box sx={termContentSx}>
				<Typography variant="body1">
					<Box component="span" sx={termLabelSx}>
						{label}:
					</Box>{" "}
					{value}
				</Typography>
				{editedBy && (
					<Typography variant="caption" color="text.secondary">
						Last edit by{" "}
						<Box component="span" sx={editorNameSx}>
							{editedBy}
						</Box>
					</Typography>
				)}
			</Box>
			{isEditing && (
				<TextField
					select={Boolean(options)}
					value={editValue}
					onChange={(e) => onChange(e.target.value)}
					size="small"
					type={options ? undefined : inputType || "text"}
					multiline={!options && multiline}
					minRows={!options && multiline ? 2 : undefined}
					sx={editFieldSx}
					slotProps={options ? undefined : { htmlInput: { min: 0 } }}
				>
					{options?.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			)}
		</Stack>
	);
}

export default function CurrentOfferCard({ offer, isEditing, editValues, onEditChange }) {
	if (!offer) return null;

	return (
		<Stack spacing={1.5}>
			<Box sx={termBoxSx}>
				<TermCell
					label="Budget type"
					value={
						BUDGET_TYPE_OPTIONS.find((option) => option.value === String(offer.budgetType).toLowerCase())
							?.label ?? "Not specified"
					}
					isEditing={isEditing}
					editValue={editValues.budgetType}
					onChange={(val) => onEditChange("budgetType", val)}
					options={BUDGET_TYPE_OPTIONS}
				/>
			</Box>
			<Box sx={termBoxSx}>
				<TermCell
					label="Budget amount"
					value={`${offer.budgetAmount} ${offer.currency ?? "€"}`}
					isEditing={isEditing}
					inputType="number"
					editValue={editValues.budgetAmount}
					onChange={(val) => onEditChange("budgetAmount", val)}
				/>
			</Box>
			<Box sx={termBoxSx}>
				<TermCell
					label="Hours per week"
					value={`${offer.hoursPerWeek} h/week`}
					isEditing={isEditing}
					inputType="number"
					editValue={editValues.hoursPerWeek}
					onChange={(val) => onEditChange("hoursPerWeek", val)}
				/>
			</Box>
			<Box sx={termBoxSx}>
				<TermCell
					label="Duration"
					value={`${offer.duration} days`}
					isEditing={isEditing}
					inputType="number"
					editValue={editValues.duration}
					onChange={(val) => onEditChange("duration", val)}
				/>
			</Box>
			<Box sx={termBoxSx}>
				<TermCell
					label="Deliverables"
					value={offer.deliverables}
					isEditing={isEditing}
					multiline
					editValue={editValues.deliverables}
					onChange={(val) => onEditChange("deliverables", val)}
				/>
			</Box>
			<Box sx={termBoxSx}>
				<TermCell
					label="Message"
					value={offer.message || "No message provided."}
					isEditing={false}
					multiline
				/>
			</Box>
		</Stack>
	);
}
