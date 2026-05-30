import { Button } from "@mui/material";

function SecondaryButton({ sx, ...props }) {
	return (
		<Button
			variant="outlined"
			{...props}
			sx={(theme) => ({
				minHeight: theme.custom.buttons.secondary.height,
				borderRadius: theme.custom.buttons.secondary.borderRadius,
				borderColor: "common.white",
				color: theme.custom.buttons.secondary.color,
				bgcolor: "rgba(255,255,255,0.08)",
				fontSize: theme.custom.buttons.secondary.fontSize,
				fontWeight: theme.custom.buttons.secondary.fontWeight,
				...(typeof sx === "function" ? sx(theme) : sx),
			})}
		/>
	);
}

export default SecondaryButton;
