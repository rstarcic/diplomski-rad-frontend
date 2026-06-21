export const clientProfileReviewData = {
    targetType: "client",
    targetId: "client-1",

    summary: {
        totalReviews: 18,
        overallRating: 5.0,
        ratings: {
            communicationRating: 5.0,
            clarityRating: 5.0,
            reliabilityRating: 5.0,
            collaborationRating: 5.0,
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
            rawOverallRating: 4.9,
            overallRating: 5.0,
            ratings: {
                communicationRating: 5.0,
                clarityRating: 5.0,
                reliabilityRating: 5.0,
                collaborationRating: 5.0,
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
                communicationRating: 4.5,
                clarityRating: 4.5,
                reliabilityRating: 4.5,
                collaborationRating: 4.5,
            },
        },
    ],
};

export const contractorProfileReviewData = {
    targetType: "contractor",
    targetId: "contractor-1",

    summary: {
        totalReviews: 24,
        overallRating: 4.5,
        rawOverallRating: 4.9,
        ratings: {
            communicationRating: 4.5,
            clarityRating: 3.0,
            reliabilityRating: 4.5,
            collaborationRating: 4.0,
        },
    },

    reviews: [
        {
            id: "contractor-review-1",
            comment: "Delivered everything ahead of schedule. Communication was excellent and progress updates were frequent.",
            createdAt: "2026-05-30T12:00:00",
            reviewer: {
                id: "client-1",
                firstName: "Luka",
                lastName: "M.",
                imageUrl: "",
            },
            rawOverallRating: 4.9,
            overallRating: 5.0,
            ratings: {
                communicationRating: 5.0,
                clarityRating: 5.0,
                reliabilityRating: 5.0,
                collaborationRating: 5.0,
            },
        },
        {
            id: "contractor-review-2",
            comment: "Very skilled developer. The final result matched our expectations and minor revisions were handled quickly.",
            createdAt: "2026-05-27T14:20:00",
            reviewer: {
                id: "client-2",
                firstName: "Ana",
                lastName: "B.",
                imageUrl: "",
            },
            rawOverallRating: 4.7,
            overallRating: 4.5,
            ratings: {
                communicationRating: 4.5,
                clarityRating: 4.5,
                reliabilityRating: 5.0,
                collaborationRating: 4.5,
            },
        },
        {
            id: "contractor-review-3",
            comment: "Great experience overall. The contractor was proactive and suggested several improvements we hadn't considered.",
            createdAt: "2026-05-21T10:15:00",
            reviewer: {
                id: "client-3",
                firstName: "Sara",
                lastName: "K.",
                imageUrl: "",
            },
            rawOverallRating: 5.0,
            overallRating: 5.0,
            ratings: {
                communicationRating: 5.0,
                clarityRating: 5.0,
                reliabilityRating: 5.0,
                collaborationRating: 5.0,
            },
        },
        {
            id: "contractor-review-4",
            comment: "Work quality was excellent. There were a few delays in responses, but the project was delivered successfully.",
            createdAt: "2026-05-15T08:45:00",
            reviewer: {
                id: "client-4",
                firstName: "Petra",
                lastName: "N.",
                imageUrl: "",
            },
            rawOverallRating: 4.4,
            overallRating: 4.5,
            ratings: {
                communicationRating: 4.0,
                clarityRating: 4.5,
                reliabilityRating: 4.5,
                collaborationRating: 4.5,
            },
        },
        {
            id: "contractor-review-5",
            comment: "Professional, reliable, and easy to work with. Would definitely hire again for future projects.",
            createdAt: "2026-05-10T16:30:00",
            reviewer: {
                id: "client-5",
                firstName: "Ivan",
                lastName: "R.",
                imageUrl: "",
            },
            rawOverallRating: 4.8,
            overallRating: 5.0,
            ratings: {
                communicationRating: 5.0,
                clarityRating: 4.5,
                reliabilityRating: 5.0,
                collaborationRating: 5.0,
            },
        },
        {
            id: "contractor-review-6",
            comment: "Professional, reliable, and easy to work with. Would definitely hire again for future projects.",
            createdAt: "2026-05-10T16:30:00",
            reviewer: {
                id: "client-5",
                firstName: "Ivan",
                lastName: "R.",
                imageUrl: "",
            },
            rawOverallRating: 4.8,
            overallRating: 5.0,
            ratings: {
                communicationRating: 5.0,
                clarityRating: 4.5,
                reliabilityRating: 5.0,
                collaborationRating: 5.0,
            },
        },
    ],
};