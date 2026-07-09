import { Card, Divider, Stack, Typography } from "@mui/material";

import StatusChip from "../../../components/ui/StatusChip";
import { APPLICATION_STATUSES } from "../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../theme/layout";
import { formatDate } from "../../../utils/formatters";
import { findStatusKey } from "../../../utils/jobs";

const labelSx = {
	fontWeight: 700,
	textTransform: "uppercase",
	letterSpacing: 0.6,
};

export default function ApplicationSection({ application }) {
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Application
					</Typography>
					{statusKey && <StatusChip status={statusKey} config={APPLICATION_STATUSES} />}
				</Stack>

				<Divider />

				<Stack spacing={0.5}>
					<Typography variant="caption" color="text.secondary" sx={labelSx}>
						Cover letter
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
						{application.coverLetter}
					</Typography>
				</Stack>

				<Divider />

				<Stack direction="row" spacing={3}>
					<Stack spacing={0.25}>
						<Typography variant="caption" color="text.secondary" sx={labelSx}>
							Applied
						</Typography>
						<Typography variant="body2" fontWeight={700}>
							{formatDate(application.appliedAt)}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Card>
	);
}
