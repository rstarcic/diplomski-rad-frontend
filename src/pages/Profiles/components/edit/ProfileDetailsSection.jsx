import { Box, Grid, Stack, Typography } from "@mui/material";

import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

import { surfaceSectionSx } from "../../../../theme/layout";

export default function ProfileDetailsSection({
	profileData,
	updateField,
	saving = false,
	aboutPlaceholder = "Write a short introduction for your profile.",
}) {
	return (
		<Box sx={surfaceSectionSx}>
			<Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
				Profile details
			</Typography>

			<Stack spacing={2}>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="First name"
							name="firstName"
							value={profileData.firstName}
							onChange={updateField("firstName")}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Last name"
							name="lastName"
							value={profileData.lastName}
							onChange={updateField("lastName")}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField
							label="Email"
							name="email"
							type="email"
							value={profileData.email}
							onChange={updateField("email")}
						/>
					</Grid>

					<Grid size={{ xs: 12, sm: 6 }}>
						<PrimaryTextField label="Phone" name="phone" value={profileData.phone} onChange={updateField("phone")} />
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
						<PrimaryTextField label="City" name="city" value={profileData.city} onChange={updateField("city")} />
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
					<PrimaryButton type="submit" size="large" loading={saving} sx={{ width: { xs: "100%", sm: "50%" } }}>
						Save profile
					</PrimaryButton>
				</Box>
			</Stack>
		</Box>
	);
}
