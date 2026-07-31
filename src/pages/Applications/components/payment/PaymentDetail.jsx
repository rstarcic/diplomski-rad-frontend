import { Stack, Typography } from "@mui/material";

export default function PaymentDetail({ label, children }) {
	return (
		<Stack spacing={0.25}>
			<Typography variant="caption" color="text.secondary">
				{label}
			</Typography>

			<Typography variant="body2" fontWeight={700}>
				{children}
			</Typography>
		</Stack>
	);
}
