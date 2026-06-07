export const formatValue = (value, fallback = "Not set") => value || fallback;

export const formatBudget = (job) => {
    if (job.budgetType === "Hourly") {
        return `${job.budgetAmount} € / h`;
    }

    return `${job.budgetAmount} € fixed`;
};

export const formatOption = (value, fallback = "Not set") => {
    if (!value) {
        return fallback;
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatDeadline = (deadline) => {
    if (!deadline) {
        return "No deadline";
    }

    return deadline.format?.("MMM D, YYYY") ?? String(deadline);
};

export const getEstimatedCost = ({ budgetType, rate, durationDays, hoursPerWeek, currency }) => {
    const numericRate = Number(rate);

    if (budgetType === "fixed") {
        return `${numericRate.toFixed(2)} ${currency}`;
    }

    if (budgetType === "hourly") {
        const numericDuration = Number(durationDays);
        const numericHours = Number(hoursPerWeek);

        const estimatedHours = (numericDuration / 7) * numericHours;

        return `${(estimatedHours * numericRate).toFixed(2)} ${currency}`;
    }

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

    if (!jobData.deadline) missingFields.push("application deadline");
    if (!jobData.budgetType) missingFields.push("budget type");
    if (!jobData.rate) missingFields.push("budget/rate");
    if (!jobData.durationDays) missingFields.push("duration");
    if (!jobData.deliverables.trim()) missingFields.push("deliverables");

    return missingFields;
};