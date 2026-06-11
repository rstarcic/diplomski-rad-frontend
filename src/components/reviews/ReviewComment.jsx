import { useState } from "react";
import { Avatar, Box, Button, Collapse, Rating, Stack, Typography } from "@mui/material";

import ReviewRatingRow from "./ReviewRatingRow";

const reviewItemSx = {
	pb: 2,
	borderBottom: 1,
	borderColor: "divider",
	"&:last-child": {
		pb: 0,
		borderBottom: "none",
	},
};

const reviewHeaderSx = {
	justifyContent: "space-between",
	alignItems: { xs: "flex-start", sm: "center" },
	gap: 0.5,
};

const ratingDetailsSx = {
	pl: { xs: 0, sm: 6 },
};

const getReviewerName = (reviewer = {}) => {
	return [reviewer.firstName, reviewer.lastName].filter(Boolean).join(" ") || "Anonymous";
};

export default function ReviewComment({ review, criteria = [] }) {
	const [expanded, setExpanded] = useState(false);

	const reviewerName = getReviewerName(review.reviewer);
	const overallRating = review?.overallRating ?? 0;

	return (
		<Box sx={reviewItemSx}>
			<Stack spacing={1.25}>
				<Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
					<Avatar src={review.reviewer?.imageUrl} sx={{ width: 36, height: 36 }}>
						{reviewerName.charAt(0)}
					</Avatar>

					<Box sx={{ flex: 1, minWidth: 0 }}>
						<Stack direction={{ xs: "column", sm: "row" }} sx={reviewHeaderSx}>
							<Typography variant="body2" sx={{ fontWeight: 800 }}>
								{reviewerName}
							</Typography>

							<Rating value={overallRating} precision={0.5} readOnly size="small" />
						</Stack>

						{review.comment && (
							<Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
								{review.comment}
							</Typography>
						)}
					</Box>
				</Stack>

				{criteria.length > 0 && (
					<Box sx={ratingDetailsSx}>
						<Button
							type="button"
							size="small"
							onClick={() => setExpanded((prev) => !prev)}
							sx={{ px: 0, fontWeight: 800 }}
						>
							{expanded ? "Hide rating details" : "Show rating details"}
						</Button>

						<Collapse in={expanded}>
							<Stack spacing={0.75} sx={{ mt: 1 }}>
								{criteria.map((item) => (
									<ReviewRatingRow
										key={item.key}
										label={item.label}
										value={review.ratings?.[item.key] ?? 0}
										readOnly
										size="small"
									/>
								))}
							</Stack>
						</Collapse>
					</Box>
				)}
			</Stack>
		</Box>
	);
}
