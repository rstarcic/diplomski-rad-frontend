import PrimaryTextField from "./PrimaryTextField";

export default function FormTextField({ name, errors, helperText, ...props }) {
	const errorMessage = errors?.[name];

	return (
		<PrimaryTextField name={name} error={Boolean(errorMessage)} helperText={errorMessage || helperText || " "} {...props} />
	);
}
