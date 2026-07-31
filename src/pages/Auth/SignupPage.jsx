import { useLocation } from "react-router-dom";

import AuthCard from "./components/AuthCard";
import SignupForm from "./components/SignupForm";

const VISUAL_CONTENT = {
	title: "Welcome back to WorkLink.",
	description: "Manage jobs, applications, contracts, and payments in one calm workspace.",
	ctaLabel: "Already have an account?",
	ctaTo: "/login",
};

const FORM_CONTENT = {
	formTitle: "Create account",
	formSubtitle: "Get started with your free account.",
};

export default function SignupPage() {
	const { state } = useLocation();

	return (
		<AuthCard visualContent={VISUAL_CONTENT} formContent={FORM_CONTENT}>
			<SignupForm initialRole={state?.role ?? null} />
		</AuthCard>
	);
}
