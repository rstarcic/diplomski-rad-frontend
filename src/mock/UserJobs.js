export const MOCK_USER_JOBS = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        category: "Web Development",
        workMode: "Remote",
        location: "Remote",
        budgetType: "Hourly",
        budgetAmount: 50,
        status: "OPEN",
        deadline: "2024-12-31",
        createdAt: "2024-06-01",
        description:
            "We are building a SaaS dashboard used by thousands of clients and contractors. You will own the frontend — reusable components, data tables, charts, complex forms, and responsive layouts. React + MUI codebase.",
        durationDays: 45,
        hoursPerWeek: 20,
        requirements: [
            "3+ years of experience with React",
            "Strong knowledge of MUI component customization",
            "Experience integrating REST APIs",
            "Comfortable with responsive, mobile-first layouts",
        ],
        deliverables:
            "Fully functional dashboard UI with at least 8 reusable components, responsive across mobile and desktop. Documented component library and unit tests.",
        applications: {
            total: 18,
            new: 5,
        },
        contracts: {
            status: "ACTIVE",
        },
        payments: {
            status: "PENDING",
        },
    },

    {
        id: 2,
        title: "Landing Page UI Designer",
        category: "UI/UX Design",
        workMode: "Hybrid",
        location: "Zagreb",
        budgetType: "Fixed",
        budgetAmount: 5000,
        status: "OPEN",
        deadline: "2024-11-20",
        createdAt: "2024-05-15",
        description:
            "Design a high-converting landing page for our SaaS product. The page needs to clearly communicate value propositions, include a pricing section, and be optimised for mobile.",
        durationDays: 14,
        hoursPerWeek: 20,
        requirements: [
            "Figma proficiency",
            "Experience designing SaaS landing pages",
            "Understanding of conversion-focused design",
        ],
        deliverables:
            "Complete Figma file with desktop and mobile variants, exported assets, and a short handoff document.",
        applications: {
            total: 9,
            new: 2,
        },
        contracts: {
            status: null,
        },
        payments: {
            status: null,
        },
    },

    {
        id: 3,
        title: "Backend API Developer",
        category: "Backend Development",
        workMode: "On-site",
        location: "Split",
        budgetType: "Hourly",
        budgetAmount: 60,
        status: "IN_PROGRESS",
        deadline: "2025-01-15",
        createdAt: "2024-06-10",
        description:
            "Build a FastAPI microservice backend for our platform. Includes auth, job management, applications, contracts, and payment integration with Stripe.",
        durationDays: 60,
        hoursPerWeek: 40,
        requirements: [
            "Python and FastAPI experience",
            "PostgreSQL and SQLAlchemy",
            "Docker and Docker Compose",
            "Stripe API knowledge is a plus",
        ],
        deliverables:
            "Complete API with OpenAPI docs, integration tests, and a deployed Docker environment.",
        applications: {
            total: 24,
            new: 0,
        },
        contracts: {
            status: "ACTIVE",
        },
        payments: {
            status: "PARTIALLY_PAID",
        },
    },

    {
        id: 4,
        title: "Mobile App Prototype",
        category: "Mobile Development",
        workMode: "Remote",
        location: "Remote",
        budgetType: "Fixed",
        budgetAmount: 10000,
        status: "OPEN",
        deadline: "2024-12-10",
        createdAt: "2024-07-01",
        description:
            "Create a clickable prototype for our mobile app in React Native. Focus on the onboarding flow, home screen, and core feature screens. No backend integration required.",
        durationDays: 30,
        hoursPerWeek: 20,
        requirements: [
            "React Native experience",
            "Figma or similar prototyping tool",
            "Portfolio of mobile app work",
        ],
        deliverables:
            "Fully interactive prototype covering onboarding, home, and 3 core feature screens. Delivered as an Expo project.",
        applications: {
            total: 12,
            new: 4,
        },
        contracts: {
            status: null,
        },
        payments: {
            status: null,
        },
    },

    {
        id: 5,
        title: "Data Dashboard Analyst",
        category: "Data Analysis",
        workMode: "Hybrid",
        location: "Rijeka",
        budgetType: "Hourly",
        budgetAmount: 40,
        status: "COMPLETED",
        deadline: "2025-02-01",
        createdAt: "2024-04-20",
        description:
            "Analyse user engagement data and build three interactive dashboards with filtering and CSV export. Data lives in PostgreSQL.",
        durationDays: 30,
        hoursPerWeek: 20,
        requirements: ["Python and Pandas", "Tableau or Power BI", "SQL"],
        deliverables:
            "Three interactive dashboards with CSV export and an automated weekly report.",
        applications: {
            total: 15,
            new: 0,
        },
        contracts: {
            status: "COMPLETED",
        },
        payments: {
            status: "PAID",
        },
    },

    {
        id: 6,
        title: "DevOps Setup Consultant",
        category: "DevOps",
        workMode: "Remote",
        location: "Remote",
        budgetType: "Fixed",
        budgetAmount: 8000,
        status: "IN_PROGRESS",
        deadline: "2025-01-05",
        createdAt: "2024-05-28",
        description:
            "Set up a full CI/CD pipeline using GitHub Actions, deploy to AWS ECS, and configure monitoring with CloudWatch.",
        durationDays: 20,
        hoursPerWeek: 40,
        requirements: ["AWS or GCP experience", "Docker and Kubernetes", "GitHub Actions"],
        deliverables: "Complete CI/CD setup with runbook documentation.",
        applications: {
            total: 7,
            new: 1,
        },
        contracts: {
            status: "ACTIVE",
        },
        payments: {
            status: "PENDING",
        },
    },
];
