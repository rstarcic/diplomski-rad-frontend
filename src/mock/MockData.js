// ─── USERS ────────────────────────────────────────────────────────────────────

export const MOCK_CLIENTS = [
    {
        id: "client_1",
        firstName: "Ana",
        lastName: "Horvat",
        email: "ana.horvat@example.com",
        phone: "+385 91 123 4567",
        country: "Croatia",
        city: "Zagreb",
        about: "I run a growing SaaS startup and have hired multiple contractors for various projects. I value clear communication, realistic project scopes, and timely payments.",
        profileImageUrl: "https://i.pravatar.cc/120?img=12",
        createdAt: "2020-01-15",
    },
    {
        id: "client_2",
        firstName: "Petra",
        lastName: "Novak",
        email: "petra.novak@example.com",
        phone: "+385 98 765 4321",
        country: "Croatia",
        city: "Split",
        about: "Product manager at a digital agency. I hire contractors for design and development projects.",
        profileImageUrl: "https://i.pravatar.cc/120?img=25",
        createdAt: "2021-03-10",
    },
];

export const MOCK_CONTRACTORS = [
    {
        id: "contractor_1",
        firstName: "Marko",
        lastName: "Kovač",
        email: "marko.kovac@example.com",
        phone: "+385 95 111 2222",
        country: "Croatia",
        city: "Rijeka",
        about: "Senior full-stack developer with 7 years of experience. Specialised in React, FastAPI, and PostgreSQL.",
        profileImageUrl: "https://i.pravatar.cc/120?img=15",
        createdAt: "2019-06-20",
    },
    {
        id: "contractor_2",
        firstName: "Luka",
        lastName: "Perić",
        email: "luka.peric@example.com",
        phone: "+385 91 333 4444",
        country: "Croatia",
        city: "Osijek",
        about: "Frontend developer with 3 years of experience. React, TypeScript, and MUI.",
        profileImageUrl: "https://i.pravatar.cc/120?img=20",
        createdAt: "2022-01-05",
    },
    {
        id: "contractor_3",
        firstName: "Sara",
        lastName: "Babić",
        email: "sara.babic@example.com",
        phone: "+385 98 555 6666",
        country: "Croatia",
        city: "Zadar",
        about: "UI/UX designer and frontend developer. Figma, React, and accessible design.",
        profileImageUrl: "https://i.pravatar.cc/120?img=30",
        createdAt: "2021-09-15",
    },
    {
        id: "contractor_4",
        firstName: "Ivan",
        lastName: "Marić",
        email: "ivan.maric@example.com",
        phone: "+385 95 777 8888",
        country: "Croatia",
        city: "Zagreb",
        about: "DevOps engineer and cloud architect. AWS, Docker, Kubernetes, and CI/CD pipelines.",
        profileImageUrl: "https://i.pravatar.cc/120?img=35",
        createdAt: "2020-11-30",
    },
];

// ─── JOBS ─────────────────────────────────────────────────────────────────────
// Covers:  OPEN | IN_PROGRESS | COMPLETED | CANCELLED

