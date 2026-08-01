import { useEffect, useState } from "react";

import { PROFILE_ERRORS } from "../../../constants/apiErrors";
import { parseApiError } from "../../../utils/parseApiError";

function isCanceledRequest(error) {
	return error.name === "CanceledError" || error.name === "AbortError";
}

export function usePublicProfile(profileId, loadProfile, errorMessage) {
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		async function loadPublicProfile() {
			setLoading(true);
			setLoadError("");

			try {
				const data = await loadProfile(profileId, controller.signal);
				setProfileData(data);
			} catch (error) {
				if (isCanceledRequest(error)) return;

				const apiError = parseApiError(error, PROFILE_ERRORS, errorMessage);
				setProfileData(null);
				setLoadError(apiError.message);
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		}

		loadPublicProfile();

		return () => controller.abort();
	}, [profileId, loadProfile, errorMessage]);

	return { profileData, loading, loadError };
}
