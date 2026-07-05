import dayjs from "dayjs";

const hasPositiveNumber = (value) => {
    if (value === null || value === undefined || value === "") return false;

    return Number(value) > 0;
};

export const getMissingFields = (jobData) => {
    const missingFields = [];

    if (!jobData.title.trim()) missingFields.push("job title");
    if (!jobData.category.trim()) missingFields.push("category");
    if (!jobData.description.trim()) missingFields.push("description");
    if (!jobData.locationType) missingFields.push("location type");

    if ((jobData.locationType === "onsite" || jobData.locationType === "hybrid") && !jobData.location.trim()) {
        missingFields.push("location");
    }

    if (!jobData.deadline) {
        missingFields.push("application deadline");
    } else if (!dayjs(jobData.deadline).isAfter(dayjs(), "day")) {
        missingFields.push("Application deadline must be in the future");
    }

    if (!jobData.budgetType) missingFields.push("budget type");
    if (!jobData.budgetAmount) {
        missingFields.push("budget/rate");
    } else if (!hasPositiveNumber(jobData.budgetAmount)) {
        missingFields.push("Budget must be greater than 0");
    }

    if (!jobData.durationDays) {
        missingFields.push("duration");
    } else if (!hasPositiveNumber(jobData.durationDays)) {
        missingFields.push("Duration must begreater than 0");
    }

    if (!jobData.hoursPerWeek) {
        missingFields.push("hours per week");
    } else if (!hasPositiveNumber(jobData.hoursPerWeek)) {
        missingFields.push("Hours per week greater than 0");
    }

    if (!jobData.deliverables.trim()) missingFields.push("deliverables");
    if (!jobData.requirements?.some((requirement) => requirement.trim())) missingFields.push("requirements");

    return missingFields;
};

export const getMissingFieldsMessage = (missingFields) => {
    if (!missingFields.length) return "";

    return `${missingFields.join(", ")}.`;
};
