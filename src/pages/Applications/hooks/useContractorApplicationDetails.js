import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { getMyApplicationDetails } from "../../../api/core.api";
import { APPLICATION_ERRORS } from "../../../constants/apiErrors";
import { parseApiError } from "../../../utils/parseApiError";

export function useContractorApplicationDetails(
    applicationId,
) {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const refreshDetails = useCallback(async () => {
        const updatedDetails =
            await getMyApplicationDetails(applicationId);

        setDetails(updatedDetails);
        return updatedDetails;
    }, [applicationId]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadDetails() {
            setLoading(true);
            setLoadError("");

            try {
                const loadedDetails =
                    await getMyApplicationDetails(
                        applicationId,
                        controller.signal,
                    );

                setDetails(loadedDetails);
            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                const apiError = parseApiError(
                    error,
                    APPLICATION_ERRORS,
                    "We couldn't load this application. Please try again later.",
                );

                setLoadError(apiError.message);
                setDetails(null);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadDetails();

        return () => {
            controller.abort();
        };
    }, [applicationId]);

    return {
        details,
        setDetails,
        loading,
        loadError,
        refreshDetails,
    };
}