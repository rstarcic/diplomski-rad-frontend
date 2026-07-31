export const ERROR_CONFIG = {
	google_account_not_registered: {
		title: "Google account not found",
		description: "This Google account isn't linked to any WorkLink account. Create an account to get started.",
		action: { label: "Create an account", to: "/signup" },
	},
	google_account_already_exists: {
		title: "Account already exists",
		description: "An account with this Google email already exists. Sign in instead.",
		action: { label: "Sign in", to: "/login" },
	},
	oauth_failed: {
		title: "Sign-in with Google failed",
		description: "Something went wrong during Google sign-in. Please try again or use email and password.",
		action: { label: "Try again", to: "/login" },
	},
	email_link_expired: {
		title: "Link expired",
		description: "This verification link has expired or already been used. Request a new one from your profile.",
		action: { label: "Go to sign in", to: "/login" },
	},
	email_already_verified: {
		title: "Already verified",
		description: "Your email is already verified. You're good to go.",
		action: { label: "Sign in", to: "/login" },
	},
	account_suspended: {
		title: "Account suspended",
		description: "Your account has been suspended. Please contact support if you believe this is a mistake.",
		action: { label: "Go to sign in", to: "/login" },
	},
	session_expired: {
		title: "Session expired",
		description: "Your session has expired. Please sign in again to continue.",
		action: { label: "Sign in", to: "/login" },
	},
};

export const FALLBACK_ERROR = {
	title: "Something went wrong",
	description: "An unexpected error occurred. Please try again.",
	action: { label: "Go to sign in", to: "/login" },
};
