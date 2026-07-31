import { useState } from "react";

import { Avatar, Box, Dialog, DialogActions, DialogContent, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import {
	aboutSx,
	avatarSx,
	cardSx,
	clickableAvatarSx,
	dialogActionsSx,
	dialogContentSx,
	dialogPaperSx,
	enlargedImageSx,
	headerSx,
	infoLabelSx,
	infoRowSx,
	nameSx,
} from "./ProfileInfoCard.styles";

const iconSx = { fontSize: 16 };
const iconWrapSx = { color: "primary.main", display: "flex", alignItems: "center", flexShrink: 0, mt: "2px" };

function InfoRow({ icon, label, value }) {
	if (!value) return null;
	return (
		<Stack direction="row" spacing={1.5} sx={infoRowSx}>
			<Box component="span" sx={iconWrapSx}>
				{icon}
			</Box>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0, sm: 1 }}>
				<Typography variant="body2" sx={infoLabelSx}>
					{label}:
				</Typography>
				<Typography variant="body2" fontWeight={600}>
					{value}
				</Typography>
			</Stack>
		</Stack>
	);
}

function CompactInfo({ icon, value }) {
	if (!value) return null;

	return (
		<Stack direction="row" spacing={1.25} sx={{ alignItems: "center", minWidth: 0 }}>
			<Box component="span" sx={{ ...iconWrapSx, mt: 0 }}>
				{icon}
			</Box>
			<Typography variant="body2" color="text.secondary" noWrap sx={{ minWidth: 0 }}>
				{value}
			</Typography>
		</Stack>
	);
}

export default function ProfileInfoCard({ firstName, lastName, title, image, email, phone, city, country, createdAt, about, featured = false }) {
	const [previewOpen, setPreviewOpen] = useState(false);
	const fullName = [firstName, lastName].filter(Boolean).join(" ");
	const location = [city, country].filter(Boolean).join(", ");
	const memberSince = createdAt
		? new Date(createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
		: null;
	const hasImage = Boolean(image);

	return (
		<Paper elevation={0} sx={featured ? { ...cardSx, p: { xs: 2.5, sm: 3 } } : cardSx}>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 2.5, sm: 3.5 }} sx={headerSx}>
				<Avatar
					src={image}
					alt={fullName}
					sx={hasImage ? clickableAvatarSx : avatarSx}
					onClick={hasImage ? () => setPreviewOpen(true) : undefined}
				>
					<PersonOutlineRoundedIcon sx={{ fontSize: 56 }} />
				</Avatar>

				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ alignItems: { xs: "center", sm: "flex-start", md: "center" }, mb: 2 }}>
						<Typography variant="h5" sx={{ ...nameSx, mb: 0 }}>
							{fullName || "Unknown"}
						</Typography>
						{featured && memberSince && (
							<Stack direction="row" spacing={0.75} sx={{ px: 1.25, py: 0.65, borderRadius: 99, bgcolor: "rgba(91, 63, 214, 0.08)", color: "primary.main", alignItems: "center" }}>
								<CalendarTodayOutlinedIcon sx={iconSx} />
								<Typography variant="caption" sx={{ fontWeight: 700, color: "text.primary" }}>Member since {memberSince}</Typography>
							</Stack>
						)}
					</Stack>

					{title && (
						<Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 2 }}>
							{title}
						</Typography>
					)}

					{featured ? (
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
								columnGap: 4,
								rowGap: 1.75,
							}}
						>
							<CompactInfo icon={<LocationOnOutlinedIcon sx={iconSx} />} value={location} />
							<CompactInfo icon={<EmailOutlinedIcon sx={iconSx} />} value={email} />
							<CompactInfo icon={<PhoneOutlinedIcon sx={iconSx} />} value={phone} />
						</Box>
					) : (
						<Stack spacing={1.25}>
							<InfoRow icon={<CalendarTodayOutlinedIcon sx={iconSx} />} label="Member since" value={memberSince} />
							<InfoRow icon={<LocationOnOutlinedIcon sx={iconSx} />} label="Location" value={location} />
							<InfoRow icon={<EmailOutlinedIcon sx={iconSx} />} label="Email" value={email} />
							<InfoRow icon={<PhoneOutlinedIcon sx={iconSx} />} label="Phone" value={phone} />
						</Stack>
					)}
				</Box>
			</Stack>

			{about && (
				<Box sx={aboutSx}>
					<Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>
						About
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
						{about}
					</Typography>
				</Box>
			)}

			<Dialog
				open={previewOpen}
				onClose={() => setPreviewOpen(false)}
				fullWidth
				maxWidth="md"
				PaperProps={{ sx: dialogPaperSx }}
			>
				<DialogContent sx={dialogContentSx}>
					<Box
						component="img"
						src={image}
						alt={`${fullName || "Profile"} enlarged`}
						referrerPolicy="no-referrer"
						sx={enlargedImageSx}
					/>
				</DialogContent>

				<DialogActions sx={dialogActionsSx}>
					<PrimaryButton onClick={() => setPreviewOpen(false)}>Close</PrimaryButton>
				</DialogActions>
			</Dialog>
		</Paper>
	);
}
