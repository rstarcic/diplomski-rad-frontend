import { useCallback, useEffect, useState } from "react";

import { getJobApplicationDetails } from "../../../api/core.api";
import { APPLICATION_ERRORS } from "../../../constants/apiErrors";
import { parseApiError } from "../../../utils/parseApiError";

export function useApplicationDetails(jobId, applicationId) {
    const [applicationDetails, setApplicationDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const refreshDetails = useCallback(async () => {
        const details = await getJobApplicationDetails(
            jobId,
            applicationId,
        );

        setApplicationDetails(details);
        return details;
    }, [jobId, applicationId]);

    useEffect(() => {
        let active = true;

        async function loadApplicationDetails() {
            setLoading(true);
            setLoadError("");

            try {
                const details = await getJobApplicationDetails(
                    jobId,
                    applicationId,
                );

                if (active) {
                    setApplicationDetails(details);
                }
            } catch (error) {
                console.error(
                    "Failed to load application details:",
                    error,
                );

                const apiError = parseApiError(
                    error,
                    APPLICATION_ERRORS,
                    "We couldn't load application details. Please try again later.",
                );

                if (active) {
                    setLoadError(apiError.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadApplicationDetails();

        return () => {
            active = false;
        };
    }, [jobId, applicationId]);

    return {
        applicationDetails,
        setApplicationDetails,
        loading,
        loadError,
        refreshDetails,
    };
}