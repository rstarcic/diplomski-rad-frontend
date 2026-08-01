import { useEffect, useState } from "react";

import { getMyProfile, updateMyProfile } from "../../../api/core.api";
import { PROFILE_ERRORS } from "../../../constants/apiErrors";
import { useAuth } from "../../../hooks/useAuth";
import { useTimedAlert } from "../../../hooks/useTimedAlert";
import { parseApiError } from "../../../utils/parseApiError";

const LOAD_ERROR_MESSAGE =
	"We couldn't load your profile data. Please refresh the page or try again later.";
const SAVE_ERROR_MESSAGE = "We couldn't save your profile. Please try again later.";

const EMPTY_REVIEW_DATA = {
	summary: {},
	reviews: [],
};

function mapProfileData(response, initialProfileData) {
	const nextProfileData = {
		...initialProfileData,
		...response.profile,
	};

	if (Object.hasOwn(initialProfileData, "skills")) {
		nextProfileData.skills = response.skills ?? [];
	}

	if (Object.hasOwn(initialProfileData, "portfolio")) {
		nextProfileData.portfolio = response.portfolio ?? [];
	}

	return nextProfileData;
}

export function useEditableProfile(initialProfileData) {
	const { setProfileCompleted } = useAuth();

	const [profileData, setProfileData] = useState(initialProfileData);
	const [reviewData, setReviewData] = useState(EMPTY_REVIEW_DATA);
	const [loadError, setLoadError] = useState("");
	const [saveError, setSaveError] = useState("");
	const [success, setSuccess] = useTimedAlert();
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		let active = true;

		async function loadProfile() {
			setLoadError("");

			try {
				const response = await getMyProfile();

				if (!active) return;

				setProfileCompleted(response.profile.profileCompleted);
				setProfileData(mapProfileData(response, initialProfileData));
				setReviewData({
					...EMPTY_REVIEW_DATA,
					...response.reviews,
				});
			} catch (error) {
				if (!active) return;

				const apiError = parseApiError(error, PROFILE_ERRORS, LOAD_ERROR_MESSAGE);
				setLoadError(apiError.message);
			}
		}

		loadProfile();

		return () => {
			active = false;
		};
	}, [initialProfileData, setProfileCompleted]);

	const updateField = (field) => (event) => {
		setProfileData((current) => ({
			...current,
			[field]: event.target.value,
		}));
	};

	const updateImage = (image) => {
		setProfileData((current) => ({
			...current,
			image,
		}));
	};

	const saveProfile = async () => {
		setSaving(true);
		setSaveError("");
		setSuccess("");

		try {
			const response = await updateMyProfile(profileData);

			setProfileCompleted(response.profile.profileCompleted);
			setProfileData(mapProfileData(response, initialProfileData));

			if (response.reviews) {
				setReviewData({
					...EMPTY_REVIEW_DATA,
					...response.reviews,
				});
			}

			setSuccess("Profile saved successfully.");
			return true;
		} catch (error) {
			const apiError = parseApiError(error, PROFILE_ERRORS, SAVE_ERROR_MESSAGE);
			setSaveError(apiError.message);
			return false;
		} finally {
			setSaving(false);
		}
	};

	return {
		profileData,
		setProfileData,
		reviewData,
		loadError,
		saveError,
		success,
		saving,
		updateField,
		updateImage,
		saveProfile,
	};
}
