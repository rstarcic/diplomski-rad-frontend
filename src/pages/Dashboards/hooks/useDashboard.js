import { useEffect, useState } from "react";

import { getDashboard } from "../../../api/dashboard.api";
import { parseApiError } from "../../../utils/parseApiError";
import { DASHBOARD_ERRORS } from "../../../constants/apiErrors";

const EMPTY_DASHBOARD = {
	stats_cards: [],
	recent_activity: [],
	pending_actions: [],
	payment_summary: null,
};

export function useDashboard() {
	const [data, setData] = useState(EMPTY_DASHBOARD);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadDashboard() {
			setLoading(true);
			setError("");

			try {
				const dashboard = await getDashboard();

				if (active) {
					setData({
						...EMPTY_DASHBOARD,
						...dashboard,
					});
				}
			} catch (requestError) {
				if (!active) return;

				const apiError = parseApiError(
					requestError,
					DASHBOARD_ERRORS,
					"Dashboard data could not be loaded.",
				);

				setError(apiError.message);
			} finally {
				if (active) {
					setLoading(false);
				}
			}
		}

		loadDashboard();

		return () => {
			active = false;
		};
	}, []);

	return {
		data,
		loading,
		error,
	};
}