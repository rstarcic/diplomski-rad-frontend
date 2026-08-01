import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Grid, InputAdornment, Stack, Typography } from "@mui/material";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { surfaceSectionSx } from "../../../../theme/layout";

const profileDetailsSectionSx = {
	...surfaceSectionSx,
	boxShadow: (theme) => theme.custom.shadows.surface,
};

const headerSx = {
	alignItems: "center",
	mb: 3,
	pb: 2.5,
	borderBottom: "1px solid",
	borderColor: "divider",
};

const headerIconSx = {
	width: 42,
	height: 42,
	borderRadius: (theme) => theme.custom.radius.circle,
	display: "grid",
	placeItems: "center",
	flexShrink: 0,
	color: "primary.main",
	background: "linear-gradient(145deg, #f2edff, #e6dcff)",
	boxShadow: (theme) => `inset 0 0 0 1px ${theme.custom.tint.primarySoft}`,
};

export default function ProfileDetailsSection({
	profileData,
	updateField,
	saving = false,
	aboutPlaceholder = "Write a short introduction for your profile.",
}) {
	return (
		<Box sx={profileDetailsSectionSx}>
			<Stack direction="row" spacing={1.75} sx={headerSx}>
				<Box sx={headerIconSx}>
					<PersonRoundedIcon sx={{ fontSize: 21 }} />
				</Box>
				<Box sx={{ minWidth: 0 }}>
					<Typography variant="h6" sx={{ fontWeight: 850, lineHeight: 1.25, mb: 0.35 }}>
						Profile details
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
						Information contractors see when you publish a job.
					</Typography>
				</Box>
			</Stack>

			<Stack spacing={2}>
				<Grid container columnSpacing={{ xs: 2, sm: 3 }} rowSpacing={{ xs: 2.5, sm: 3 }}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="First name"
							name="firstName"
							value={profileData.firstName}
							onChange={updateField("firstName")}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<PersonRoundedIcon fontSize="small" />
										</InputAdornment>
									),
								},
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Last name"
							name="lastName"
							value={profileData.lastName}
							onChange={updateField("lastName")}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<PersonRoundedIcon fontSize="small" />
										</InputAdornment>
									),
								},
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Email"
							name="email"
							type="email"
							value={profileData.email}
							onChange={updateField("email")}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<EmailOutlinedIcon fontSize="small" />
										</InputAdornment>
									),
								},
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Phone"
							name="phone"
							value={profileData.phone}
							onChange={updateField("phone")}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<PhoneOutlinedIcon fontSize="small" />
										</InputAdornment>
									),
								},
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Country"
							name="country"
							value={profileData.country}
							onChange={updateField("country")}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="City"
							name="city"
							value={profileData.city}
							onChange={updateField("city")}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<LocationOnOutlinedIcon fontSize="small" />
										</InputAdornment>
									),
								},
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12 }}>
						<PrimaryTextField
							label="About"
							name="about"
							value={profileData.about}
							onChange={updateField("about")}
							placeholder={aboutPlaceholder}
							multiline
							minRows={4}
						/>
					</Grid>
				</Grid>

				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<PrimaryButton
						type="submit"
						size="large"
						loading={saving}
						startIcon={<SaveOutlinedIcon />}
						sx={{ width: { xs: "100%", sm: "55%" } }}
					>
						Save profile
					</PrimaryButton>
				</Box>
			</Stack>
		</Box>
	);
}
