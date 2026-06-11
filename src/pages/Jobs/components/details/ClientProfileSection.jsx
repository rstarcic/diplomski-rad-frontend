import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";

import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { formatDate } from "../../../../utils/formatters";

const profileHeaderSx = (theme) => ({
	alignItems: "center",
	p: 1.5,
	border: "1px solid",
	borderColor: "divider",
	borderRadius: 2,
	bgcolor: theme.custom.tint.primarySubtle,
});

const avatarSx = {
	width: 64,
	height: 64,
	bgcolor: "primary.light",
	flexShrink: 0,
};

const contactRowSx = {
	display: "flex",
	alignItems: "center",
	gap: 1,
	minWidth: 0,
	color: "text.secondary",
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
	minWidth: 0,
	p: 1.25,
	border: "1px solid",
	borderColor: theme.custom.tint.primaryBorder,
	borderRadius: 2,
	bgcolor: theme.custom.tint.primarySubtle,
});

export default function ClientProfileSection({ client }) {
	if (!client) return null;

	const fullName = `${client.firstName} ${client.lastName}`;
	const memberSince = client.createdAt || client.created_at;

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				<Typography variant="h6" sx={sectionTitleSx}>
					About the client
				</Typography>

				<Stack direction="row" spacing={1.5} sx={profileHeaderSx}>
					<Avatar alt={fullName} src={client.profileImageUrl} sx={avatarSx}>
						<PersonOutlineRoundedIcon />
					</Avatar>

					<Box sx={{ minWidth: 0 }}>
						<Typography variant="subtitle1" sx={{ fontWeight: 900, lineHeight: 1.25 }} noWrap>
							{fullName}
						</Typography>

						<Stack direction="row" spacing={0.5} sx={{ mt: 0.5, alignItems: "center" }}>
							<LocationOnRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />

							<Typography variant="body2" color="text.secondary" noWrap>
								{client.city && client.country ? `${client.city}, ${client.country}` : "Location not provided"}
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

				<Stack spacing={1.25}>
					<Box sx={contactRowSx}>
						<EmailOutlinedIcon sx={contactIconSx} />

						<Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", wordBreak: "break-word" }}>
							{client.email || "Email not provided"}
						</Typography>
					</Box>

					<Box sx={contactRowSx}>
						<PhoneOutlinedIcon sx={contactIconSx} />

						<Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
							{client.phone || "Phone not provided"}
						</Typography>
					</Box>

					<Box sx={memberSinceSx}>
						<CalendarMonthRoundedIcon sx={contactIconSx} />

						<Box sx={{ minWidth: 0 }}>
							<Typography
								variant="caption"
								color="text.secondary"
								sx={{
									display: "block",
									fontWeight: 800,
									textTransform: "uppercase",
									letterSpacing: 0.6,
								}}
							>
								Member since
							</Typography>

							<Typography variant="body2" sx={{ fontWeight: 900, color: "text.primary" }}>
								{formatDate(memberSince)}
							</Typography>
						</Box>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}
