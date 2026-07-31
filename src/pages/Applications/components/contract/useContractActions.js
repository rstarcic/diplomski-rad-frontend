import { useState } from "react";

import {
    downloadContractPdf,
    emailContractPdf,
} from "../../../../api/core.api";
import { useTimedAlert } from "../../../../hooks/useTimedAlert";
import {
    parseApiError,
    parseBlobApiError,
} from "../../../../utils/parseApiError";
import { isSignatureTooLarge } from "./signatureValidation";

export function useContractActions({
    contract,
    onSignContract,
}) {
    const [signDialogOpen, setSignDialogOpen] = useState(false);
    const [signing, setSigning] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [signFeedback, setSignFeedback] = useTimedAlert();

    const openSignDialog = () => {
        setSignDialogOpen(true);
    };

    const closeSignDialog = () => {
        setSignDialogOpen(false);
    };

    const clearSignFeedback = () => {
        setSignFeedback(null);
    };

    const handleSignConfirm = async (signatureDataUrl) => {
        if (isSignatureTooLarge(signatureDataUrl)) {
            setSignFeedback({
                severity: "error",
                title: "Contract could not be signed",
                message:
                    "Signature image must not exceed 500 KB. Please clear it and draw a simpler signature.",
            });
            closeSignDialog();
            return;
        }

        setSigning(true);
        setSignFeedback(null);

        try {
            await onSignContract(signatureDataUrl);

            setSignFeedback({
                severity: "success",
                title: "Contract signed",
                message: "Contract signed successfully.",
            });

            closeSignDialog();
        } catch (error) {
            const apiError = parseApiError(
                error,
                {},
                "The contract could not be signed. Please try again.",
            );

            setSignFeedback({
                severity: "error",
                title: "Contract could not be signed",
                message: apiError.message,
            });

            closeSignDialog();
        } finally {
            setSigning(false);
        }
    };

    const handlePreview = () => {
        if (!contract?.id) return;

        window.open(
            `/contracts/${contract.id}/preview`,
            "_blank",
            "noopener,noreferrer",
        );
    };

    const handleDownload = async () => {
        if (!contract?.id || downloading) return;

        setDownloading(true);
        setSignFeedback(null);

        try {
            await downloadContractPdf(
                contract.id,
                contract.contractNumber,
            );
        } catch (error) {
            const apiError = await parseBlobApiError(
                error,
                {},
                "The contract PDF could not be downloaded. Please try again.",
            );

            setSignFeedback({
                severity: "error",
                title: "Download failed",
                message: apiError.message,
            });
        } finally {
            setDownloading(false);
        }
    };

    const handleSendEmail = async () => {
        if (!contract?.id || sendingEmail) return;

        setSendingEmail(true);
        setSignFeedback(null);

        try {
            const result = await emailContractPdf(contract.id);

            setSignFeedback({
                severity: "success",
                title: "Email sent",
                message:
                    result.message ??
                    "Contract sent to your email successfully.",
            });
        } catch (error) {
            const apiError = parseApiError(
                error,
                {},
                "The contract could not be sent to your email. Please try again.",
            );

            const emailAlreadySent =
                error?.response?.status === 409;

            setSignFeedback({
                severity: "error",
                title: emailAlreadySent
                    ? "Email already sent"
                    : "Email could not be sent",
                message: emailAlreadySent
                    ? "This contract was already sent to your email."
                    : apiError.message,
            });
        } finally {
            setSendingEmail(false);
        }
    };

    return {
        signDialogOpen,
        signing,
        signFeedback,
        downloading,
        sendingEmail,
        openSignDialog,
        closeSignDialog,
        clearSignFeedback,
        handleSignConfirm,
        handlePreview,
        handleDownload,
        handleSendEmail,
    };
}