
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

// Converts backend status strings ("OPEN", "IN_PROGRESS") to JOB_STATUSES / CONTRACT_STATUSES keys ("open", "inProgress")
export const findStatusKey = (rawStatus, statusConfig) => {
    const normalized = rawStatus.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    return Object.keys(statusConfig).find((key) => key === normalized) ?? null;
};