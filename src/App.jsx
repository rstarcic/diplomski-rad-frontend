import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Navigate, Route, Routes } from "react-router-dom";

import RequireRole from "./components/auth/RequireRole";
import RoleRedirect from "./components/auth/RoleRedirect";
import { ROLES } from "./constants/roles";
import AppLayout from "./layouts/AppLayout/AppLayout";
import AuthLayout from "./layouts/AuthLayout";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("./pages/Auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/Auth/ResetPasswordPage"));
const ErrorPage = lazy(() => import("./pages/Auth/ErrorPage"));

const ClientDashboard = lazy(() => import("./pages/Dashboards/ClientDashboard"));
const ContractorDashboard = lazy(() => import("./pages/Dashboards/ContractorDashboard"));

const MyJobsPage = lazy(() => import("./pages/Jobs/MyJobsPage"));
const CreateJobPage = lazy(() => import("./pages/Jobs/CreateJobPage"));
const EditJobPage = lazy(() => import("./pages/Jobs/EditJobPage"));
const SearchJobsPage = lazy(() => import("./pages/Jobs/SearchJobsPage"));
const JobDetailsPage = lazy(() => import("./pages/Jobs/JobDetailsPage"));

const JobApplicationsPage = lazy(() => import("./pages/Applications/JobApplicationsPage"));
const ApplicationDetailsPage = lazy(() => import("./pages/Applications/ApplicationDetailsPage"));
const ContractorApplicationsPage = lazy(() => import("./pages/Applications/ContractorApplicationsPage"));
const ContractorApplicationDetailsPage = lazy(() => import("./pages/Applications/ContractorApplicationDetailsPage"));

const ClientProfilePage = lazy(() => import("./pages/Profiles/ClientProfilePage"));
const ContractorProfilePage = lazy(() => import("./pages/Profiles/ContractorProfilePage"));
const ClientPublicProfilePage = lazy(() => import("./pages/Profiles/ClientPublicProfilePage"));
const ContractorPublicProfilePage = lazy(() => import("./pages/Profiles/ContractorPublicProfilePage"));
const ClientPaymentSettingsPage = lazy(() => import("./pages/Settings/ClientPaymentSettingsPage"));
const ContractorStripeSettingsPage = lazy(() => import("./pages/Settings/ContractorStripeSettingsPage"));

const pageLoaderSx = {
	minHeight: "100vh",
	display: "grid",
	placeItems: "center",
};

function PageLoader() {
	return (
		<Box sx={pageLoaderSx}>
			<CircularProgress />
		</Box>
	);
}

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Suspense fallback={<PageLoader />}>
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route element={<AuthLayout />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/forgot-password" element={<ForgotPasswordPage />} />
						<Route path="/reset-password" element={<ResetPasswordPage />} />
						<Route path="/error" element={<ErrorPage />} />
					</Route>

					<Route element={<AppLayout />}>
						<Route path="/client" element={<RequireRole role={ROLES.CLIENT} />}>
							<Route index element={<Navigate to="dashboard" replace />} />
							<Route path="dashboard" element={<ClientDashboard />} />
							<Route path="jobs" element={<MyJobsPage />} />
							<Route path="jobs/create" element={<CreateJobPage />} />
							<Route path="jobs/:jobId/edit" element={<EditJobPage />} />
							<Route path="jobs/:jobId/applications" element={<JobApplicationsPage />} />
							<Route path="jobs/:jobId/applications/:applicationId" element={<ApplicationDetailsPage />} />
							<Route path="profile" element={<ClientProfilePage />} />
							<Route path="stripe" element={<ClientPaymentSettingsPage />} />
							<Route path="contractors/:contractorId" element={<ContractorPublicProfilePage />} />
						</Route>

						<Route path="/contractor" element={<RequireRole role={ROLES.CONTRACTOR} />}>
							<Route index element={<Navigate to="dashboard" replace />} />
							<Route path="dashboard" element={<ContractorDashboard />} />
							<Route path="jobs/search" element={<SearchJobsPage />} />
							<Route path="jobs/:jobId" element={<JobDetailsPage />} />
							<Route path="applications" element={<ContractorApplicationsPage />} />
							<Route path="applications/:applicationId" element={<ContractorApplicationDetailsPage />} />
							<Route path="profile" element={<ContractorProfilePage />} />
							<Route path="stripe" element={<ContractorStripeSettingsPage />} />
							<Route path="clients/:clientId" element={<ClientPublicProfilePage />} />
						</Route>
					</Route>

					<Route path="*" element={<RoleRedirect />} />
				</Routes>
			</Suspense>
		</LocalizationProvider>
	);
}

export default App;