export const MOCK_JOBS = [

    // ── OPEN: Ana published this job, applications coming in
    {
        id: "job_2",
        clientId: "client_1",
        title: "Senior Frontend Developer",
        category: "Web Development",
        description: "We are building a SaaS dashboard used by thousands of clients and contractors. You will own the frontend — reusable components, data tables, charts, complex forms, and responsive layouts. React + MUI codebase.",
        workMode: "Remote",
        location: "Remote",
        budgetType: "Hourly",
        budgetAmount: 50,
        status: "OPEN",
        deadline: "2026-08-15",
        durationDays: 45,
        hoursPerWeek: 20,
        requirements: [
            "3+ years of experience with React",
            "Strong knowledge of MUI component customization",
            "Experience integrating REST APIs",
            "Comfortable with responsive, mobile-first layouts",
        ],
        deliverables: "Fully functional dashboard UI with at least 8 reusable components, responsive across mobile and desktop. Documented component library and unit tests.",
        createdAt: "2026-06-01",
        updatedAt: "2026-06-01",
    },

    // ── IN_PROGRESS: Ana has an active contract with Marko on this job
    {
        id: "job_3",
        clientId: "client_1",
        title: "Backend API Developer",
        category: "Backend Development",
        description: "Build a FastAPI microservice backend for our platform. Includes auth, job management, applications, contracts, and payment integration with Stripe.",
        workMode: "On-site",
        location: "Split",
        budgetType: "Hourly",
        budgetAmount: 60,
        status: "IN_PROGRESS",
        deadline: "2026-07-30",
        durationDays: 60,
        hoursPerWeek: 40,
        requirements: [
            "Python and FastAPI experience",
            "PostgreSQL and SQLAlchemy",
            "Docker and Docker Compose",
            "Stripe API knowledge is a plus",
        ],
        deliverables: "Complete API with OpenAPI docs, integration tests, and a deployed Docker environment.",
        createdAt: "2026-05-01",
        updatedAt: "2026-05-15",
    },

    // ── COMPLETED: Job is done, contract closed, payment made, reviews left
    {
        id: "job_4",
        clientId: "client_1",
        title: "Data Dashboard Analyst",
        category: "Data Analysis",
        description: "Analyse user engagement data and build three interactive dashboards with filtering and CSV export. Data lives in PostgreSQL.",
        workMode: "Hybrid",
        location: "Rijeka",
        budgetType: "Hourly",
        budgetAmount: 40,
        status: "COMPLETED",
        deadline: "2026-05-01",
        durationDays: 30,
        hoursPerWeek: 20,
        requirements: ["Python and Pandas", "Tableau or Power BI", "SQL"],
        deliverables: "Three interactive dashboards with CSV export and an automated weekly report.",
        createdAt: "2026-03-01",
        updatedAt: "2026-05-02",
    },

    // ── CANCELLED: Ana cancelled the job before the contractor could sign
    {
        id: "job_5",
        clientId: "client_1",
        title: "DevOps Setup Consultant",
        category: "DevOps",
        description: "Set up a full CI/CD pipeline using GitHub Actions, deploy to AWS ECS, and configure monitoring with CloudWatch.",
        workMode: "Remote",
        location: "Remote",
        budgetType: "Fixed",
        budgetAmount: 8000,
        status: "CANCELLED",
        deadline: "2026-06-01",
        durationDays: 20,
        hoursPerWeek: 40,
        requirements: ["AWS or GCP experience", "Docker and Kubernetes", "GitHub Actions"],
        deliverables: "Complete CI/CD setup with runbook documentation.",
        createdAt: "2026-04-01",
        updatedAt: "2026-04-20",
    },
];

// ─── APPLICATIONS ─────────────────────────────────────────────────────────────
// Covers: PENDING | NEGOTIATING | ACCEPTED | REJECTED | WITHDRAWN
// All on job_2 (OPEN) except accepted/withdrawn which link to in-progress/cancelled jobs

export const MOCK_APPLICATIONS = [
    // ── PENDING: Ivan just applied, Ana hasn't responded yet
    {
        id: "app_1",
        jobId: "job_2",
        status: "PENDING",
        coverLetter: "I have 5 years of React experience and have built complex data-heavy dashboards for fintech clients. I am comfortable with MUI and REST integrations. Looking forward to contributing to your project. I have 5 years of React experience and have built complex data- heavy dashboards for fintech clients.I am comfortable with MUI and REST integrations.Looking forward to contributing to your project.",
        contractor: {
            id: "contractor_4",
            firstName: "Ivan",
            lastName: "Marić",
            city: "Zagreb",
            country: "Croatia",
            profileImageUrl: "https://i.pravatar.cc/120?img=35",
        },
        createdAt: "2026-06-08",
        updatedAt: "2026-06-08",
    },

    // ── NEGOTIATING: Sara applied, Ana opened a negotiation, currently waiting for Ana (client) to respond
    {
        id: "app_2",
        jobId: "job_2",
        status: "NEGOTIATING",
        coverLetter: "I specialise in MUI-based applications and REST API integrations. I have shipped three dashboard products in the last two years. Excited about this project.",
        contractor: {
            id: "contractor_3",
            firstName: "Sara",
            lastName: "Babić",
            city: "Zadar",
            country: "Croatia",
            profileImageUrl: "https://i.pravatar.cc/120?img=30",
        },
        createdAt: "2026-06-03",
        updatedAt: "2026-06-06",
    },

    // ── ACCEPTED: Marko applied to job_3, negotiation ended, contract created
    {
        id: "app_3",
        jobId: "job_3",
        status: "ACCEPTED",
        coverLetter: "I have built multiple FastAPI backends and am very comfortable with microservices, Stripe, and PostgreSQL. Happy to start immediately.",
        contractor: {
            id: "contractor_1",
            firstName: "Marko",
            lastName: "Kovač",
            city: "Rijeka",
            country: "Croatia",
            profileImageUrl: "https://i.pravatar.cc/120?img=15",
        },
        createdAt: "2026-05-05",
        updatedAt: "2026-05-10",
    },

    // ── REJECTED: Luka applied to job_2, Ana reviewed and rejected
    {
        id: "app_4",
        jobId: "job_2",
        status: "REJECTED",
        coverLetter: "I have experience with React and would love to join your project. I am a fast learner and deliver on time.",
        contractor: {
            id: "contractor_2",
            firstName: "Luka",
            lastName: "Perić",
            city: "Osijek",
            country: "Croatia",
            profileImageUrl: "https://i.pravatar.cc/120?img=20",
        },
        createdAt: "2026-06-02",
        updatedAt: "2026-06-04",
    },

    // ── WITHDRAWN: Marko applied to job_5 (DevOps), then withdrew before it was reviewed
    {
        id: "app_5",
        jobId: "job_5",
        status: "WITHDRAWN",
        coverLetter: "I have extensive AWS and Kubernetes experience and have set up similar pipelines before.",
        contractor: {
            id: "contractor_1",
            firstName: "Marko",
            lastName: "Kovač",
            city: "Rijeka",
            country: "Croatia",
            profileImageUrl: "https://i.pravatar.cc/120?img=15",
        },
        createdAt: "2026-04-05",
        updatedAt: "2026-04-08",
    },

    // ── ACCEPTED (completed job): Marko's application on job_4, now fully done
    {
        id: "app_6",
        jobId: "job_4",
        status: "ACCEPTED",
        coverLetter: "Data analysis and dashboard work is my core strength. I have built reporting pipelines with Pandas and Tableau for multiple clients.",
        contractor: {
            id: "contractor_1",
            firstName: "Marko",
            lastName: "Kovač",
            city: "Rijeka",
            country: "Croatia",
            profileImageUrl: "https://i.pravatar.cc/120?img=15",
        },
        createdAt: "2026-03-05",
        updatedAt: "2026-03-10",
    },
];

