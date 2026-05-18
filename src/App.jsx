import { lazy, Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import AuthLayout from "./layouts/AuthLayout";

const LoginPage = lazy(() => import("./pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("./pages/Auth/SignupPage"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPasswordPage"));

function App() {
	return (
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
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</Suspense>
	);
}

export default App;
