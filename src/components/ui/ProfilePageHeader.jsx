import { Avatar, Box, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {
	profileCardSx,
	bannerSx,
	profileBodySx,
	profileContentSx,
	avatarSx,
	nameRowSx,
	nameSx,
	profileTitleSx,
	metaRowSx,
	metaItemSx,
	actionsRowSx,
} from "./ProfilePageHeader.styles";

export default function ProfilePageHeader({ firstName, lastName, image, city, country, createdAt, title, children }) {
	const fullName = [firstName, lastName].filter(Boolean).join(" ");
	const location = [city, country].filter(Boolean).join(", ");
	const memberYear = createdAt ? new Date(createdAt).getFullYear() : null;

	return (
		<Box sx={profileCardSx}>
			<Box sx={bannerSx} />

			<Box sx={profileBodySx}>
				<Avatar src={image} alt={fullName} sx={avatarSx}>
					<PersonOutlineRoundedIcon sx={{ fontSize: 40 }} />
				</Avatar>

				<Box sx={profileContentSx}>
					<Stack direction="row" spacing={1} sx={nameRowSx}>
						<Typography variant="h4" sx={nameSx}>
							{fullName || "Unknown"}
						</Typography>
					</Stack>

					{title && (
						<Typography variant="body2" sx={profileTitleSx}>
							{title}
						</Typography>
					)}

					<Stack direction="row" sx={metaRowSx}>
						{location && (
							<Stack direction="row" spacing={0.5} sx={metaItemSx}>
								<LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
								<Typography variant="body2">{location}</Typography>
							</Stack>
						)}
						{memberYear && (
							<Stack direction="row" spacing={0.5} sx={metaItemSx}>
								<CalendarTodayOutlinedIcon sx={{ fontSize: 15 }} />
								<Typography variant="body2">Member since {memberYear}</Typography>
							</Stack>
						)}
					</Stack>

					{children && (
						<Stack direction="row" spacing={1} sx={actionsRowSx}>
							{children}
						</Stack>
					)}
				</Box>
			</Box>
		</Box>
	);
}
