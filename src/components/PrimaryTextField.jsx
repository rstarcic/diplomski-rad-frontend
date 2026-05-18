import { TextField } from "@mui/material";

const fieldSizes = {
	small: "sm",
	medium: "md",
	large: "lg",
};

export default function PrimaryTextField({ fieldSize = "small", sx, ...props }) {
	return (
		<TextField
			fullWidth
			size="small"
			variant="outlined"
			{...props}
			sx={(theme) => ({
				"& .MuiInputBase-root": {
					minHeight: theme.custom.sizes.field[fieldSizes[fieldSize]] ?? theme.custom.sizes.field.height,
				},
				...(typeof sx === "function" ? sx(theme) : sx),
			})}
		/>
	);
}
