export const clientDashboardUser = {
    id: "user-1",
    firstName: "Roberta",
    role: "client",
};

export const clientDashboardData = {
    stats_cards: [
        {
            id: "active_jobs",
            title: "Active jobs",
            value: 5,
            subtitle: "+2 new this month",
        },
        {
            id: "applications",
            title: "Applications",
            value: 48,
            subtitle: "+9 new this week",
        },
        {
            id: "signed_contracts",
            title: "Signed contracts",
            value: 7,
            subtitle: "Total signed",
        },
        {
            id: "hiring_spend",
            title: "Hiring spend",
            value: " €12.4k",
            subtitle: "€2.1k this month",
        },
    ],
    recent_activity: [
        {
            id: "activity-1",
            title: "New application received",
            subtitle: "Mia K. applied to Senior UI Designer.",
            meta: "12 min ago",
        },
        {
            id: "activity-2",
            title: "Contract updated",
            subtitle: "Frontend redesign contract moved to status completed.",
            meta: "2 hours ago",
        },

    ],
    pending_actions: [
        {
            id: "action-1",
            title: "Review new applications",
            subtitle: "You have 6 candidates waiting for a feedback for job position Senior UI Designer .",
            meta: "High priority",
            metaAccent: "warning",
        },

    ],
    payment_summary: {
        availableBalance: "EUR 2,840",
        pendingPayments: "EUR 920",
        nextPayoutDate: "May 31",
        status: "2 invoices awaiting approval",
    },
};

export const clientDashboardStats = clientDashboardData.stats_cards;
export const clientRecentActivity = clientDashboardData.recent_activity;
export const clientNextSteps = clientDashboardData.pending_actions;
export const clientPaymentSummary = clientDashboardData.payment_summary;

export const contractorDashboardData = {
    stats_cards: [
        {
            id: "active_contracts",
            title: "Active contracts",
            value: 3,
            subtitle: "1 ending soon",
        },

        {
            id: "pending_payments",
            title: "Pending payments",
            value: "€640",
            subtitle: "2 awaiting payout",
        },
        {
            id: "job_success",
            title: "Job success",
            value: "98%",
            subtitle: "★ 4.9 rating",
        },
        {
            id: "total_earnings",
            title: "Total earnings",
            value: "€8,420",
            subtitle: "+€1,240 this month",
        },
    ],
    recent_activity: [
        {
            id: "contractor-activity-1",
            title: "Application approved",
            subtitle: "Client accepted your application for the UI Designer position.",
            meta: "Today",
        },
        {
            id: "contractor-activity-2",
            title: "New counteroffer received",
            subtitle: "A client sent a new offer for the Website Redesign project.",
            meta: "2 hours ago",
        },
        {
            id: "contractor-activity-3",
            title: "Payment released",
            subtitle: "€420 was released.",
            meta: "Yesterday",
        },
    ],
    pending_actions: [
        {
            id: "contractor-action-1",
            title: "Client waiting for signature",
            subtitle: "A client is waiting for your signature on the contract.",
            meta: "Due soon",
            metaAccent: "warning",
        },
        {
            id: "contractor-action-2",
            title: "Reply to client counteroffer",
            subtitle: "A client is waiting for clarification on your estimate.",
            meta: "Message",
            metaAccent: "info",
        },
        {
            id: "contractor-action-3",
            title: "Client left a review",
            subtitle: "A completed contract received new feedback on your profile.",
            meta: "Review",
            metaAccent: "success",
        },
    ],
    payment_summary: {
        availableBalance: "EUR 8,420",
        pendingPayments: "EUR 640",
        nextPayoutDate: "June 3",
        status: "2 payments awaiting payout",
    },

};
