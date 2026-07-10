import { useEffect, useState } from "react";

import { getJobFilterOptions } from "../api/coreAPI";
import { JOB_ERRORS } from "../constants/apiErrors";
import { parseApiError } from "../utils/parseApiError";

const initialOptions = {
    categories: [],
    cities: [],
};

export function useJobFilterOptions() {
    const [options, setOptions] = useState(initialOptions);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadOptions() {
            try {
                setLoading(true);
                setError("");

                const data = await getJobFilterOptions(
                    controller.signal
                );

                setOptions({
                    categories: data.categories ?? [],
                    cities: data.cities ?? [],
                });
            } catch (err) {
                if (
                    err.name === "CanceledError" ||
                    err.name === "AbortError"
                ) {
                    return;
                }

                const apiError = parseApiError(
                    err,
                    JOB_ERRORS,
                    "Could not load filters."
                );

                setError(apiError.message);
                setOptions(initialOptions);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadOptions();

        return () => controller.abort();
    }, []);

    return { options, loading, error };
}