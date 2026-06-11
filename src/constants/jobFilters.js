export const WORK_MODES = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
];

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
    workMode: "",
    city: "",
    budgetType: "hourly",
    minHourlyRate: "",
    maxHourlyRate: "",
    minFixedBudget: "",
    maxFixedBudget: "",
};