import { useCallback, useEffect, useMemo, useState } from "react";
import { loginApi, logoutApi, meApi, registerApi } from "../api/authAPI.js";
import { getMyProfile } from "../api/coreAPI.js";
import { AuthContext } from "./authContext";

const initialAccountSetup = {
	role: null,
	profileCompleted: null,
	paymentCompleted: null,
	payoutCompleted: null,
};

function mapAccountSetupFromUser(user) {
	if (!user) return initialAccountSetup;

	return {
		role: user.role ?? null,
		profileCompleted: user.profileCompleted ?? user.profile_completed ?? null,
		paymentCompleted: user.paymentCompleted ?? user.payment_completed ?? null,
		payoutCompleted: user.payoutCompleted ?? user.payout_completed ?? null,
	};
}

async function loadProfileCompleted() {
	const { profile } = await getMyProfile();
	return profile.profileCompleted;
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [accountSetup, setAccountSetup] = useState(initialAccountSetup);
	const [loading, setLoading] = useState(true);

	const setAuthenticatedUser = useCallback(async (authUser) => {
		setUser(authUser);
		const nextAccountSetup = mapAccountSetupFromUser(authUser);

		try {
			nextAccountSetup.profileCompleted = await loadProfileCompleted();
		} catch {
			nextAccountSetup.profileCompleted = nextAccountSetup.profileCompleted ?? false;
		}

		setAccountSetup(nextAccountSetup);
	}, []);

	useEffect(() => {
		meApi()
			.then(setAuthenticatedUser)
			.catch(() => {})
			.finally(() => setLoading(false));
	}, [setAuthenticatedUser]);

	const login = useCallback(async (email, password) => {
		await loginApi(email, password);
		const authUser = await meApi();
		await setAuthenticatedUser(authUser);
		return authUser;
	}, [setAuthenticatedUser]);

	const register = useCallback(async (role, userData) => {
		await registerApi(role, userData);
	}, []);

	const logout = useCallback(async () => {
		try {
			await logoutApi();
		} finally {
			setUser(null);
			setAccountSetup(initialAccountSetup);
		}
	}, []);

	const updateAccountSetup = useCallback((setup) => {
		setAccountSetup((prev) => ({
			...prev,
			...setup,
		}));
	}, []);

	const setProfileCompleted = useCallback((profileCompleted) => {
		setAccountSetup((prev) => ({
			...prev,
			profileCompleted,
		}));
	}, []);

	const setPaymentCompleted = useCallback((paymentCompleted) => {
		setAccountSetup((prev) => ({
			...prev,
			paymentCompleted,
		}));
	}, []);

	const accountSetupLoaded = accountSetup.profileCompleted !== null;
	const isContractor = accountSetup.role === "contractor";
	const payoutReady = !isContractor || accountSetup.payoutCompleted;

	const accountIsComplete = accountSetupLoaded && accountSetup.profileCompleted && payoutReady;

	const value = useMemo(
		() => ({
			user,
			role: user?.role ?? null,
			isAuthenticated: Boolean(user),
			loading,

			accountSetup,
			accountIsComplete,
			updateAccountSetup,
			setProfileCompleted,
			setPaymentCompleted,

			login,
			register,
			logout,
		}),
		[
			user,
			loading,
			accountSetup,
			accountIsComplete,
			updateAccountSetup,
			setProfileCompleted,
			setPaymentCompleted,
			login,
			register,
			logout,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
