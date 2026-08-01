const DEFAULT_FALLBACK =
    "An unexpected error occurred. Please try again.";

const LOCATION_PREFIXES = [
    "body",
    "query",
    "path",
    "header",
];

function cleanValidationMessage(message) {
    if (typeof message !== "string") return null;

    return message.replace(/^Value error,\s*/i, "").trim();
}

function getValidationField(location) {
    if (!Array.isArray(location)) return null;

    return (
        location
            .filter(
                (part) =>
                    typeof part === "string" &&
                    !LOCATION_PREFIXES.includes(part),
            )
            .at(-1) ?? null
    );
}

function createParsedError({
    code = null,
    message,
    field = null,
    errorMap,
    fallback,
}) {
    return {
        code,
        message:
            errorMap[code] ??
            cleanValidationMessage(message) ??
            fallback,
        field,
    };
}

/**
 * Converts a backend or Axios error into a consistent error object.
 */
export function parseApiError(
    error,
    errorMap = {},
    fallback = DEFAULT_FALLBACK,
) {
    const responseData = error?.response?.data;
    const detail = responseData?.detail;

    if (Array.isArray(detail)) {
        const firstError = detail[0] ?? {};

        return createParsedError({
            code: firstError.type,
            message: firstError.msg,
            field: getValidationField(firstError.loc),
            errorMap,
            fallback,
        });
    }

    if (
        detail &&
        typeof detail === "object"
    ) {
        return createParsedError({
            code: detail.code,
            message: detail.message,
            field: detail.field,
            errorMap,
            fallback,
        });
    }

    if (typeof detail === "string") {
        return createParsedError({
            code: responseData?.code,
            message: detail,
            field: responseData?.field,
            errorMap,
            fallback,
        });
    }

    return createParsedError({
        code: responseData?.code,
        message: responseData?.message,
        field: responseData?.field,
        errorMap,
        fallback,
    });
}

/**
 * Parses API errors returned as Blob responses, such as failed downloads.
 */
export async function parseBlobApiError(
    error,
    errorMap = {},
    fallback = DEFAULT_FALLBACK,
) {
    const responseData = error?.response?.data;

    if (!(responseData instanceof Blob)) {
        return parseApiError(error, errorMap, fallback);
    }

    try {
        const parsedData = JSON.parse(
            await responseData.text(),
        );

        return parseApiError(
            {
                ...error,
                response: {
                    ...error.response,
                    data: parsedData,
                },
            },
            errorMap,
            fallback,
        );
    } catch {
        return {
            code: null,
            message: fallback,
            field: null,
        };
    }
}

/**
 * Routes a parsed API error to a form field or global alert.
 */
export function applyApiError(
    error,
    {
        setApiError,
        setErrors,
        errorMap = {},
        fallback = DEFAULT_FALLBACK,
    },
) {
    const { message, field } = parseApiError(
        error,
        errorMap,
        fallback,
    );

    if (field) {
        setErrors({
            [field]: message,
        });

        return;
    }

    setApiError(message);
}