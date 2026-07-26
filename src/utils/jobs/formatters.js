
import { formatDate } from "../formatters";

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

export const formatDeadline = (deadline) => formatDate(deadline, "No deadline");

export const findStatusKey = (rawStatus, statusConfig) => {
    if (!rawStatus || !statusConfig) return null;

    const normalizedStatus = String(rawStatus)
        .trim()
        .toLowerCase()
        .replace(/[_-]+(.)/g, (_, character) => character.toUpperCase());
    return Object.keys(statusConfig).find(
        (statusKey) => statusKey.toLowerCase() === normalizedStatus.toLowerCase(),
    ) ?? null;
};