// ─── NEGOTIATIONS ─────────────────────────────────────────────────────────────
// Covers: PENDING_CLIENT | PENDING_CONTRACTOR | ACCEPTED | REJECTED | WITHDRAWN

export const MOCK_NEGOTIATIONS = [
    // ── PENDING_CLIENT: Sara countered, now Ana must respond
    {
        id: "neg_1",
        applicationId: "app_2",
        clientId: "client_1",
        contractorId: "contractor_3",
        status: "PENDING_CLIENT",
        price: 1200,
        priceEditedBy: "contractor",
        deadline: "2026-08-30",
        deadlineEditedBy: "contractor",
        scopeOfWork: "Full dashboard implementation with 8+ reusable components and Storybook stories.",
        scopeEditedBy: "client",
        revisions: 3,
        revisionsEditedBy: "contractor",
        createdAt: "2026-06-04",
        updatedAt: "2026-06-06",
    },

    // ── PENDING_CONTRACTOR: Ana countered Ivan's proposal, waiting for Ivan
    {
        id: "neg_2",
        applicationId: "app_1",
        clientId: "client_1",
        contractorId: "contractor_4",
        status: "PENDING_CONTRACTOR",
        price: 950,
        priceEditedBy: "client",
        deadline: "2026-08-15",
        deadlineEditedBy: "client",
        scopeOfWork: "Dashboard UI with the 5 core components only — no Storybook required.",
        scopeEditedBy: "client",
        revisions: 2,
        revisionsEditedBy: "client",
        createdAt: "2026-06-09",
        updatedAt: "2026-06-10",
    },

    // ── ACCEPTED: Marko and Ana agreed on terms for job_3
    {
        id: "neg_3",
        applicationId: "app_3",
        clientId: "client_1",
        contractorId: "contractor_1",
        status: "ACCEPTED",
        price: 60,
        priceEditedBy: "client",
        deadline: "2026-07-30",
        deadlineEditedBy: "contractor",
        scopeOfWork: "Complete FastAPI backend with auth, job, application, contract, and payment services. Integration tests and OpenAPI docs included.",
        scopeEditedBy: "contractor",
        revisions: 3,
        revisionsEditedBy: "contractor",
        createdAt: "2026-05-06",
        updatedAt: "2026-05-10",
    },

    // ── REJECTED: Luka's negotiation — he asked for too much, Ana rejected
    {
        id: "neg_4",
        applicationId: "app_4",
        clientId: "client_1",
        contractorId: "contractor_2",
        status: "REJECTED",
        price: 2500,
        priceEditedBy: "contractor",
        deadline: "2026-10-01",
        deadlineEditedBy: "contractor",
        scopeOfWork: "Full dashboard with all components, Storybook, and e2e tests.",
        scopeEditedBy: "contractor",
        revisions: 5,
        revisionsEditedBy: "contractor",
        createdAt: "2026-06-02",
        updatedAt: "2026-06-03",
    },

    // ── WITHDRAWN: Marko withdrew from negotiation on job_5 (DevOps)
    {
        id: "neg_5",
        applicationId: "app_5",
        clientId: "client_1",
        contractorId: "contractor_1",
        status: "WITHDRAWN",
        price: 8000,
        priceEditedBy: "client",
        deadline: "2026-06-01",
        deadlineEditedBy: "client",
        scopeOfWork: "CI/CD pipeline setup with GitHub Actions and AWS ECS.",
        scopeEditedBy: "client",
        revisions: 1,
        revisionsEditedBy: "client",
        createdAt: "2026-04-06",
        updatedAt: "2026-04-08",
    },

    // ── ACCEPTED: Marko and Ana agreed for job_4 (completed)
    {
        id: "neg_6",
        applicationId: "app_6",
        clientId: "client_1",
        contractorId: "contractor_1",
        status: "ACCEPTED",
        price: 40,
        priceEditedBy: "client",
        deadline: "2026-05-01",
        deadlineEditedBy: "client",
        scopeOfWork: "Three dashboards with CSV export and automated weekly report via email.",
        scopeEditedBy: "contractor",
        revisions: 2,
        revisionsEditedBy: "client",
        createdAt: "2026-03-06",
        updatedAt: "2026-03-10",
    },
];

