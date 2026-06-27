import { Box, Typography } from "@mui/material";
import { headerSx, labelSx, titleSx, subtitleSx, actionsSx } from "./PageHeader.styles";

export default function PageHeader({ label, title, subtitle, children }) {
	return (
		<Box sx={headerSx}>
			<Box sx={{ minWidth: 0 }}>
				{label && (
					<Typography variant="overline" sx={labelSx}>
						{label}
					</Typography>
				)}

				<Typography variant="h3" sx={titleSx}>
					{title}
				</Typography>

				{subtitle && (
					<Typography variant="subtitle1" sx={subtitleSx}>
						{subtitle}
					</Typography>
				)}
			</Box>

			{children && <Box sx={actionsSx}>{children}</Box>}
		</Box>
	);
}
