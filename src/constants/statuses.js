import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

export const JOB_STATUSES = {
    open: { label: "Open", paletteKey: "success", icon: CheckCircleRoundedIcon },
    inProgress: { label: "In progress", paletteKey: "info", icon: AutorenewRoundedIcon },
    done: { label: "Done", paletteKey: "info", icon: TaskAltRoundedIcon },
    completed: { label: "Completed", paletteKey: "success", icon: TaskAltRoundedIcon },
    cancelled: { label: "Cancelled", paletteKey: "error", icon: CancelRoundedIcon },
    incomplete: { label: "Incomplete", paletteKey: "warning", icon: HourglassEmptyRoundedIcon },
};

export const APPLICATION_STATUSES = {
    pending: { label: "Pending", paletteKey: "warning", icon: HourglassEmptyRoundedIcon },
    negotiating: { label: "Negotiating", paletteKey: "info", icon: HandshakeRoundedIcon },
    accepted: { label: "Accepted", paletteKey: "success", icon: CheckCircleRoundedIcon },
    rejected: { label: "Rejected", paletteKey: "error", icon: CancelRoundedIcon },
    withdrawn: { label: "Withdrawn", paletteKey: "warning", icon: BlockRoundedIcon },
};

export const NEGOTIATION_STATUSES = {
    pendingContractor: { label: "Awaiting contractor", paletteKey: "warning", icon: HourglassEmptyRoundedIcon },
    pendingClient: { label: "Awaiting client", paletteKey: "warning", icon: HourglassEmptyRoundedIcon },
    accepted: { label: "Accepted", paletteKey: "success", icon: CheckCircleRoundedIcon },
    rejected: { label: "Rejected", paletteKey: "error", icon: CancelRoundedIcon },
};

export const CONTRACT_STATUSES = {
    pendingClient: { label: "Pending client", paletteKey: "warning", icon: DrawRoundedIcon },
    pendingContractor: { label: "Pending contractor", paletteKey: "warning", icon: DrawRoundedIcon },
    signedByBoth: { label: "Signed by both", paletteKey: "success", icon: CheckCircleRoundedIcon },
    completed: { label: "Completed", paletteKey: "success", icon: TaskAltRoundedIcon },
    cancelled: { label: "Cancelled", paletteKey: "error", icon: CancelRoundedIcon },
};

export const PAYMENT_STATUSES = {
    pending: { label: "Pending", paletteKey: "warning", icon: HourglassEmptyRoundedIcon },
    processing: { label: "Processing", paletteKey: "info", icon: AutorenewRoundedIcon },
    paid: { label: "Paid", paletteKey: "success", icon: CheckCircleRoundedIcon },
    failed: { label: "Failed", paletteKey: "error", icon: CancelRoundedIcon },
};
