import { Box, Typography } from "@mui/material";

import { detailItemSx, detailLabelSx, fullWidthItemSx } from "./ContractDetailsSection.styles";

export default function ContractDetail({ label, children, fullWidth = false }) {
	return (
		<Box sx={[detailItemSx, fullWidth && fullWidthItemSx]}>
			<Typography variant="caption" color="text.secondary" sx={detailLabelSx}>
				{label}
			</Typography>

			<Typography variant="body2" fontWeight={700}>
				{children || "Not provided"}
			</Typography>
		</Box>
	);
}

