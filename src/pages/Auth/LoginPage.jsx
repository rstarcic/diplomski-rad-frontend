import { useLocation, useSearchParams } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import LoginForm from "./components/LoginForm";

const defaultSide = {
	title: "Welcome back to WorkLink.",
	description: "Manage jobs, applications, contracts, and payments in one calm workspace.",
	ctaLabel: "Create an account",
	ctaTo: "/signup",
};

const formSide = {
	formTitle: "Sign in",
	formSubtitle: "Continue to your workspace.",
};

function LoginPage() {
	const { state } = useLocation();
	const [searchParams] = useSearchParams();

	const successMessage =
		searchParams.get("verified") === "true"
			? "Email verified! You can now sign in."
			: (state?.successMessage ?? null);

	return (
		<AuthCard visualContent={defaultSide} formContent={formSide}>
			<LoginForm
				initialError={state?.authError ?? null}
				successMessage={successMessage}
			/>
		</AuthCard>
	);
}

export default LoginPage;
