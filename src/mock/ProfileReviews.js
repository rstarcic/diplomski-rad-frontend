export const clientProfileReviewData = {
    targetType: "client",
    targetId: "client-1",

    summary: {
        totalReviews: 18,
        overallRating: 4.9,
        ratings: {
            requirementsClarityRating: 4.7,
            communicationRating: 4.8,
        },
    },

    reviews: [
        {
            id: "review-1",
            comment: "Clear requirements, quick feedback, and very professional communication.",
            createdAt: "2026-05-30T12:00:00",
            reviewer: {
                id: "contractor-1",
                firstName: "Mia",
                lastName: "K.",
                imageUrl: "",
            },
            overallRating: 5,
            ratings: {
                requirementsClarityRating: 5,
                communicationRating: 5,
            },
        },
        {
            id: "review-2",
            comment: "Good client and smooth collaboration throughout the project.",
            createdAt: "2026-05-28T09:30:00",
            reviewer: {
                id: "contractor-2",
                firstName: "Ivan",
                lastName: "P.",
                imageUrl: "",
            },
            overallRating: 4.5,
            ratings: {
                requirementsClarityRating: 4.5,
                communicationRating: 4.5,
            },
        },
    ],
};

export const contractorProfileReviewData = {
    targetType: "contractor",
    targetId: "contractor-1",

    summary: {
        totalReviews: 24,
        overallRating: 4.8,
        ratings: {
            workQualityRating: 4.9,
            communicationRating: 4.7,
        },
    },

    reviews: [
        {
            id: "contractor-review-1",
            comment: "Excellent work quality and very professional communication.",
            createdAt: "2026-05-30T12:00:00",
            reviewer: {
                id: "client-1",
                firstName: "Luka",
                lastName: "M.",
                imageUrl: "",
            },
            overallRating: 5,
            ratings: {
                workQualityRating: 5,
                communicationRating: 5,
            },
        },
        {
            id: "contractor-review-2",
            comment: "Delivered everything on time and kept us updated throughout the project.",
            createdAt: "2026-05-27T14:20:00",
            reviewer: {
                id: "client-2",
                firstName: "Ana",
                lastName: "B.",
                imageUrl: "",
            },
            overallRating: 4.5,
            ratings: {
                workQualityRating: 4.5,
                communicationRating: 4.5,
            },
        },
    ],
};