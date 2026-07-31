import { TextField } from "@mui/material";

const fieldSizes = {
	small: "sm",
	medium: "md",
	large: "lg",
};

const createTextFieldSx = (fieldSize, customSx) => (theme) => ({
	"& .MuiInputBase-root": {
		minHeight:
			theme.custom.sizes.field[fieldSizes[fieldSize]] ??
			theme.custom.sizes.field.height,
	},
	"& .MuiFormHelperText-root": {
		mt: { xs: 0.25, sm: 0.5 },
		minHeight: { xs: 16, sm: 18 },
		fontSize: { xs: "0.72rem", sm: "0.75rem" },
		lineHeight: 1.35,
	},
	...(typeof customSx === "function" ? customSx(theme) : customSx),
});

export default function PrimaryTextField({ fieldSize = "small", sx, ...props }) {
	return (
		<TextField
			fullWidth
			size="small"
			variant="outlined"
			{...props}
			sx={createTextFieldSx(fieldSize, sx)}
		/>
	);
}
