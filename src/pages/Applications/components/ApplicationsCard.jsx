import ButtonBase from "@mui/material/ButtonBase";
import { Avatar, Box, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton";
import StatusChip from "../../../components/ui/StatusChip";
import { APPLICATION_STATUSES } from "../../../constants/statuses";
import { findStatusKey } from "../../../utils/jobs";
import { avatarSx, cardSx, contractorButtonSx, coverLetterSx, footerSx, metaRowSx } from "./ApplicationsCard.styles";

export default function ApplicationsCard({ application, contractor }) {
	const navigate = useNavigate();
	const statusKey = findStatusKey(application.status, APPLICATION_STATUSES);

	const { id, firstName, lastName, city, country, profileImageUrl } = contractor ?? {};
	const fullName = firstName && lastName ? `${firstName} ${lastName}` : "Unknown contractor";

	const openContractorProfile = () => {
		if (id) navigate(`/client/contractors/${id}`);
	};

	const openApplicationDetails = () => {
		navigate(`/client/jobs/${application.jobId}/applications/${application.id}`);
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
						<ButtonBase onClick={openContractorProfile} sx={contractorButtonSx}>
							<Avatar alt={fullName} src={profileImageUrl} sx={avatarSx}>
								<PersonOutlineRoundedIcon />
							</Avatar>

							<Box sx={{ minWidth: 0 }}>
								<Typography variant="subtitle1" sx={{ fontWeight: 850, lineHeight: 1.2 }} noWrap>
									{fullName}
								</Typography>

								<Stack direction="row" spacing={0.5} sx={metaRowSx}>
									<LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
									<Typography variant="caption" color="text.secondary" noWrap>
										{city}, {country}
									</Typography>
								</Stack>
							</Box>
						</ButtonBase>

						{statusKey && <StatusChip status={statusKey} config={APPLICATION_STATUSES} />}
					</Stack>

					<Divider />

					<Box>
						<Typography variant="overline" color="text.secondary" sx={{ fontWeight: 800 }}>
							Cover letter
						</Typography>

						<Typography variant="body2" color="text.secondary" sx={coverLetterSx}>
							{application.coverLetter}
						</Typography>
					</Box>
				</Stack>
			</CardContent>

			<CardActions sx={footerSx}>
				<Stack direction="row" spacing={1}>
					<PrimaryButton variant="outlined" onClick={openContractorProfile}>
						View profile
					</PrimaryButton>

					<PrimaryButton onClick={openApplicationDetails}>Review application</PrimaryButton>
				</Stack>
			</CardActions>
		</Card>
	);
}
