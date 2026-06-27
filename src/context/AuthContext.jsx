import { useCallback, useEffect, useMemo, useState } from "react";
import { loginApi, logoutApi, meApi, registerApi } from "../api/auth.js";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		meApi()
			.then(setUser)
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	const login = useCallback(async (email, password) => {
		await loginApi(email, password);
		const authUser = await meApi();
		setUser(authUser);
		return authUser;
	}, []);

	const register = useCallback(async (role, userData) => {
		await registerApi(role, userData);
	}, []);

	const logout = useCallback(async () => {
		try {
			await logoutApi();
		} finally {
			setUser(null);
		}
	}, []);

	const value = useMemo(
		() => ({
			user,
			role: user?.role ?? null,
			isAuthenticated: Boolean(user),
			loading,
			login,
			register,
			logout,
		}),
		[user, loading, login, register, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
