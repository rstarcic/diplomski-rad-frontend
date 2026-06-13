import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";

import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import RequireRole from "./components/auth/RequireRole";
import RoleRedirect from "./components/auth/RoleRedirect";
import { ROLES } from "./constants/roles";

const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPasswordPage"));

const ClientDashboard = lazy(() => import("./pages/Dashboards/ClientDashboard"));
const ContractorDashboard = lazy(() => import("./pages/Dashboards/ContractorDashboard"));

const MyJobsPage = lazy(() => import("./pages/Jobs/MyJobsPage"));
const CreateJobPage = lazy(() => import("./pages/Jobs/CreateJobPage"));
const EditJobPage = lazy(() => import("./pages/Jobs/EditJobPage"));
const JobApplicationsPage = lazy(() => import("./pages/Applications/JobApplicationsPage"));
const SearchJobsPage = lazy(() => import("./pages/Jobs/SearchJobsPage"));
const JobDetailsPage = lazy(() => import("./pages/Jobs/JobDetailsPage"));

const ClientProfilePage = lazy(() => import("./pages/Profiles/ClientProfilePage"));
const ContractorProfilePage = lazy(() => import("./pages/Profiles/ContractorProfilePage"));
function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Suspense
				fallback={
					<Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
						<CircularProgress />
					</Box>
				}
			>
				<Routes>
					<Route element={<AuthLayout />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
					</Route>

					<Route element={<AppLayout />}>
						<Route path="/client" element={<RequireRole role={ROLES.CLIENT} />}>
							<Route index element={<Navigate to="dashboard" replace />} />
							<Route path="dashboard" element={<ClientDashboard />} />
							<Route path="jobs" element={<MyJobsPage />} />
							<Route path="jobs/create" element={<CreateJobPage />} />
							<Route path="jobs/:jobId/edit" element={<EditJobPage />} />
							<Route path="jobs/:jobId/applications" element={<JobApplicationsPage />} />
							<Route path="settings/profile" element={<ClientProfilePage />} />
						</Route>
						<Route path="/contractor" element={<RequireRole role={ROLES.CONTRACTOR} />}>
							<Route index element={<Navigate to="dashboard" replace />} />
							<Route path="dashboard" element={<ContractorDashboard />} />
							<Route path="jobs/search" element={<SearchJobsPage />} />
							<Route path="jobs/:jobId" element={<JobDetailsPage />} />
							<Route path="settings/profile" element={<ContractorProfilePage />} />
						</Route>
					</Route>

					<Route path="/" element={<RoleRedirect />} />
					<Route path="*" element={<RoleRedirect />} />
				</Routes>
			</Suspense>
		</LocalizationProvider>
	);
}

export default App;
