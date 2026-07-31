import { useState } from "react";
import { Card, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import ReviewRatingRow from "./ReviewRatingRow";
import { reviewCriteria } from "./reviewCriteria.config";
import AppAlert from "../ui/AppAlert";
import { surfaceSectionSx } from "../../theme/layout";
import { parseApiError } from "../../utils/parseApiError";

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
	const [submitting, setSubmitting] = useState(false);
	const [feedback, setFeedback] = useState(null);

	const normalizedComment = comment.trim();
	const isValid =
		normalizedComment.length >= 10 &&
		normalizedComment.length <= 1000 &&
		Object.values(ratings).every((rating) => rating >= 1 && rating <= 5);

	function handleRatingChange(key, value) {
		setRatings((prev) => ({
			...prev,
			[key]: value || 0,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (!isValid || submitting) return;

		try {
			setSubmitting(true);
			setFeedback(null);

			await onSubmit?.({
				type,
				ratings,
				comment: normalizedComment,
			});

			setFeedback({
				severity: "success",
				title: "Review submitted",
				message: "Your review was submitted successfully.",
			});
			setRatings(createInitialRatings(criteria));
			setComment("");
		} catch (error) {
			const apiError = parseApiError(
				error,
				{},
				"Your review could not be submitted. Please try again.",
			);

			setFeedback({
				severity: "error",
				title: "Review could not be submitted",
				message: apiError.message,
			});
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<Card sx={{ ...surfaceSectionSx }}>
			<Box component="form" noValidate onSubmit={handleSubmit}>
				<Stack spacing={2}>
					{feedback && (
						<AppAlert severity={feedback.severity} title={feedback.title}>
							{feedback.message}
						</AppAlert>
					)}

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
						error={comment.length > 0 && !isValid && normalizedComment.length < 10}
						helperText={`${normalizedComment.length}/1000 characters (minimum 10)`}
						slotProps={{ htmlInput: { maxLength: 1000 } }}
						fullWidth
					/>

					<Button
						type="submit"
						variant="contained"
						disabled={!isValid || submitting}
						sx={{ alignSelf: "flex-end" }}
					>
						{submitting ? "Submitting..." : submitLabel}
					</Button>
				</Stack>
			</Box>
		</Card>
	);
}