// ─── CONTRACTS ────────────────────────────────────────────────────────────────
// Covers: ACTIVE | COMPLETED | CANCELLED
// Each contract is a self-contained snapshot — no joins needed to display it

export const MOCK_CONTRACTS = [
    // ── ACTIVE: Marko is currently working on job_3 for Ana
    {
        id: "contract_1",
        jobId: "job_3",
        applicationId: "app_3",
        negotiationId: "neg_3",
        // job snapshot
        jobTitle: "Backend API Developer",
        jobCategory: "Backend Development",
        jobDescription: "Build a FastAPI microservice backend for our platform. Includes auth, job management, applications, contracts, and payment integration with Stripe.",
        jobDeliverables: "Complete API with OpenAPI docs, integration tests, and a deployed Docker environment.",
        jobRequirements: ["Python and FastAPI experience", "PostgreSQL and SQLAlchemy", "Docker and Docker Compose", "Stripe API knowledge is a plus"],
        jobWorkMode: "On-site",
        jobLocation: "Split",
        // agreed terms from negotiation
        agreedPrice: 60,
        agreedDeadline: "2026-07-30",
        agreedScopeOfWork: "Complete FastAPI backend with auth, job, application, contract, and payment services. Integration tests and OpenAPI docs included.",
        agreedRevisions: 3,
        // client snapshot
        clientId: "client_1",
        clientFirstName: "Ana",
        clientLastName: "Horvat",
        clientEmail: "ana.horvat@example.com",
        // contractor snapshot
        contractorId: "contractor_1",
        contractorFirstName: "Marko",
        contractorLastName: "Kovač",
        contractorEmail: "marko.kovac@example.com",
        // lifecycle
        status: "ACTIVE",
        startDate: "2026-05-15",
        endDate: null,
        clientSignedAt: "2026-05-13",
        contractorSignedAt: "2026-05-14",
        createdAt: "2026-05-12",
        updatedAt: "2026-05-15",
    },

    // ── COMPLETED: Marko finished the data dashboard job for Ana
    {
        id: "contract_2",
        jobId: "job_4",
        applicationId: "app_6",
        negotiationId: "neg_6",
        jobTitle: "Data Dashboard Analyst",
        jobCategory: "Data Analysis",
        jobDescription: "Analyse user engagement data and build three interactive dashboards with filtering and CSV export. Data lives in PostgreSQL.",
        jobDeliverables: "Three interactive dashboards with CSV export and an automated weekly report.",
        jobRequirements: ["Python and Pandas", "Tableau or Power BI", "SQL"],
        jobWorkMode: "Hybrid",
        jobLocation: "Rijeka",
        agreedPrice: 40,
        agreedDeadline: "2026-05-01",
        agreedScopeOfWork: "Three dashboards with CSV export and automated weekly report via email.",
        agreedRevisions: 2,
        clientId: "client_1",
        clientFirstName: "Ana",
        clientLastName: "Horvat",
        clientEmail: "ana.horvat@example.com",
        contractorId: "contractor_1",
        contractorFirstName: "Marko",
        contractorLastName: "Kovač",
        contractorEmail: "marko.kovac@example.com",
        status: "COMPLETED",
        startDate: "2026-03-15",
        endDate: "2026-05-02",
        clientSignedAt: "2026-03-13",
        contractorSignedAt: "2026-03-14",
        createdAt: "2026-03-12",
        updatedAt: "2026-05-02",
    },

    // ── CANCELLED: Marko signed but Ana cancelled before contractor countersigned
    {
        id: "contract_3",
        jobId: "job_5",
        applicationId: "app_5",
        negotiationId: "neg_5",
        jobTitle: "DevOps Setup Consultant",
        jobCategory: "DevOps",
        jobDescription: "Set up a full CI/CD pipeline using GitHub Actions, deploy to AWS ECS, and configure monitoring with CloudWatch.",
        jobDeliverables: "Complete CI/CD setup with runbook documentation.",
        jobRequirements: ["AWS or GCP experience", "Docker and Kubernetes", "GitHub Actions"],
        jobWorkMode: "Remote",
        jobLocation: "Remote",
        agreedPrice: 8000,
        agreedDeadline: "2026-06-01",
        agreedScopeOfWork: "CI/CD pipeline setup with GitHub Actions and AWS ECS.",
        agreedRevisions: 1,
        clientId: "client_1",
        clientFirstName: "Ana",
        clientLastName: "Horvat",
        clientEmail: "ana.horvat@example.com",
        contractorId: "contractor_1",
        contractorFirstName: "Marko",
        contractorLastName: "Kovač",
        contractorEmail: "marko.kovac@example.com",
        status: "CANCELLED",
        startDate: null,
        endDate: null,
        clientSignedAt: "2026-04-12",
        contractorSignedAt: null,
        createdAt: "2026-04-11",
        updatedAt: "2026-04-20",
    },
];

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
// Covers: PENDING | PROCESSING | PAID | FAILED
// Multiple payments per contract are normal (milestone payments or hourly billing)

