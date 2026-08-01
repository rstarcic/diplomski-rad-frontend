
export const BUDGET_TYPES = [
    { value: "fixed", label: "Fixed price" },
    { value: "hourly", label: "Hourly rate" },
];

export const LOCATION_TYPES = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
];

export const INITIAL_JOB_FILTERS = {
    search: "",
    category: "",
    locationType: "",
    city: "",
    budgetType: "",
    minBudget: "",
    maxBudget: "",
};

export const JOBS_PAGE_SIZE = 9;
