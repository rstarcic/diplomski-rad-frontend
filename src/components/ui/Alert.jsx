import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function AppAlert({ severity = "info", title, children, sx, ...props }) {
	return (
		<Alert
			severity={severity}
			{...props}
			sx={(theme) => {
				const tone = theme.custom.alerts[severity] ?? theme.custom.alerts.info;

				return {
					width: "100%",
					border: "1px solid",
					borderColor: tone.border,
					backgroundColor: tone.background,
					color: tone.color,
					...(typeof sx === "function" ? sx(theme) : sx),
				};
			}}
		>
			{title ? <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle> : null}
			{children}
		</Alert>
	);
}
