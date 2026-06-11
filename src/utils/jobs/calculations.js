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

    return "Not set";
};