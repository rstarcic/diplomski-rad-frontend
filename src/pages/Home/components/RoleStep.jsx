import { Box, Stack, Typography } from "@mui/material";
import { iconSx, rowSx, textSx, titleSx } from "./RoleStep.styles";

export default function RoleStep({ item, color, bg }) {
	const { Icon } = item;

	return (
		<Stack direction="row" spacing={1.8} sx={rowSx}>
			<Box sx={iconSx(color, bg)}>
				<Icon />
			</Box>
			<Box>
				<Typography variant="subtitle2" sx={titleSx}>
					{item.title}
				</Typography>
				<Typography variant="body2" sx={textSx}>
					{item.text}
				</Typography>
			</Box>
		</Stack>
	);
}
