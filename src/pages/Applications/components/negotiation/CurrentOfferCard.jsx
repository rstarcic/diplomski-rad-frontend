import { Box, Stack, TextField, Typography } from "@mui/material";

const termBoxSx = {
	p: 2,
	borderRadius: 2,
	border: "1px solid",
	borderColor: "divider",
	bgcolor: "background.paper",
};

function TermCell({ label, value, editedBy, isEditing, inputType, multiline, editValue, onChange }) {
	return (
		<Stack direction="row" spacing={2} sx={{ alignItems: multiline ? "flex-start" : "center" }}>
			<Box sx={{ flex: 1, minWidth: 0 }}>
				<Typography variant="body1">
					<Box component="span" sx={{ fontWeight: 800 }}>
						{label}:
					</Box>{" "}
					{value}
				</Typography>
				{editedBy && (
					<Typography variant="caption" color="text.secondary">
						Last edit by{" "}
						<Box component="span" sx={{ fontWeight: 700, textTransform: "capitalize" }}>
							{editedBy}
						</Box>
					</Typography>
				)}
			</Box>
			{isEditing && (
				<TextField
					value={editValue}
					onChange={(e) => onChange(e.target.value)}
					size="small"
					type={inputType || "text"}
					multiline={multiline}
					minRows={multiline ? 2 : undefined}
					sx={{ width: 220, flexShrink: 0 }}
					slotProps={{
						htmlInput: { min: 0 },
					}}
				/>
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
