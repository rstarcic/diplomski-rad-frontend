export const formatDate = (value, fallback = "Not set") => {
    if (!value) return fallback;

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) return fallback;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};