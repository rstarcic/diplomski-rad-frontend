import dayjs from "dayjs";

const hasPositiveNumber = (value) => {
    if (value === null || value === undefined || value === "") return false;

    return Number(value) > 0;
};

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

export const getMissingFields = (jobData) => {
    const missingFields = [];

    if (!hasText(jobData.title)) missingFields.push("job title");
    if (!hasText(jobData.category)) missingFields.push("category");
    if (!hasText(jobData.description)) missingFields.push("description");
    if (!jobData.locationType) missingFields.push("location type");

    if ((jobData.locationType === "onsite" || jobData.locationType === "hybrid") && !hasText(jobData.location)) {
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

    if (!hasText(jobData.deliverables)) missingFields.push("deliverables");
    if (!jobData.requirements?.some(hasText)) missingFields.push("requirements");

    return missingFields;
};

export const getMissingFieldsMessage = (missingFields) => {
    if (!missingFields.length) return "";

    return `${missingFields.join(", ")}.`;
};
