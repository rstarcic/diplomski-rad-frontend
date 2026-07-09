
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
    return statusConfig[rawStatus] ? rawStatus : null;
};
