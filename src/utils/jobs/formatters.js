import { formatCurrency, formatDate } from "../formatters";

const DEFAULT_FALLBACK = "Not set";

const normalizeStatus = (value) =>
    String(value)
        .trim()
        .toLowerCase()
        .replace(/[\s_-]+(.)/g, (_, character) =>
            character.toUpperCase(),
        );

export const formatValue = (
    value,
    fallback = DEFAULT_FALLBACK,
) => {
    if (value == null) return fallback;

    if (typeof value === "string" && !value.trim()) {
        return fallback;
    }

    return value;
};

export const formatBudget = ({
    budgetType,
    budgetAmount,
    currency = "EUR",
}) => {
    const formattedAmount = formatCurrency(
        budgetAmount,
        currency,
        DEFAULT_FALLBACK,
    );

    if (formattedAmount === DEFAULT_FALLBACK) {
        return formattedAmount;
    }

    const normalizedBudgetType = String(budgetType)
        .trim()
        .toLowerCase();

    if (normalizedBudgetType === "hourly") {
        return `${formattedAmount} / h`;
    }

    if (normalizedBudgetType === "fixed") {
        return `${formattedAmount} fixed`;
    }

    return formattedAmount;
};

export const formatOption = (
    value,
    fallback = DEFAULT_FALLBACK,
) => {
    if (value == null || value === "") {
        return fallback;
    }

    const normalizedValue = String(value).trim();

    if (!normalizedValue) {
        return fallback;
    }

    return (
        normalizedValue.charAt(0).toUpperCase() +
        normalizedValue.slice(1)
    );
};

export const formatDeadline = (deadline) =>
    formatDate(deadline, "No deadline");

export const findStatusKey = (rawStatus, statusConfig) => {
    if (!rawStatus || !statusConfig) return null;

    const normalizedStatus = normalizeStatus(rawStatus);

    return (
        Object.keys(statusConfig).find(
            (statusKey) =>
                statusKey.toLowerCase() ===
                normalizedStatus.toLowerCase(),
        ) ?? null
    );
};