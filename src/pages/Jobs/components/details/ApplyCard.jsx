import { useState } from "react";
import { Box, Card, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccountSetupAlert from "../../../../components/account/AccountAlert";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import StatusChip from "../../../../components/ui/StatusChip";
import { APPLICATION_STATUSES } from "../../../../constants/statuses";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";
import { findStatusKey } from "../../../../utils/jobs";

const COVER_LETTER_MAX = 1500;
const COVER_LETTER_MIN = 50;

const APPLICATION_STATUS_MESSAGES = {
	pending: "Your application is waiting for the client to review it.",
	accepted: "The client accepted your application. Continue from your applications page.",
	rejected: "The client did not accept this application.",
	withdrawn: "You withdrew this application.",
	incomplete: "This application was not completed.",
	cancelled: "This application has been cancelled.",
};

const applicationStateSx = {
	alignItems: "center",
	textAlign: "center",
	py: 2,
};

const applicationMessageSx = {
	mt: 1,
	maxWidth: 480,
	mx: "auto",
};

export default function ApplyCard({
	job,
	alreadyApplied = false,
	applicationStatus = "",
	onApply,
	accountSetup,
	accountIsComplete,
}) {
	const [coverLetter, setCoverLetter] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const trimmedLength = coverLetter.trim().length;
	const canApply = accountIsComplete && trimmedLength >= COVER_LETTER_MIN && !isSubmitting;
	const clientName = job?.client?.fullName || "the client";
	const statusKey = findStatusKey(applicationStatus || "pending", APPLICATION_STATUSES);
	const statusMessage = APPLICATION_STATUS_MESSAGES[statusKey] ?? APPLICATION_STATUS_MESSAGES.pending;

	const handleApply = async () => {
		if (!canApply) return;

		setIsSubmitting(true);
		setError("");

		try {
			await onApply?.({ jobId: job?.id, coverLetter: coverLetter.trim() });
			setSubmitted(true);
		} catch (err) {
			setError(err?.message || "Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const helperText = error
		? error
		: trimmedLength >= COVER_LETTER_MIN
			? "Looks good — you're ready to apply."
			: trimmedLength === 0
				? `Write at least ${COVER_LETTER_MIN} characters about yourself to enable applying.`
				: `${COVER_LETTER_MIN - trimmedLength} more character${COVER_LETTER_MIN - trimmedLength === 1 ? "" : "s"} to go.`;

	if (alreadyApplied) {
		return (
			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={1.5} sx={applicationStateSx}>
					<CheckCircleRoundedIcon sx={{ fontSize: 48, color: "primary.main" }} />

					<Typography variant="h6" sx={sectionTitleSx}>
						Application already submitted
					</Typography>

					{statusKey && <StatusChip status={statusKey} config={APPLICATION_STATUSES} />}

					<Typography variant="body2" color="text.secondary" sx={applicationMessageSx}>
						{statusMessage}
					</Typography>
				</Stack>
			</Card>
		);
	}

	if (submitted) {
		return (
			<Card elevation={0} sx={surfaceSectionSx}>
				<Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center", py: 2 }}>
					<CheckCircleRoundedIcon sx={{ fontSize: 56, color: "success.main" }} />

					<Box>
						<Typography variant="h6" sx={{ fontWeight: 900 }}>
							Application sent
						</Typography>

						<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 360, mx: "auto" }}>
							{clientName} will review your cover letter and reply soon. You'll be notified of any updates in your
							dashboard.
						</Typography>
					</Box>
				</Stack>
			</Card>
		);
	}

	return (
		<Card elevation={0} sx={surfaceSectionSx}>
			<Stack spacing={2}>
				{/* Header */}
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
					<Typography variant="h6" sx={sectionTitleSx}>
						Submit a proposal
					</Typography>

					<Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
						Send your application to {clientName}
					</Typography>
				</Stack>

				<Divider />

				{!accountIsComplete && (
					<AccountSetupAlert
						accountSetup={accountSetup}
						actionName="apply for this job"
						settingsPath={
							accountSetup.profileCompleted
								? "/contractor/settings/stripe"
								: "/contractor/profile"
						}
					/>
				)}

				{/* Cover letter */}
				<Stack spacing={1}>
					<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
						<Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
							Cover letter
						</Typography>

						<Typography variant="caption" color="text.secondary">
							{coverLetter.length} / {COVER_LETTER_MAX}
						</Typography>
					</Stack>

					<PrimaryTextField
						value={coverLetter}
						onChange={(e) => setCoverLetter(e.target.value.slice(0, COVER_LETTER_MAX))}
						multiline
						minRows={6}
						placeholder="Introduce yourself and explain why you're the right fit for this job…"
						error={Boolean(error)}
						helperText={helperText}
						disabled={isSubmitting}
					/>
				</Stack>

				<PrimaryButton
					fullWidth
					size="large"
					disabled={!canApply}
					onClick={handleApply}
					startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : null}
				>
					{isSubmitting ? "Sending…" : "Apply now"}
				</PrimaryButton>
			</Stack>
		</Card>
	);
}
