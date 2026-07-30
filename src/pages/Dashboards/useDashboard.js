import { useEffect, useState } from "react";

import { getDashboard } from "../../api/dashboardAPI";
import { parseApiError } from "../../utils/parseApiError";

const emptyDashboard = {
	stats_cards: [],
	recent_activity: [],
	pending_actions: [],
	payment_summary: null,
};

export function useDashboard() {
	const [data, setData] = useState(emptyDashboard);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadDashboard() {
			try {
				const dashboard = await getDashboard();
				if (active) setData(dashboard);
			} catch (requestError) {
				if (active) {
					const apiError = parseApiError(
						requestError,
						{},
						"Dashboard data could not be loaded.",
					);
					setError(apiError.message);
				}
			} finally {
				if (active) setLoading(false);
			}
		}

		loadDashboard();
		return () => {
			active = false;
		};
	}, []);

	return { data, loading, error };
}
