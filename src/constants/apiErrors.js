// Frontend message overrides per domain.
// Backend already sends user-friendly messages — only add an entry here
// if you want a different phrasing on the frontend.
// If a code is missing, parseApiError falls back to the backend message.

const SESSION_ERRORS = {
    not_authenticated: "You must be logged in to access this resource.",
    token_expired: "Your session has expired. Please log in again.",
    invalid_or_expired_token: "Your session is no longer valid. Please log in again.",
    invalid_token: "Your session is no longer valid. Please log in again.",
};

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

export const JOB_ERRORS = {
    ...SESSION_ERRORS,
    forbidden: "You do not have permission to perform this job action.",
    job_not_found: "We couldn't find the job you're looking for.",
    job_failed_to_create: "Failed to create the job. Please try again later.",
    job_cannot_be_updated: "Only open jobs can be updated.",
    only_clients_can_update_jobs: "Only clients can update jobs.",
    profile_not_found: "We couldn't find your profile.",
};

export const APPLICATION_ERRORS = {
    ...SESSION_ERRORS,
    forbidden: "You do not have permission to view these applications.",
    job_not_found: "We couldn't find the job you're looking for.",
    application_not_found: "We couldn't find this application.",
    application_deadline_expired: "The application deadline for this job has expired.",
    job_not_open_for_applications: "This job is no longer open for applications.",
    application_already_exists: "You have already applied for this job.",
    application_failed_to_create: "Your application could not be submitted. Please try again.",
    application_cannot_be_withdrawn: "This application can no longer be withdrawn.",
    application_cannot_be_accepted: "This application cannot be accepted in its current state.",
    negotiation_not_found: "We couldn't find this negotiation.",
    negotiation_already_resolved: "This negotiation has already been resolved.",
    counter_offer_not_allowed: "A counter-offer cannot be submitted at this time.",
    invalid_counter_offer: "Please check the counter-offer details.",
    profile_not_found: "We couldn't find your profile.",
};
export const PROFILE_ERRORS = {
    profile_not_found: "We couldn't find this profile.",
    forbidden: "You do not have permission to view this profile.",
    not_authenticated: "You must be logged in to access this resource.",
    token_expired: "Your session has expired. Please log in again.",
    invalid_or_expired_token: "Your session is no longer valid. Please log in again.",
    invalid_token: "Your session is no longer valid. Please log in again.",
};

export const CONTRACT_ERRORS = {
    ...SESSION_ERRORS,
    contract_not_found: "We couldn't find this contract.",
    contract_not_ready: "This contract is not ready to be signed.",
    contract_already_signed: "You have already signed this contract.",
    contract_cannot_be_signed: "This contract cannot be signed in its current state.",
    invalid_signature: "Please provide a valid signature.",
    contract_download_failed: "The contract could not be downloaded.",
    contract_email_failed: "The contract could not be sent to your email.",
    forbidden: "You do not have permission to access this contract.",
};

export const PAYMENT_ERRORS = {
    ...SESSION_ERRORS,
    payment_method_not_found: "No payment method was found.",
    payment_setup_incomplete: "Please complete your payment method setup first.",
    payment_already_completed: "This payment has already been completed.",
    payment_failed: "The payment could not be completed. Please try again.",
    checkout_session_failed: "Stripe checkout could not be started. Please try again.",
    stripe_account_not_ready: "Your Stripe account setup is not complete.",
    stripe_onboarding_failed: "Stripe account setup could not be started.",
    transaction_not_found: "We couldn't find this transaction.",
    contract_not_payable: "This contract is not ready for payment.",
};

export const REVIEW_ERRORS = {
    ...SESSION_ERRORS,
    review_not_allowed: "You cannot review this job yet.",
    review_already_exists: "You have already submitted a review for this job.",
    invalid_rating: "Please provide a valid rating for every category.",
    job_not_completed: "A review can only be submitted after the job is completed.",
    review_failed_to_create: "Your review could not be submitted. Please try again.",
};

export const DASHBOARD_ERRORS = {
    ...SESSION_ERRORS,
    forbidden: "You do not have permission to view this dashboard.",
    profile_not_found: "We couldn't find your profile.",
};