export const MOCK_PAYMENTS = [
    // ── PENDING: First milestone on the active backend contract, Ana hasn't paid yet
    {
        id: "payment_1",
        contractId: "contract_1",
        clientId: "client_1",
        contractorId: "contractor_1",
        amount: 1200,
        status: "PENDING",
        paidAt: null,
        createdAt: "2026-05-15",
    },

    // ── PROCESSING: Second milestone submitted, Stripe is processing the charge
    {
        id: "payment_2",
        contractId: "contract_1",
        clientId: "client_1",
        contractorId: "contractor_1",
        amount: 600,
        status: "PROCESSING",
        paidAt: null,
        createdAt: "2026-06-01",
    },

    // ── PAID: Full payment for the completed data dashboard contract
    {
        id: "payment_3",
        contractId: "contract_2",
        clientId: "client_1",
        contractorId: "contractor_1",
        amount: 3200,
        status: "PAID",
        paidAt: "2026-05-05",
        createdAt: "2026-05-03",
    },

    // ── FAILED: A charge attempt on the active contract that Stripe declined
    {
        id: "payment_4",
        contractId: "contract_1",
        clientId: "client_1",
        contractorId: "contractor_1",
        amount: 600,
        status: "FAILED",
        paidAt: null,
        createdAt: "2026-05-28",
    },
];

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
// Only possible after a COMPLETED contract
// Client reviews contractor: workQualityRating present, requirementsClarityRating null
// Contractor reviews client: requirementsClarityRating present, workQualityRating null

export const MOCK_REVIEWS = [
    // ── Client (Ana) reviews Contractor (Marko) after contract_2
    {
        id: "review_1",
        contractId: "contract_2",
        reviewerId: "client_1",
        revieweeId: "contractor_1",
        reviewerRole: "client",
        overallRating: 4.8,
        communicationRating: 5,
        workQualityRating: 4.5,
        requirementsClarityRating: null,
        comment: "Marko delivered excellent dashboards, well ahead of schedule. Communication was clear and professional throughout the project.",
        createdAt: "2026-05-10",
    },

    // ── Contractor (Marko) reviews Client (Ana) after contract_2
    {
        id: "review_2",
        contractId: "contract_2",
        reviewerId: "contractor_1",
        revieweeId: "client_1",
        reviewerRole: "contractor",
        overallRating: 5,
        communicationRating: 5,
        workQualityRating: null,
        requirementsClarityRating: 5,
        comment: "Ana had very clear requirements from day one and was always responsive. Payment was on time. Would love to work together again.",
        createdAt: "2026-05-11",
    },
];

// ─── HELPER: current logged-in user (switch to test different perspectives) ───

export const CURRENT_CLIENT = MOCK_CLIENTS[0];       // Ana
export const CURRENT_CONTRACTOR = MOCK_CONTRACTORS[0]; // Marko
