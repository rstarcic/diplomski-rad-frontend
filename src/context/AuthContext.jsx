import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	// login/logout API pozivi (JWT + Google OAuth) idu ovdje;
	// backend vraća korisnika s ulogom, frontend ga drži samo u memoriji
	const login = useCallback((nextUser) => {
		setUser(nextUser);
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	const value = useMemo(
		() => ({
			user,
			role: user?.role ?? null,
			isAuthenticated: Boolean(user),
			login,
			logout,
		}),
		[user, login, logout]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
