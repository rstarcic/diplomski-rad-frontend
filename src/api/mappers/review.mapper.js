import { splitFullName } from "./profile.mapper";

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


export function mapRatingsFromAPI(ratings = {}) {
	return {
		communicationRating: ratings.communicationRating ?? ratings.communication_rating ?? 0,
		clarityRating: ratings.clarityRating ?? ratings.clarity_rating ?? 0,
		reliabilityRating: ratings.reliabilityRating ?? ratings.reliability_rating ?? 0,
		collaborationRating: ratings.collaborationRating ?? ratings.collaboration_rating ?? 0,
	};
}

export function mapReviewerFromAPI(reviewer = {}) {
	const { firstName, lastName } = splitFullName(reviewer.fullName ?? reviewer.full_name);

	return {
		id: reviewer.userId ?? reviewer.user_id ?? reviewer.id,
		firstName,
		lastName,
		imageUrl: reviewer.profile_picture ?? "",
	};
}

export function mapReviewFromAPI(review = {}) {
	return {
		id: review.id,
		comment: review.comment ?? "",
		createdAt: review.createdAt ?? review.created_at ?? "",
		reviewer: mapReviewerFromAPI(review.reviewer ?? {}),
		rawOverallRating: review.rawOverallRating ?? review.raw_overall_rating,
		overallRating: review.overallRating ?? review.overall_rating ?? 0,
		ratings: mapRatingsFromAPI(review.ratings ?? {}),
	};
}

export function mapReviewSummaryFromAPI(summary = {}) {
	return {
		totalReviews: summary.totalReviews ?? summary.total_reviews ?? 0,
		overallRating: summary.overallRating ?? summary.overall_rating ?? 0,
		rawOverallRating: summary.rawOverallRating ?? summary.raw_overall_rating,
		ratings: mapRatingsFromAPI(summary.ratings ?? {}),
	};
}

export function mapReviewDataFromAPI(reviewsData = {}) {
	return {
		summary: mapReviewSummaryFromAPI(reviewsData.summary ?? {}),
		reviews: (reviewsData.items ?? []).map(mapReviewFromAPI),
	};
}
