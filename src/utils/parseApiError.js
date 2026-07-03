const DEFAULT_FALLBACK = "An unexpected error occurred. Please try again.";

/**
 * Parses a structured backend error ({ code, message, field }) from an axios error.
 * Pass a domain-specific error map from apiErrors.js to override backend messages.
 */
export function parseApiError(err, errorMap = {}, fallback = DEFAULT_FALLBACK) {
    const responseData = err.response?.data;
    const detail = responseData?.detail;

    if (typeof detail === "string") {
        return { code: null, message: detail, field: null };
    }

    if (!detail || typeof detail !== "object") {
        return {
            code: responseData?.code ?? null,
            message: errorMap[responseData?.code] ?? responseData?.message ?? fallback,
            field: responseData?.field ?? null,
        };
    }

    if (Array.isArray(detail)) {
        return { code: null, message: fallback, field: null };
    }

    const { code, message, field } = detail;
    return {
        code: code ?? null,
        message: errorMap[code] ?? message ?? fallback,
        field: field ?? null,
    };
}

/**
 * Parses the error and automatically routes it:
 * - field errors → setErrors({ [field]: message })
 * - global errors → setApiError(message)
 */
export function applyApiError(err, { setApiError, setErrors, errorMap = {}, fallback = DEFAULT_FALLBACK }) {
    const { message, field } = parseApiError(err, errorMap, fallback);
    if (field) {
        setErrors({ [field]: message });
    } else {
        setApiError(message);
    }
}
