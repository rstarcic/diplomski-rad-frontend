export const formatValue = (value, fallback = "Not set") => value || fallback;

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