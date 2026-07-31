import { Box, Typography } from "@mui/material";

import {
	contactBoxSx,
	contactIconSx,
	contactTextSx,
} from "./ContractorProfileSection.styles";

export default function ProfileContactItem({ icon: Icon, children }) {
	return (
		<Box sx={contactBoxSx}>
			<Icon sx={contactIconSx} />
			<Typography variant="body2" sx={contactTextSx}>
				{children}
			</Typography>
		</Box>
	);
}
