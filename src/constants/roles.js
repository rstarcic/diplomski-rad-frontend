export const ROLES = {
	CLIENT: "client",
	CONTRACTOR: "contractor",
};

export const HOME_PATH_BY_ROLE = {
	[ROLES.CLIENT]: "/client/dashboard",
	[ROLES.CONTRACTOR]: "/contractor/dashboard",
};

export const getHomePath = (role) => HOME_PATH_BY_ROLE[role] ?? "/login";
