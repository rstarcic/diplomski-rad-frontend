export const getEstimatedCost = ({ budgetType, budgetAmount, rate, durationDays, hoursPerWeek, currency = "EUR" }) => {
    const rawRate = budgetAmount ?? rate;
    const numericRate = Number(rawRate);

    if (rawRate === "" || rawRate == null || !Number.isFinite(numericRate) || numericRate < 0) {
        return "Not set";
    }

    if (budgetType === "fixed") {
        return `${numericRate.toFixed(2)} ${currency}`;
    }

    if (budgetType === "hourly") {
        const numericDuration = Number(durationDays);
        const numericHours = Number(hoursPerWeek);

        if (!Number.isFinite(numericDuration) || !Number.isFinite(numericHours) || numericDuration <= 0 || numericHours <= 0) {
            return "Not enough information";
        }

        const estimatedHours = (numericDuration / 7) * numericHours;

        return `${(estimatedHours * numericRate).toFixed(2)} ${currency}`;
    }

    return "Not set";
};
