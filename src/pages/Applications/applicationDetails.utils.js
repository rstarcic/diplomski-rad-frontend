export const EMPTY_REVIEWS = {
    summary: {},
    reviews: [],
};

export function normalizeApplicationDetails(
    applicationDetails,
) {
    return {
        application:
            applicationDetails?.application ?? null,
        job: applicationDetails?.job ?? null,
        contractor:
            applicationDetails?.contractor ?? null,
        contractorReviews:
            applicationDetails?.reviews ?? EMPTY_REVIEWS,
        negotiation:
            applicationDetails?.negotiation ?? null,
        negotiationUpdates:
            applicationDetails?.negotiationUpdates ?? [],
        contract:
            applicationDetails?.contract ?? null,
        payment:
            applicationDetails?.payment ?? null,
    };
}

export function getInitialApplicationTab({
    contract,
    tabs,
}) {
    if (!contract) return 0;

    const contractTabIndex = tabs.findIndex(
        (tab) => tab.label === "Contract",
    );

    return contractTabIndex >= 0
        ? contractTabIndex
        : 0;
}