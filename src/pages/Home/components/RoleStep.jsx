import { Box, Stack, Typography } from "@mui/material";

export default function RoleStep({ item, color, bg }) {
	const { Icon } = item;

	return (
		<Stack direction="row" spacing={1.8} alignItems="center">
			<Box
				sx={{
					width: 50,
					height: 50,
					flex: "0 0 auto",
					display: "grid",
					placeItems: "center",
					borderRadius: 3,
					color,
					bgcolor: bg,
					"& svg": { fontSize: 25 },
				}}
			>
				<Icon />
			</Box>
			<Box>
				<Typography sx={{ fontWeight: 900, fontSize: "0.94rem", color: "#101632" }}>{item.title}</Typography>
				<Typography sx={{ mt: 0.25, color: "#2f3859", fontSize: "0.82rem", lineHeight: 1.55 }}>{item.text}</Typography>
			</Box>
		</Stack>
	);
}
