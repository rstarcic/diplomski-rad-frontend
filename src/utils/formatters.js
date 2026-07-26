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

export const formatCurrency = (value, currency = "EUR", fallback = "Not set") => {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return fallback;

    const currencyCode = String(currency || "EUR").toUpperCase();

    return new Intl.NumberFormat("hr-HR", {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "code",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
