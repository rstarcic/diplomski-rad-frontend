function splitFullName(fullName = "") {
    const parts = fullName.trim().split(" ");
    return {
        firstName: parts[0] ?? "",
        lastName: parts.slice(1).join(" "),
    };
}

export function mapProfileFromAPI(profile = {}) {
    const { firstName, lastName } = splitFullName(profile.full_name);

    return {
        firstName,
        lastName,
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        country: profile.country ?? "",
        city: profile.city ?? "",
        about: profile.about ?? "",
        image: profile.profile_picture ?? null,
        role: profile.role ?? "",
        profileCompleted: profile.profile_completed ?? false,
    };
}

export function mapProfileToAPI(formData = {}) {
    const payload = {
        profile: {
            full_name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            about: formData.about,
        },
    };

    if (formData.skills) {
        payload.skills = mapSkillsToAPI(formData.skills);
    }

    if (formData.portfolio) {
        payload.portfolio = formData.portfolio.map(mapPortfolioItemToAPI);
    }

    return payload;
}

export function mapProfileToFormData(formData = {}) {
    const multipartPayload = new FormData();
    const payload = mapProfileToAPI(formData);

    Object.entries(payload.profile).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            multipartPayload.append(key, value);
        }
    });

    if (payload.skills) {
        multipartPayload.append("skills", JSON.stringify(payload.skills));
    }

    if (payload.portfolio) {
        multipartPayload.append("portfolio", JSON.stringify(payload.portfolio));
    }

    multipartPayload.append("profile_picture", formData.image);

    return multipartPayload;
}

export function mapRatingsFromAPI(ratings = {}) {
    return {
        communicationRating: ratings.communication_rating ?? 0,
        clarityRating: ratings.clarity_rating ?? 0,
        reliabilityRating: ratings.reliability_rating ?? 0,
        collaborationRating: ratings.collaboration_rating ?? 0,
    };
}

export function mapReviewerFromAPI(reviewer = {}) {
    const { firstName, lastName } = splitFullName(reviewer.full_name);

    return {
        id: reviewer.id,
        firstName,
        lastName,
        imageUrl: reviewer.profile_picture ?? "",
    };
}

export function mapReviewFromAPI(review = {}) {
    return {
        id: review.id,
        comment: review.comment ?? "",
        createdAt: review.created_at ?? "",
        reviewer: mapReviewerFromAPI(review.reviewer ?? {}),
        rawOverallRating: review.raw_overall_rating,
        overallRating: review.overall_rating ?? 0,
        ratings: mapRatingsFromAPI(review.ratings ?? {}),
    };
}

export function mapReviewSummaryFromAPI(summary = {}) {
    return {
        totalReviews: summary.total_reviews ?? 0,
        overallRating: summary.overall_rating ?? 0,
        rawOverallRating: summary.raw_overall_rating,
        ratings: mapRatingsFromAPI(summary.ratings ?? {}),
    };
}

export function mapReviewDataFromAPI(reviewsData = {}) {
    return {
        summary: mapReviewSummaryFromAPI(reviewsData.summary ?? {}),
        reviews: (reviewsData.items ?? []).map(mapReviewFromAPI),
    };
}

export function mapPortfolioItemFromAPI(item = {}) {
    return {
        id: item.id,
        title: item.title ?? "",
        description: item.description ?? "",
        image: item.image_url ?? item.image ?? null,
        url: item.project_url ?? item.url ?? "",
    };
}

export function mapSkillsFromAPI(skills = []) {
    return skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
    }));
}

export function mapPortfolioItemToAPI(item = {}) {
    const payload = {
        title: item.title,
        description: item.description,
        image_url: item.image,
        project_url: item.url,
    };

    if (item.id) {
        payload.id = item.id;
    }

    return payload;
}

export function mapSkillsToAPI(skills = []) {
    return skills.map((skill) => {
        if (typeof skill === "string") {
            return { name: skill };
        }

        const payload = {
            name: skill.name,
        };

        if (skill.id) {
            payload.id = skill.id;
        }

        return payload;
    });
}
