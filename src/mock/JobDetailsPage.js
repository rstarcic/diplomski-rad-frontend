export const MOCK_JOB_DETAILS = {
    id: "job_1",
    title: "Senior Frontend Developer",
    description:
        "Build responsive React interfaces for a SaaS dashboard. You will work on reusable components, data-heavy pages, and polished user flows for contractors and clients.",
    category: "Web development",
    workMode: "Remote",
    location: "Remote",
    budgetType: "Hourly",
    hourlyRate: 50,
    status: "Open",
    deadline: "2026-07-15",
    skills: ["React", "JavaScript", "MUI", "REST API"],

    client: {
        id: "client_1",
        firstName: "Ana",
        lastName: "Horvat",
        profileImageUrl: "https://i.pravatar.cc/120?img=12",
        title: "Product Lead at Tech Company",
        location: "Zagreb, Croatia",
        memberSince: "2024-03-12",
        jobsPosted: 18,

        reviewSummary: {
            totalReviews: 4,
            overallRating: 4.8,
            ratings: {
                communication: 4.9,
                clarity: 4.7,
                payment: 5.0,
                professionalism: 4.8,
            },
        },

        reviewCriteria: [
            { key: "communication", label: "Communication" },
            { key: "clarity", label: "Clarity" },
            { key: "payment", label: "Payment" },
            { key: "professionalism", label: "Professionalism" },
        ],

        reviews: [
            {
                id: "review_1",
                reviewerName: "Marko Kovač",
                reviewerAvatarUrl: "https://i.pravatar.cc/120?img=15",
                overallRating: 5,
                comment: "Ana was clear, responsive, and very easy to work with. Requirements were well explained.",
                createdAt: "2026-05-20",
                ratings: {
                    communication: 5,
                    clarity: 5,
                    payment: 5,
                    professionalism: 5,
                },
            },
            {
                id: "review_2",
                reviewerName: "Ivana Babić",
                reviewerAvatarUrl: "https://i.pravatar.cc/120?img=20",
                overallRating: 4.5,
                comment: "Good collaboration and fast feedback. The project scope was realistic and organized.",
                createdAt: "2026-04-12",
                ratings: {
                    communication: 4.5,
                    clarity: 4.5,
                    payment: 5,
                    professionalism: 4.5,
                },
            },
        ],
    },
};