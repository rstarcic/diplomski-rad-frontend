import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const createAlertSx = (severity, customSx) => (theme) => {
	const tone = theme.custom.alerts[severity] ?? theme.custom.alerts.info;

	return {
		width: "100%",
		border: "1px solid",
		borderColor: tone.border,
		backgroundColor: tone.background,
		color: tone.color,
		...(typeof customSx === "function" ? customSx(theme) : customSx),
	};
};

export default function AppAlert({ severity = "info", title, children, sx, ...props }) {
	return (
		<Alert
			severity={severity}
			{...props}
			sx={createAlertSx(severity, sx)}
		>
			{title ? <AlertTitle sx={{ fontWeight: 700 }}>{title}</AlertTitle> : null}
			{children}
		</Alert>
	);
}
