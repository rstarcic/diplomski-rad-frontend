import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";

export const JOB_STATUSES = {
    open: { label: "Open", paletteKey: "success", icon: CheckCircleRoundedIcon },
    inProgress: { label: "In progress", paletteKey: "info", icon: AutorenewRoundedIcon },
    completed: { label: "Completed", paletteKey: "success", icon: TaskAltRoundedIcon },
    cancelled: { label: "Cancelled", paletteKey: "error", icon: CancelRoundedIcon },
    draft: { label: "Draft", paletteKey: "info", icon: EditNoteRoundedIcon },
};

export const APPLICATION_STATUSES = {
    pending: { label: "Pending", paletteKey: "warning", icon: HourglassEmptyRoundedIcon },
    accepted: { label: "Accepted", paletteKey: "success", icon: CheckCircleRoundedIcon },
    rejected: { label: "Rejected", paletteKey: "error", icon: CancelRoundedIcon },
    withdrawn: { label: "Withdrawn", paletteKey: "error", icon: CancelRoundedIcon },
};

export const CONTRACT_STATUSES = {
    pendingSignature: { label: "Pending signature", paletteKey: "warning", icon: DrawRoundedIcon },
    active: { label: "Active", paletteKey: "info", icon: AutorenewRoundedIcon },
    completed: { label: "Completed", paletteKey: "success", icon: TaskAltRoundedIcon },
    terminated: { label: "Terminated", paletteKey: "error", icon: CancelRoundedIcon },
};
