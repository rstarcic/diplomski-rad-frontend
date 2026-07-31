
export function mapStatusFromAPI(status = "") {
    const normalizedStatus = String(status).trim();

    if (!normalizedStatus) return "";
    if (!normalizedStatus.includes("_") && normalizedStatus !== normalizedStatus.toUpperCase()) return normalizedStatus;

    return normalizedStatus.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

export function mapApplicationStatusFromAPI(status = "") {
    return mapStatusFromAPI(status);
}

export function mapContractStatusFromAPI(status = "") {
    return mapStatusFromAPI(status);
}


export function mapStatusGroupFromAPI(statusGroup = null) {
    if (!statusGroup) return statusGroup;

    if (typeof statusGroup === "string") {
        return {
            status: mapStatusFromAPI(statusGroup),
        };
    }

    return {
        ...statusGroup,
        status: mapStatusFromAPI(statusGroup.status),
    };
}
