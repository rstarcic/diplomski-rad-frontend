import StatusChip from "./StatusChip";
import { APPLICATION_STATUSES } from "../../constants/statuses";
import { findStatusKey } from "../../utils/jobs";

export default function ApplicationStatusChip({ status, label, ...props }) {
	const statusKey = findStatusKey(status, APPLICATION_STATUSES);
	if (!statusKey) return null;

	return (
		<StatusChip
			status={statusKey}
			config={APPLICATION_STATUSES}
			label={label}
			{...props}
		/>
	);
}
