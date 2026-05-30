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