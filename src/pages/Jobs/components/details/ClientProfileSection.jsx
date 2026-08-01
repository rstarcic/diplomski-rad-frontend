import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Link as RouterLink } from "react-router-dom";

import {
	memberSinceBoxSx,
	memberSinceTextSx,
	profileContactBoxSx,
	profileContactIconSx,
	profileContactTextSx,
} from "../../../../components/profile/profileContact.styles";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { formatDate } from "../../../../utils/formatters";

import {
	avatarSx,
	clickableAvatarSx,
	profileLinkSx,
	profileNameLinkSx,
} from "./ClientProfileSection.styles";

export default function ClientProfileSection({ client }) {
	if (!client) return null;

	const clientName = client.fullName || "Client";
	const location = client.city && client.country ? `${client.city}, ${client.country}` : "Location not provided";

	const memberSince = client.createdAt ? formatDate(client.createdAt) : "Not provided";

	const clientProfilePath = client.id ? `/contractor/clients/${client.id}` : null;

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				<Typography variant="h6" sx={sectionTitleSx}>
					Client summary profile
				</Typography>

				<Divider />

				<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
					{clientProfilePath ? (
						<Box
							component={RouterLink}
							to={clientProfilePath}
							aria-label={`View ${clientName}'s public profile`}
							sx={profileLinkSx}
						>
							<Avatar alt={clientName} src={client.profileImageUrl} sx={clickableAvatarSx}>
								<PersonOutlineRoundedIcon />
							</Avatar>
						</Box>
					) : (
						<Avatar alt={clientName} src={client.profileImageUrl} sx={avatarSx}>
							<PersonOutlineRoundedIcon />
						</Avatar>
					)}

					<Box sx={{ minWidth: 0 }}>
						{clientProfilePath ? (
							<Typography component={RouterLink} to={clientProfilePath} variant="subtitle1" sx={profileNameLinkSx}>
								{clientName}
							</Typography>
						) : (
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 900,
									lineHeight: 1.25,
								}}
							>
								{clientName}
							</Typography>
						)}

						<Stack
							direction="row"
							spacing={0.5}
							sx={{
								mt: 0.5,
								alignItems: "center",
							}}
						>
							<LocationOnRoundedIcon
								sx={{
									fontSize: 15,
									color: "text.secondary",
								}}
							/>

							<Typography variant="body2" color="text.secondary" noWrap>
								{location}
							</Typography>
						</Stack>
					</Box>
				</Stack>

				{client.about && (
					<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
						{client.about}
					</Typography>
				)}

				<Divider />

				<Stack spacing={1}>
					<Box sx={profileContactBoxSx}>
						<EmailOutlinedIcon sx={profileContactIconSx} />

						<Typography variant="body2" sx={profileContactTextSx}>
							{client.email || "Not provided"}
						</Typography>
					</Box>

					<Box sx={profileContactBoxSx}>
						<PhoneOutlinedIcon sx={profileContactIconSx} />

						<Typography variant="body2" sx={profileContactTextSx}>
							{client.phone || "Not provided"}
						</Typography>
					</Box>

					<Box sx={memberSinceBoxSx}>
						<CalendarMonthRoundedIcon sx={profileContactIconSx} />

						<Typography variant="body2" sx={memberSinceTextSx}>
							Member since {memberSince}
						</Typography>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}
