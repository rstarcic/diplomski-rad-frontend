const DATE_LOCALE = "en-US";
const CURRENCY_LOCALE = "hr-HR";
const DEFAULT_CURRENCY = "EUR";
const DEFAULT_FALLBACK = "Not set";

const hasValue = (value) =>
    value !== null &&
    value !== undefined &&
    value !== "";

export const formatDate = (
    value,
    fallback = DEFAULT_FALLBACK,
) => {
    if (!hasValue(value)) return fallback;

    const date =
        value instanceof Date
            ? value
            : new Date(value);

    if (Number.isNaN(date.getTime())) {
        return fallback;
    }

    return new Intl.DateTimeFormat(DATE_LOCALE, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

export const formatCurrency = (
    value,
    currency = DEFAULT_CURRENCY,
    fallback = DEFAULT_FALLBACK,
) => {
    if (!hasValue(value)) return fallback;

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return fallback;
    }

    const currencyCode = String(
        currency || DEFAULT_CURRENCY,
    )
        .trim()
        .toUpperCase();

    try {
        return new Intl.NumberFormat(CURRENCY_LOCALE, {
            style: "currency",
            currency: currencyCode,
            currencyDisplay: "code",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    } catch {
        return fallback;
    }
};