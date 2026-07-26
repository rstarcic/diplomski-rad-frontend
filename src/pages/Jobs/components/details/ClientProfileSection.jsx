import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { formatDate } from "../../../../utils/formatters";

const avatarSx = {
	width: 64,
	height: 64,
	bgcolor: "primary.light",
	flexShrink: 0,
};

const profileLinkSx = {
	color: "inherit",
	textDecoration: "none",
	borderRadius: 2,
	"&:focus-visible": {
		outline: "2px solid",
		outlineColor: "primary.main",
		outlineOffset: 3,
	},
};

const clickableAvatarSx = {
	...avatarSx,
	transition: "transform 160ms ease, box-shadow 160ms ease",
	"&:hover": {
		transform: "scale(1.05)",
		boxShadow: 3,
	},
};

const profileNameLinkSx = {
	...profileLinkSx,
	display: "inline-block",
	fontWeight: 900,
	lineHeight: 1.25,
	"&:hover": {
		color: "primary.main",
		textDecoration: "underline",
	},
};

const contactBoxSx = {
	display: "flex",
	alignItems: "center",
	gap: 1,
	p: 1.25,
	border: "1px solid",
	borderColor: "divider",
	borderRadius: 2,
	overflow: "hidden",
	minWidth: 0,
};

const contactIconSx = {
	fontSize: 18,
	color: "primary.main",
	flexShrink: 0,
};

const memberSinceSx = (theme) => ({
	display: "flex",
	alignItems: "center",
	gap: 1,
	p: 1.25,
	border: "1px solid",
	borderColor: theme.custom.tint.primaryBorder,
	borderRadius: 2,
	bgcolor: theme.custom.tint.primarySubtle,
});

export default function ClientProfileSection({ client }) {
	if (!client) return null;

	const location = client.city && client.country ? `${client.city}, ${client.country}` : "Location not provided";
	const memberSince = client.createdAt;
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
							aria-label={`View ${client.fullName}'s public profile`}
							sx={profileLinkSx}
						>
							<Avatar alt={client.fullName} src={client.profileImageUrl} sx={clickableAvatarSx}>
								<PersonOutlineRoundedIcon />
							</Avatar>
						</Box>
					) : (
						<Avatar alt={client.fullName} src={client.profileImageUrl} sx={avatarSx}>
							<PersonOutlineRoundedIcon />
						</Avatar>
					)}

					<Box sx={{ minWidth: 0 }}>
						{clientProfilePath ? (
							<Typography component={RouterLink} to={clientProfilePath} variant="subtitle1" sx={profileNameLinkSx}>
								{client.fullName}
							</Typography>
						) : (
							<Typography variant="subtitle1" sx={{ fontWeight: 900, lineHeight: 1.25 }}>
								{client.fullName}
							</Typography>
						)}

						<Stack direction="row" spacing={0.5} sx={{ mt: 0.5, alignItems: "center" }}>
							<LocationOnRoundedIcon sx={{ fontSize: 15, color: "text.secondary" }} />
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
					<Stack spacing={1}>
						<Box sx={contactBoxSx}>
							<EmailOutlinedIcon sx={contactIconSx} />
							<Typography
								variant="body2"
								sx={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
							>
								{client.email ?? "Not provided"}
							</Typography>
						</Box>
						<Box sx={contactBoxSx}>
							<PhoneOutlinedIcon sx={contactIconSx} />
							<Typography
								variant="body2"
								sx={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
							>
								{client.phone ?? "Not provided"}
							</Typography>
						</Box>
					</Stack>

					<Box sx={memberSinceSx}>
						<CalendarMonthRoundedIcon sx={contactIconSx} />
						<Typography variant="body2" sx={{ fontWeight: 700 }}>
							Member since {formatDate(memberSince)}
						</Typography>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}
