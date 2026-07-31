import { useEffect } from "react";

const PAYMENT_REFRESH_INTERVAL = 15_000;

export function usePaymentPolling({
    paymentStatus,
    refreshDetails,
}) {
    useEffect(() => {
        if (paymentStatus !== "pending") {
            return undefined;
        }

        const intervalId = window.setInterval(() => {
            refreshDetails().catch(() => {
                // Keep current data and retry later.
            });
        }, PAYMENT_REFRESH_INTERVAL);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [paymentStatus, refreshDetails]);
}