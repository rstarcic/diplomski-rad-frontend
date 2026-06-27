import { useState } from "react";
import { Card, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import ReviewRatingRow from "./ReviewRatingRow";
import { reviewCriteria } from "./reviewCriteria";
import { surfaceSectionSx } from "../../theme/layout";

function createInitialRatings(criteria, initialValues = {}) {
	return criteria.reduce((acc, item) => {
		acc[item.key] = initialValues[item.key] ?? 0;
		return acc;
	}, {});
}

export default function ReviewForm({
	type,
	title,
	subtitle,
	initialValues = {},
	submitLabel = "Submit review",
	onSubmit,
}) {
	const criteria = reviewCriteria[type] || [];
	const [ratings, setRatings] = useState(() => createInitialRatings(criteria, initialValues));
	const [comment, setComment] = useState(initialValues.comment || "");

	const isValid = criteria.every((item) => ratings[item.key] > 0) && comment.trim().length > 0;

	function handleRatingChange(key, value) {
		setRatings((prev) => ({
			...prev,
			[key]: value || 0,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (!isValid) return;

		onSubmit?.({
			type,
			ratings,
			comment: comment.trim(),
		});
	}

	return (
		<Card sx={{ ...surfaceSectionSx }}>
			<Box component="form" noValidate onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 800 }}>
							{title}
						</Typography>

						{subtitle && (
							<Typography variant="body2" color="text.secondary">
								{subtitle}
							</Typography>
						)}
					</Box>

					<Divider />

					<Stack spacing={1.25}>
						{criteria.map((item) => (
							<ReviewRatingRow
								key={item.key}
								label={item.label}
								value={ratings[item.key]}
								onChange={(value) => handleRatingChange(item.key, value)}
							/>
						))}
					</Stack>

					<TextField
						label="Comment"
						placeholder="Write a short comment about your experience..."
						value={comment}
						onChange={(event) => setComment(event.target.value)}
						multiline
						minRows={4}
						fullWidth
					/>

					<Button type="submit" variant="contained" disabled={!isValid} sx={{ alignSelf: "flex-end" }}>
						{submitLabel}
					</Button>
				</Stack>
			</Box>
		</Card>
	);
}
