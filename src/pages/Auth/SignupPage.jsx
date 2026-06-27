import { useLocation } from "react-router-dom";
import AuthCard from "./components/AuthCard";
import SignupForm from "./components/SignupForm";

const defaultSide = {
	title: "Welcome back to WorkLink.",
	description: "Manage jobs, applications, contracts, and payments in one calm workspace.",
	ctaLabel: "Already have an account?",
	ctaTo: "/login",
};

const formSide = {
	formTitle: "Create account",
	formSubtitle: "Get started with your free account.",
};

function SignupPage() {
	const { state } = useLocation();

	return (
		<AuthCard visualContent={defaultSide} formContent={formSide}>
			<SignupForm initialRole={state?.role ?? null} />
		</AuthCard>
	);
}

export default SignupPage;
