import { CONTRACT_STATUSES, JOB_STATUSES } from "../../../../constants/statuses";
import { findStatusKey } from "../../../../utils/jobs";

export function getContractViewState(contract, job, role) {
    const statusKey = contract
        ? findStatusKey(contract.status, CONTRACT_STATUSES)
        : null;

    const jobStatusKey = job
        ? findStatusKey(job.status, JOB_STATUSES)
        : null;

    const contractIsActive = statusKey === "active";
    const jobIsAwaitingReview = jobStatusKey === "doneByContractor";
    const jobIsCompleted = jobStatusKey === "completedByClient";

    const currentPartySignedAt =
        role === "client"
            ? contract?.clientSignedAt
            : contract?.contractorSignedAt;

    const signingClosed = [
        "active",
        "signedByBoth",
        "completed",
        "cancelled",
    ].includes(statusKey);

    return {
        statusKey,
        needsSignature:
            Boolean(contract) &&
            !currentPartySignedAt &&
            !signingClosed,
        canShare:
            statusKey !== "cancelled" &&
            (contractIsActive ||
                jobIsCompleted ||
                statusKey === "completed"),
        description: getContractDescription({
            contractIsActive,
            jobIsAwaitingReview,
            jobIsCompleted,
        }),
    };
}

function getContractDescription({
    contractIsActive,
    jobIsAwaitingReview,
    jobIsCompleted,
}) {
    if (jobIsCompleted) {
        return "This job has been completed. You can still preview, download, or email a copy of the final contract.";
    }

    if (jobIsAwaitingReview) {
        return "The contractor marked the job as done. The signed contract remains available while the client reviews the work.";
    }

    if (contractIsActive) {
        return "This contract is active. You can preview it, download the PDF, or send a copy to your email.";
    }

    return "Review the contract details and complete any required signature before the work begins.";
}
