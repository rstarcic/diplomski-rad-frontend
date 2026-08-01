import { Grid, Typography } from "@mui/material";

import JobCard from "../search/JobCard";

export default function JobsResultsSection({ jobs = [] }) {
	if (!jobs.length) {
		return (
			<Typography color="text.secondary" sx={{ mt: 3 }}>
				No jobs match your filters.
			</Typography>
		);
	}

	return (
		<Grid container spacing={2.5} sx={{ mt: 3 }}>
			{jobs.map((job) => (
				<Grid key={job.id} size={{ xs: 12, sm: 6, lg: 4 }}>
					<JobCard job={job} />
				</Grid>
			))}
		</Grid>
	);
}
