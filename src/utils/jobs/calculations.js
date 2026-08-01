import { formatCurrency } from "../formatters";

const DAYS_PER_WEEK = 7;

const NOT_SET_MESSAGE = "Not set";
const MISSING_ESTIMATE_DATA_MESSAGE = "Not enough information";

function parseNumber(value) {
    if (value === "" || value == null) return null;

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
}

export const getEstimatedCost = ({
    budgetType,
    budgetAmount,
    rate,
    durationDays,
    hoursPerWeek,
    currency = "EUR",
}) => {
    const numericRate = parseNumber(budgetAmount ?? rate);

    if (numericRate === null || numericRate < 0) {
        return NOT_SET_MESSAGE;
    }

    if (budgetType === "fixed") {
        return formatCurrency(
            numericRate,
            currency,
            NOT_SET_MESSAGE,
        );
    }

    if (budgetType !== "hourly") {
        return NOT_SET_MESSAGE;
    }

    const numericDuration = parseNumber(durationDays);
    const numericHoursPerWeek = parseNumber(hoursPerWeek);

    if (
        numericDuration === null ||
        numericDuration <= 0 ||
        numericHoursPerWeek === null ||
        numericHoursPerWeek <= 0
    ) {
        return MISSING_ESTIMATE_DATA_MESSAGE;
    }

    const estimatedWeeks = numericDuration / DAYS_PER_WEEK;
    const estimatedHours = estimatedWeeks * numericHoursPerWeek;
    const estimatedCost = estimatedHours * numericRate;

    return formatCurrency(
        estimatedCost,
        currency,
        NOT_SET_MESSAGE,
    );
};