import { useEffect, useState } from "react";

import { getAllJobs } from "../api/coreAPI";
import { JOB_ERRORS } from "../constants/apiErrors";
import { JOBS_PAGE_SIZE } from "../constants/jobFilters";
import { parseApiError } from "../utils/parseApiError";

const initialPagination = {
    page: 1,
    pageSize: JOBS_PAGE_SIZE,
    total: 0,
    totalPages: 0,
};

export function useJobSearch({
    search = "",
    filters = {},
    page = 1,
} = {}) {
    const [jobs, setJobs] = useState([]);
    const [pagination, setPagination] =
        useState(initialPagination);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadJobs() {
            try {
                setLoading(true);
                setError("");

                const data = await getAllJobs(
                    {
                        search,
                        filters,
                        page,
                        pageSize: JOBS_PAGE_SIZE,
                    },
                    controller.signal,
                );

                setJobs(data.jobs);
                setPagination(data.pagination);
            } catch (error) {
                if (
                    error.name === "CanceledError" ||
                    error.name === "AbortError"
                ) {
                    return;
                }

                const apiError = parseApiError(
                    error,
                    JOB_ERRORS,
                    "Could not load jobs.",
                );

                setError(apiError.message);
                setJobs([]);
                setPagination(initialPagination);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadJobs();

        return () => controller.abort();
    }, [search, filters, page]);

    return {
        jobs,
        pagination,
        loading,
        error,
    };
}