import { useNavigate } from "react-router-dom";
import { Avatar, Box, ButtonBase, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import PrimaryButton from "../../../components/ui/PrimaryButton";
import StatusChip from "../../../components/ui/StatusChip";

import { APPLICATION_STATUSES } from "../../../constants/statuses";
import { findStatusKey } from "../../../utils/jobs";
import { formatDate } from "../../../utils/formatters";

const cardSx = {
	height: "100%",
	display: "flex",
	flexDirection: "column",
	borderRadius: 3,
	border: "1px solid",
	borderColor: "divider",
	boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
	bgcolor: "background.paper",
};

const clientButtonSx = {
	display: "flex",
	justifyContent: "flex-start",
	gap: 1.25,
	minWidth: 0,
	textAlign: "left",
	borderRadius: 2,
	"&:hover": {
		bgcolor: "action.hover",
	},
};

const avatarSx = {
	width: 40,
	height: 40,
	flexShrink: 0,
	bgcolor: "primary.light",
};

const metaRowSx = {
	alignItems: "center",
	color: "text.secondary",
};

const coverLetterSx = {
	display: "-webkit-box",
	WebkitLineClamp: 3,
	WebkitBoxOrient: "vertical",
	overflow: "hidden",
};

const footerSx = {
	justifyContent: "center",
	p: 2,
	pt: 0,
};

export default function ContractorApplicationCard({ application, job, client }) {
	const navigate = useNavigate();

	if (!application || !job) return null;
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);
	const clientName = client ? `${client.firstName} ${client.lastName}` : "Unknown client";
	const clientLocation = [client?.city, client?.country].filter(Boolean).join(", ");
	const openApplication = () => {
		navigate(`/contractor/applications/${application.id}`);
	};

	const openClientProfile = () => {
		if (client?.id) {
			navigate(`/contractor/clients/${client.id}`);
		}
	};

	return (
		<Card elevation={0} sx={cardSx}>
			<CardContent sx={{ p: 2.5, flexGrow: 1 }}>
				<Stack spacing={2}>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							alignItems: "flex-start",
							justifyContent: "space-between",
						}}
					>
						<Box sx={{ minWidth: 0 }}>
							<Typography variant="h6" sx={{ fontWeight: 850 }}>
								{job.title}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								{job.category}
							</Typography>
						</Box>

						{statusKey && <StatusChip status={statusKey} config={APPLICATION_STATUSES} />}
					</Stack>

					<Divider />

					<ButtonBase onClick={openClientProfile} sx={clientButtonSx}>
						<Avatar src={client?.profileImageUrl} alt={clientName} sx={avatarSx}>
							<PersonOutlineRoundedIcon />
						</Avatar>

						<Box sx={{ minWidth: 0 }}>
							<Typography variant="body2" sx={{ fontWeight: 800 }} noWrap>
								{clientName}
							</Typography>

							{clientLocation && (
								<Stack direction="row" spacing={0.5} sx={metaRowSx}>
									<LocationOnOutlinedIcon sx={{ fontSize: 15 }} />

									<Typography variant="caption" noWrap>
										{clientLocation}
									</Typography>
								</Stack>
							)}
						</Box>
					</ButtonBase>

					<Box>
						<Typography variant="overline" color="text.secondary" sx={{ fontWeight: 800 }}>
							Your cover letter
						</Typography>

						<Typography variant="body2" color="text.secondary" sx={coverLetterSx}>
							{application.coverLetter}
						</Typography>
					</Box>
					<Stack direction="row">
						<Typography variant="overline" color="text.secondary" sx={{ fontWeight: 800 }}>
							Applied on {formatDate(application.createdAt)}
						</Typography>
					</Stack>
				</Stack>
			</CardContent>

			<CardActions sx={footerSx}>
				<Stack direction="row" spacing={1}>
					<PrimaryButton variant="outlined" onClick={openClientProfile}>
						View profile
					</PrimaryButton>

					<PrimaryButton onClick={openApplication}>Review application</PrimaryButton>
				</Stack>
			</CardActions>
		</Card>
	);
}
