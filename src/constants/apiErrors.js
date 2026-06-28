// Frontend message overrides per domain.
// Backend already sends user-friendly messages — only add an entry here
// if you want a different phrasing on the frontend.
// If a code is missing, parseApiError falls back to the backend message.

export const AUTH_ERRORS = {
    invalid_credentials: "Email or password is incorrect.",
    not_authenticated: "You must be logged in to access this resource.",
    google_account_not_registered: "This Google account isn't registered. Please create an account first.",
    email_already_registered: "An account with this email already exists.",
    invalid_role: "The selected role is invalid.",
    invalid_state: "Authentication could not be completed. Please try again.",
    state_expired: "Authentication session has expired. Please try again.",
    missing_code_or_state: "Google authentication response is incomplete. Please try again.",
    token_exchange_failed: "Google authentication failed. Please try again later.",
    invalid_id_token: "Google authentication failed. Please try again.",
    token_expired: "Your session has expired. Please log in again.",
    invalid_or_expired_token: "Your session is no longer valid. Please log in again.",
    invalid_token: "Your session is no longer valid. Please log in again.",
    missing_id_token: "Google authentication failed. Please try again.",
    user_not_found: "User account could not be found.",
    google_oauth_cancelled: "Google sign-in was cancelled.",
    refresh_token_expired: "Your session has expired. Please log in again.",
    reset_token_invalid: "This reset link is invalid or has expired. Please request a new one.",
    email_send_failed: "We couldn't send the reset email. Please try again later.",
    account_not_verified: "Please verify your email before signing in. Check your inbox.",
};

export const JOB_ERRORS = {};

export const APPLICATION_ERRORS = {};
