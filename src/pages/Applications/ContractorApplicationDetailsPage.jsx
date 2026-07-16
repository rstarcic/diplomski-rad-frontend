import { useEffect, useRef, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import { getMyApplicationDetails, acceptNegotiationTerms, signContract } from "../../api/coreAPI";
import { APPLICATION_ERRORS } from "../../constants/apiErrors";
import { parseApiError } from "../../utils/parseApiError";

import AppAlert from "../../components/ui/Alert";
import { BackButton } from "../../components/ui/BackButton";
import PageHeader from "../../components/ui/PageHeader";
import ReviewSummaryCard from "../../components/reviews/ReviewSummaryCard";
import { reviewCriteria } from "../../components/reviews/ReviewCriteria";

import ApplicationSection from "./components/ApplicationSection";
import StepTabs from "./components/StepTabs";
import { useApplicationTabs } from "./hooks/useApplicationTabs";
import JobDetailsSection from "../Jobs/components/details/JobDetailsSection";
import ClientProfileSection from "../Jobs/components/details/ClientProfileSection";

const pageContentSx = {
	mt: 3,
	alignItems: "flex-start",
};

const sidebarSx = {
	position: { md: "sticky" },
	top: 24,
};

function getInitialTab({ contract, tabs }) {
	if (!contract) return 0;
	const contractTab = tabs.findIndex((tab) => tab.label === "Contract");
	return contractTab >= 0 ? contractTab : 0;
}

export default function ContractorApplicationDetailsPage() {
	const { applicationId } = useParams();
	const [details, setDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadError, setLoadError] = useState("");
	const [negotiationSuccess, setNegotiationSuccess] = useState("");
	const [selectedTab, setSelectedTab] = useState(null);
	const tabsRef = useRef(null);

	const reviewOffer = () => {
		setSelectedTab("Negotiation");

		requestAnimationFrame(() => {
			tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	};

	useEffect(() => {
		const controller = new AbortController();

		async function loadMyApplicationDetails() {
			try {
				setLoading(true);
				setLoadError("");

				const data = await getMyApplicationDetails(applicationId, controller.signal);
				setDetails(data);
			} catch (error) {
				if (error.name === "CanceledError" || error.name === "AbortError") return;

				const apiError = parseApiError(
					error,
					APPLICATION_ERRORS,
					"We couldn't load this application. Please try again later.",
				);

				setLoadError(apiError.message);
				setDetails(null);
			} finally {
				if (!controller.signal.aborted) setLoading(false);
			}
		}

		loadMyApplicationDetails();

		return () => controller.abort();
	}, [applicationId]);

	const application = details?.application ?? null;
	const job = details?.job ?? null;
	const client = details?.client ?? null;
	const reviews = details?.reviews ?? { summary: {}, reviews: [] };
	const negotiation = details?.negotiation ?? null;
	const negotiationUpdates = details?.negotiationUpdates ?? [];
	const contract = details?.contract ?? null;
	const payments = details?.payment ? [details.payment] : [];

	const handleAcceptNegotiation = async () => {
		setNegotiationSuccess("");
		const result = await acceptNegotiationTerms(job.id, applicationId);

		const updatedDetails = await getMyApplicationDetails(applicationId);

		setDetails(updatedDetails);
		setNegotiationSuccess(result.message);
	};

	const handleSignContract = async (signatureDataUrl) => {
		await signContract(contract.id, signatureDataUrl);
		const updatedDetails = await getMyApplicationDetails(applicationId);
		setDetails(updatedDetails);
	};

	const tabs = useApplicationTabs({
		application,
		job,
		negotiation,
		negotiationUpdates,
		contract,
		payments,
		role: "contractor",
		onAcceptNegotiation: handleAcceptNegotiation,
		onSignContract: handleSignContract,
	});

	if (loading) {
		return <AppAlert title="Loading application">Please wait while we load the application details.</AppAlert>;
	}

	if (loadError) {
		return (
			<AppAlert severity="error" title="Application could not be loaded">
				{loadError}
			</AppAlert>
		);
	}

	if (!application || !job || !client) {
		return (
			<AppAlert severity="warning" title="Application details are unavailable">
				The server response does not contain all required application details.
			</AppAlert>
		);
	}

	const initialTab = getInitialTab({ contract, tabs });

	return (
		<Box>
			<BackButton backTo="/contractor/applications" sx={{ mb: 2 }} />

			<PageHeader
				label="Application details"
				title={job.title}
				subtitle="Review your application, job details, negotiation, contract, and payments."
			/>

			<Grid container spacing={3} sx={pageContentSx}>
				<Grid size={{ xs: 12, md: 8 }}>
					<Stack spacing={3}>
						{negotiationSuccess && (
							<AppAlert severity="success" title="Terms accepted">
								{negotiationSuccess}
							</AppAlert>
						)}

						<ApplicationSection application={application} role="contractor" onReviewOffer={reviewOffer} />
						<JobDetailsSection job={job} />
						<Box ref={tabsRef} sx={{ scrollMarginTop: 3 }}>
							<StepTabs key={initialTab} tabs={tabs} initialTab={initialTab} selectedTab={selectedTab} />
						</Box>
					</Stack>
				</Grid>

				<Grid size={{ xs: 12, md: 4 }}>
					<Stack spacing={3} sx={sidebarSx}>
						<ClientProfileSection client={client} />
						<ReviewSummaryCard
							title="Client reviews"
							reviews={reviews.reviews}
							summary={reviews.summary}
							criteria={reviewCriteria.client}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
}
