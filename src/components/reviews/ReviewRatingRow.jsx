import { Box, Rating, Typography } from "@mui/material";

const ratingRowSx = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	gap: 2,
	flexWrap: "wrap",
};

export default function ReviewRatingRow({ label, value, onChange, readOnly = false, size = "small" }) {
	return (
		<Box sx={ratingRowSx}>
			<Typography variant="body2" color="text.secondary">
				{label}
			</Typography>

			<Rating
				value={value || 0}
				precision={0.5}
				readOnly={readOnly}
				size={size}
				onChange={(event, newValue) => onChange?.(newValue)}
			/>
		</Box>
	);
}
