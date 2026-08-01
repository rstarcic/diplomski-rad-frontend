import { Box, Typography } from "@mui/material";

import {
	profileContactBoxSx,
	profileContactIconSx,
	profileContactTextSx,
} from "../../../../components/profile/profileContact.styles";

export default function ProfileContactItem({ icon: Icon, children }) {
	return (
		<Box sx={profileContactBoxSx}>
			<Icon sx={profileContactIconSx} />
			<Typography variant="body2" sx={profileContactTextSx}>
				{children}
			</Typography>
		</Box>
	);
}
