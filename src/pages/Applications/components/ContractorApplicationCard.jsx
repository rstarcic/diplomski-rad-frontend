import { useNavigate } from "react-router-dom";
import { Avatar, Box, ButtonBase, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import PrimaryButton from "../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../components/ui/SecondaryButton";
import ApplicationStatusChip from "../../../components/ui/ApplicationStatusChip";

import { APPLICATION_STATUSES } from "../../../constants/statuses";
import { findStatusKey } from "../../../utils/jobs";
import { formatDate } from "../../../utils/formatters";
import {
	actionButtonSx,
	actionRowSx,
	avatarSx,
	cardContentSx,
	cardSx,
	clientButtonSx,
	clientDetailsSx,
	clientNameSx,
	coverLetterSx,
	footerSx,
	headerRowSx,
	locationIconSx,
	metaRowSx,
	titleWrapSx,
} from "./ContractorApplicationCard.styles";

export default function ContractorApplicationCard({ application, job, client }) {
	const navigate = useNavigate();

	if (!application || !job) return null;
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);
	const statusPaletteKey = statusKey
		? APPLICATION_STATUSES[statusKey].paletteKey
		: "info";
	const clientName = client?.fullName || "Unknown client";
	const clientLocation = [client?.city, client?.country].filter(Boolean).join(", ");
	const openApplication = () => {
		navigate(`/contractor/applications/${application.id}`);
	};

	const openClientProfile = () => {
		if (client?.userId) {
			navigate(`/contractor/clients/${client.userId}`, {
				state: { from: "/contractor/applications" },
			});
		}
	};

	return (
		<Card elevation={0} sx={cardSx(statusPaletteKey)}>
			<CardContent sx={cardContentSx}>
				<Stack spacing={2}>
					<Stack direction="row" spacing={2} sx={headerRowSx}>
						<Box sx={titleWrapSx}>
							<Typography variant="h6">
								{job.title}
							</Typography>

							<Typography variant="body2" color="text.secondary">
								{job.category}
							</Typography>
						</Box>

						<ApplicationStatusChip status={application.status} />
					</Stack>

					<Divider />

					<ButtonBase onClick={openClientProfile} sx={clientButtonSx}>
						<Avatar src={client?.profileImageUrl} alt={clientName} sx={avatarSx}>
							<PersonOutlineRoundedIcon />
						</Avatar>

						<Box sx={clientDetailsSx}>
							<Typography variant="body2" sx={clientNameSx} noWrap>
								{clientName}
							</Typography>

							{clientLocation && (
								<Stack direction="row" spacing={0.5} sx={metaRowSx}>
									<LocationOnOutlinedIcon sx={locationIconSx} />

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
				<Stack sx={actionRowSx}>
					<SecondaryButton onClick={openClientProfile} sx={actionButtonSx}>
						View profile
					</SecondaryButton>

					<PrimaryButton onClick={openApplication} sx={actionButtonSx}>
						Review application
					</PrimaryButton>
				</Stack>
			</CardActions>
		</Card>
	);
}
