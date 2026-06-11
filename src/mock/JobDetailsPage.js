export const MOCK_JOB_DETAILS = {
    id: "job_1",
    title: "Senior Frontend Developer",
    description:
        "We are building a SaaS dashboard used by thousands of contractors and clients to manage projects, payments, and communication. You will own the frontend side — designing reusable component architecture, implementing data-heavy tables and charts, handling complex form flows, and ensuring pixel-perfect responsive layouts across all breakpoints. The codebase uses React + MUI and you will collaborate closely with the backend team via REST APIs.",
    category: "Web development",
    workMode: "Remote",
    location: "Remote",
    budgetType: "Hourly",
    budgetAmount: 50,
    status: "Open",
    deadline: "2026-07-15",
    durationDays: 45,
    hoursPerWeek: 20,
    requirements: [
        "3+ years of experience with React",
        "Strong knowledge of MUI component customization",
        "Experience integrating REST APIs",
        "Comfortable with responsive, mobile-first layouts",
    ],
    deliverables:
        "Fully functional dashboard UI with at least 8 reusable components, responsive across mobile and desktop. Documented component library, unit tests for all core components, and a final handoff with Storybook stories.",

    client: {
        id: "client_1",
        firstName: "Ana",
        lastName: "Horvat",
        profileImageUrl: "https://i.pravatar.cc/120?img=12",
        email: "ana.horvat@example.com",
        phone: "+385 91 123 4567",
        country: "Croatia",
        city: "Zagreb",
        about:
            "I run a growing SaaS startup and have hired multiple contractors for various projects. I value clear communication, realistic project scopes, and timely payments. Looking forward to collaborating with talented professionals!",
        createdAt: "2020-01-15",
        reviewSummary: {
            totalReviews: 4,
            overallRating: 4.8,
            ratings: {
                requirementsClarityRating: 4.5,
                communicationRating: 5,
            }
        },
        reviews: [
            {
                id: "review_1",
                comment: "Ana was clear, responsive, and very easy to work with. Requirements were well explained.",
                createdAt: "2026-05-20",
                reviewer: {
                    id: "contractor_1",
                    firstName: "Marko",
                    lastName: "Kovač",
                    image: "https://i.pravatar.cc/120?img=15",
                },
                overallRating: 5,
                ratings: { communication: 5, clarity: 5, payment: 5, professionalism: 5 },
            },
            {
                id: "review_2",
                comment: "Good collaboration and fast feedback. The project scope was realistic and organized.",
                createdAt: "2026-04-12",
                reviewer: {
                    id: "contractor_2",
                    firstName: "Ivana",
                    lastName: "Babić",
                    image: "https://i.pravatar.cc/120?img=20",
                },
                overallRating: 4.5,
                ratings: { communication: 4.5, clarity: 4.5, payment: 5, professionalism: 4.5 },
            },
        ],

    },
}
