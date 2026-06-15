import { Avatar, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton";
import StatusChip from "../../../components/ui/StatusChip";
import { APPLICATION_STATUSES } from "../../../constants/statuses";
import { jobCardBaseSx } from "../../../theme/layout";
import { findStatusKey } from "../../../utils/jobs";

const cardSx = {
	...jobCardBaseSx,
	borderRadius: 4,
	boxShadow: "0 14px 35px rgba(15, 23, 42, 0.07)",
	height: "100%",
	display: "flex",
	flexDirection: "column",
};

const coverLetterSx = {
	display: "-webkit-box",
	WebkitLineClamp: 4,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
};

const avatarSx = {
	width: 40,
	height: 40,
	borderRadius: "50%",
	flexShrink: 0,
};

const contractorRowSx = {
	alignItems: "center",
	minWidth: 0,
};

const headerRowSx = {
	justifyContent: "space-between",
	alignItems: "flex-start",
};

export default function ApplicationsCard({ application, contractor }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);
	const { firstName, lastName, city, country, profileImageUrl } = contractor ?? {};
	const fullName = firstName && lastName ? `${firstName} ${lastName}` : "Unknown contractor";

	return (
		<Card sx={cardSx}>
			<CardContent sx={{ p: 3, flexGrow: 1 }}>
				<Stack spacing={2}>
					<Stack direction="row" sx={headerRowSx}>
						<Stack direction="row" spacing={1.5} sx={contractorRowSx}>
							<Avatar alt={fullName} src={profileImageUrl} sx={avatarSx}>
								<PersonOutlineRoundedIcon />
							</Avatar>
							<Stack>
								<Typography variant="body1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
									{fullName}
								</Typography>
								<Typography variant="caption" color="text.secondary">
									{city}, {country}
								</Typography>
							</Stack>
						</Stack>
						{statusKey && <StatusChip status={statusKey} config={APPLICATION_STATUSES} />}
					</Stack>

					<Divider />
					<Typography variant="body2" color="text.secondary" sx={coverLetterSx}>
						{application.coverLetter}
					</Typography>
				</Stack>
			</CardContent>
			<CardActions sx={{ justifyContent: "flex-end", p: 1.5 }}>
				<PrimaryButton onClick={() => navigate(`/client/jobs/${application.jobId}/applications/${application.id}`)}>
					View details
				</PrimaryButton>
			</CardActions>
		</Card>
	);
}
