import { Box, Stack, Typography } from "@mui/material";

export default function SectionHeading({ icon, children, subtitle }) {
	return (
		<Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start", mb: 2.5 }}>
			<Box
				sx={(theme) => ({
					width: 42,
					height: 42,
					borderRadius: "50%",
					display: "grid",
					placeItems: "center",
					flexShrink: 0,
					color: theme.custom.jobForm.sectionIconColor,
					bgcolor: theme.custom.jobForm.sectionIconBackground,
					mt: -0.25,
					"& .MuiSvgIcon-root": { fontSize: 21 },
				})}
			>
				{icon}
			</Box>
			<Box sx={{ minWidth: 0 }}>
				<Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
					{children}
				</Typography>
				{subtitle && (
					<Typography variant="body2" color="text.secondary" sx={{ mt: 0.35, lineHeight: 1.45 }}>
						{subtitle}
					</Typography>
				)}
			</Box>
		</Stack>
	);
}
