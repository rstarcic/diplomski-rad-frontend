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
	return (
		<AuthCard visualContent={defaultSide} formContent={formSide}>
			<LoginForm />
		</AuthCard>
	);
}

export default LoginPage;
