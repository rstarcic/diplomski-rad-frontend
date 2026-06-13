import { useState } from "react";
import { Box, Card, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccountSetupAlert from "../../../../components/account/AccountAlert";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { getAccountSetupMock } from "../../../../mock/AccountSetup";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";

const COVER_LETTER_MAX = 1500;
const COVER_LETTER_MIN = 50;

export default function ApplyCard({ job, onApply }) {
	const [coverLetter, setCoverLetter] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const accountSetup = getAccountSetupMock("contractor");
	const accountIsComplete = accountSetup.profileCompleted && accountSetup.payoutCompleted;
	const trimmedLength = coverLetter.trim().length;
	const canApply = accountIsComplete && trimmedLength >= COVER_LETTER_MIN && !isSubmitting;
	const clientName = job?.client ? `${job.client.firstName} ${job.client.lastName}` : "the client";

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
						settingsPath="/contractor/settings"
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
