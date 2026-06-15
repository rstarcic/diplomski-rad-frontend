import { Card, Stack, Typography } from "@mui/material";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";

export default function PaymentsSection({ payments }) {
	if (!payments || payments.length === 0) {
		return (
			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={1}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Payments
					</Typography>
					<Typography variant="body2" color="text.secondary">
						No payments have been recorded for this contract yet.
					</Typography>
				</Stack>
			</Card>
		);
	}

	return <Card elevation={0} sx={surfaceSectionSx}></Card>;
}
