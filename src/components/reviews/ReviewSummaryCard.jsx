import { Box, Card, Divider, Rating, Stack, Typography } from "@mui/material";
import ReviewRatingRow from "./ReviewRatingRow";
import ReviewComment from "./ReviewComment";
import { sectionTitleSx, surfaceSectionSx } from "../../theme/layout";

const commentsListSx = {
	maxHeight: 300,
	overflowY: "auto",
	pr: 0.75,
	mr: -0.75,
};

export default function ReviewSummaryCard({ title = "Reviews", summary = {}, criteria = [], reviews = [] }) {
	const totalReviews = summary.totalReviews ?? reviews.length;
	const overallRating = summary.overallRating ?? 0;
	const hasReviews = reviews.length > 0;
	const detailCriteria = criteria.filter((item) => item.key !== "overallRating");

	return (
		<Card sx={surfaceSectionSx}>
			<Stack spacing={2}>
				<Box>
					<Typography variant="h6" sx={sectionTitleSx}>
						{title}
					</Typography>

					<Typography variant="body2" color="text.secondary">
						{totalReviews} reviews
					</Typography>
				</Box>

				<Stack direction="row" spacing={2} alignItems="center">
					<Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1 }}>
						{overallRating.toFixed(1)}
					</Typography>

					<Rating value={overallRating} precision={0.5} readOnly />
				</Stack>

				<Divider />

				<Stack spacing={1}>
					{detailCriteria.map((item) => (
						<ReviewRatingRow
							key={item.key}
							label={item.label}
							value={summary.ratings?.[item.key] ?? 0}
							readOnly
							size="small"
						/>
					))}
				</Stack>

				{hasReviews && (
					<>
						<Divider />

						<Stack spacing={2} sx={commentsListSx}>
							{reviews.map((review) => (
								<ReviewComment key={review.id} review={review} criteria={detailCriteria} />
							))}
						</Stack>
					</>
				)}
			</Stack>
		</Card>
	);
}
