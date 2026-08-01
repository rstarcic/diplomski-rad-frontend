import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import {
	memberSinceBoxSx,
	memberSinceTextSx,
	profileContactIconSx,
} from "../../../../components/profile/profileContact.styles";
import { formatDate } from "../../../../utils/formatters";
import {
	aboutSx,
	avatarSx,
	clickableAvatarSx,
	identityContentSx,
	identityRowSx,
	locationIconSx,
	locationRowSx,
	profileLinkSx,
	profileNameLinkSx,
	profileNameSx,
} from "./ContractorProfileSection.styles";
import ProfileContactItem from "./ProfileContactItem";

export default function ContractorProfileSection({ contractor, backTo }) {
	if (!contractor) return null;

	const location =
		contractor.city && contractor.country ? `${contractor.city}, ${contractor.country}` : "Location not provided";
	const contractorProfilePath = contractor.userId ? `/client/contractors/${contractor.userId}` : null;

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				<Typography variant="h6" sx={sectionTitleSx}>
					Contractor summary profile
				</Typography>

				<Divider />

				<Stack direction="row" spacing={2} sx={identityRowSx}>
					{contractorProfilePath ? (
						<Box
							component={RouterLink}
							to={contractorProfilePath}
							state={backTo ? { from: backTo } : undefined}
							aria-label={`View ${contractor.fullName}'s public profile`}
							sx={profileLinkSx}
						>
							<Avatar alt={`${contractor.fullName}`} src={contractor.profileImageUrl} sx={clickableAvatarSx}>
								<PersonOutlineRoundedIcon />
							</Avatar>
						</Box>
					) : (
						<Avatar alt={`${contractor.fullName}`} src={contractor.profileImageUrl} sx={avatarSx}>
							<PersonOutlineRoundedIcon />
						</Avatar>
					)}

					<Box sx={identityContentSx}>
						{contractorProfilePath ? (
							<Typography
								component={RouterLink}
								to={contractorProfilePath}
								state={backTo ? { from: backTo } : undefined}
								variant="subtitle1"
								sx={profileNameLinkSx}
							>
								{`${contractor.fullName}`}
							</Typography>
						) : (
							<Typography variant="subtitle1" sx={profileNameSx}>
								{`${contractor.fullName}`}
							</Typography>
						)}

						<Stack direction="row" spacing={0.5} sx={locationRowSx}>
							<LocationOnRoundedIcon sx={locationIconSx} />
							<Typography variant="body2" color="text.secondary" noWrap>
								{location}
							</Typography>
						</Stack>
					</Box>
				</Stack>

				{contractor.about && (
					<Typography variant="body2" color="text.secondary" sx={aboutSx}>
						{contractor.about}
					</Typography>
				)}

				<Divider />

				<Stack spacing={1}>
					<ProfileContactItem icon={EmailOutlinedIcon}>{contractor.email ?? "Not provided"}</ProfileContactItem>
					<ProfileContactItem icon={PhoneOutlinedIcon}>{contractor.phone ?? "Not provided"}</ProfileContactItem>

					<Box sx={memberSinceBoxSx}>
						<CalendarMonthRoundedIcon sx={profileContactIconSx} />

						<Typography variant="body2" sx={memberSinceTextSx}>
							Member since {formatDate(contractor.createdAt)}
						</Typography>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}
