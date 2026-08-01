import dayjs from "dayjs";

const LOCATION_REQUIRED_TYPES = ["onsite", "hybrid"];

const hasValue = (value) =>
    value !== null &&
    value !== undefined &&
    value !== "";

const hasText = (value) =>
    typeof value === "string" &&
    value.trim().length > 0;

const hasPositiveNumber = (value) =>
    hasValue(value) &&
    Number.isFinite(Number(value)) &&
    Number(value) > 0;

const isFutureDate = (value) => {
    if (!value) return false;

    const date = dayjs(value);

    return date.isValid() && date.isAfter(dayjs(), "day");
};

export const getMissingFields = (jobData = {}) => {
    const missingFields = [];

    if (!hasText(jobData.title)) {
        missingFields.push("job title");
    }

    if (!hasText(jobData.category)) {
        missingFields.push("category");
    }

    if (!hasText(jobData.description)) {
        missingFields.push("description");
    }

    if (!jobData.locationType) {
        missingFields.push("location type");
    }

    const locationIsRequired =
        LOCATION_REQUIRED_TYPES.includes(jobData.locationType);

    if (
        locationIsRequired &&
        !hasText(jobData.location)
    ) {
        missingFields.push("location");
    }

    if (!jobData.deadline) {
        missingFields.push("application deadline");
    } else if (!isFutureDate(jobData.deadline)) {
        missingFields.push(
            "a valid application deadline in the future",
        );
    }

    if (!jobData.budgetType) {
        missingFields.push("budget type");
    }

    if (!hasPositiveNumber(jobData.budgetAmount)) {
        missingFields.push(
            "budget or hourly rate greater than 0",
        );
    }

    if (!hasPositiveNumber(jobData.durationDays)) {
        missingFields.push("duration greater than 0");
    }

    if (!hasPositiveNumber(jobData.hoursPerWeek)) {
        missingFields.push("hours per week greater than 0");
    }

    if (!hasText(jobData.deliverables)) {
        missingFields.push("deliverables");
    }

    if (!jobData.requirements?.some(hasText)) {
        missingFields.push("at least one requirement");
    }

    return missingFields;
};

export const getMissingFieldsMessage = (
    missingFields = [],
) => {
    if (missingFields.length === 0) return "";

    return `Please provide: ${missingFields.join(", ")}.`;
};