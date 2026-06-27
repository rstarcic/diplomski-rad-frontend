import { useState } from "react";
import {
	Box,
	Button,
	Card,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Rating,
	Stack,
	Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import ReviewRatingRow from "./ReviewRatingRow";
import ReviewComment from "./ReviewComment";
import { sectionTitleSx, surfaceSectionSx } from "../../theme/layout";

const MAX_PREVIEW_REVIEWS = 2;

const viewAllButtonSx = {
	alignSelf: "center",
	fontWeight: 800,
	textTransform: "none",
};

const dialogTitleSx = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	pr: 1,
};

export default function ReviewSummaryCard({ title = "Reviews", summary = {}, criteria = [], reviews = [] }) {
	const [openReviews, setOpenReviews] = useState(false);

	const totalReviews = summary.totalReviews ?? reviews.length;
	const overallRating = Number(summary.overallRating) || 0;
	const detailCriteria = criteria.filter((item) => item.key !== "overallRating");

	const previewReviews = reviews.slice(0, MAX_PREVIEW_REVIEWS);
	const hasMoreReviews = reviews.length > MAX_PREVIEW_REVIEWS;

	return (
		<>
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

					<Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
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

					{previewReviews.length > 0 && (
						<>
							<Divider />

							<Stack spacing={2}>
								{previewReviews.map((review) => (
									<ReviewComment key={review.id} review={review} criteria={detailCriteria} />
								))}

								{hasMoreReviews && (
									<Button
										variant="text"
										endIcon={<ArrowForwardRoundedIcon />}
										onClick={() => setOpenReviews(true)}
										sx={viewAllButtonSx}
									>
										View all reviews
									</Button>
								)}
							</Stack>
						</>
					)}
				</Stack>
			</Card>

			<Dialog open={openReviews} onClose={() => setOpenReviews(false)} maxWidth="md" fullWidth>
				<DialogTitle sx={dialogTitleSx}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 900 }}>
							{title}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{totalReviews} reviews
						</Typography>
					</Box>

					<IconButton onClick={() => setOpenReviews(false)}>
						<CloseRoundedIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent dividers>
					<Stack spacing={2.5}>
						{reviews.map((review) => (
							<ReviewComment key={review.id} review={review} criteria={detailCriteria} />
						))}
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}
