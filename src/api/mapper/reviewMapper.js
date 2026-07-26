import { mapReviewFromAPI } from "./profileMapper.js";

export function mapReviewToAPI(review = {}) {
	const ratings = review.ratings ?? {};

	return {
		comment: review.comment?.trim() ?? "",
		communication_rating: Number(ratings.communicationRating),
		clarity_rating: Number(ratings.clarityRating),
		reliability_rating: Number(ratings.reliabilityRating),
		collaboration_rating: Number(ratings.collaborationRating),
	};
}

export function mapSubmittedReviewFromAPI(review = {}) {
	return {
		...mapReviewFromAPI(review),
		jobId: review.jobId ?? review.job_id,
	};
}
