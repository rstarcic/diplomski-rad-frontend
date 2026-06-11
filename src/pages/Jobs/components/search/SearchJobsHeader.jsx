import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { INITIAL_JOB_FILTERS } from "../../../../constants/jobFilters";

export default function SearchJobsHeader({ filters = INITIAL_JOB_FILTERS, onChange, onSearch }) {
	const updateFilter = (field) => (event) => {
		onChange?.({
			...filters,
			[field]: event.target.value,
		});
	};

	const handleSearchKeyDown = (event) => {
		if (event.key === "Enter") {
			onSearch?.();
		}
	};

	return (
		<Box
			sx={(theme) => ({
				position: "relative",
				overflow: "hidden",
				border: theme.custom.pageHeader.border,
				borderRadius: theme.custom.pageHeader.borderRadius,
				background: theme.custom.pageHeader.background,
				color: theme.custom.pageHeader.color,
				boxShadow: theme.custom.pageHeader.shadow,
				p: { xs: 2.25, sm: 3, md: 4 },
			})}
		>
			<Box sx={{ position: "relative", zIndex: 1, maxWidth: { xs: "100%", md: 760 } }}>
				<Typography variant="overline" sx={(theme) => ({ color: theme.custom.pageHeader.label, fontWeight: 800 })}>
					Search jobs
				</Typography>

				<Typography
					variant="h3"
					sx={{
						fontSize: { xs: "2rem", sm: "2.6rem", md: "3.15rem" },
						lineHeight: 1.08,
						fontWeight: 900,
					}}
				>
					Explore available opportunities
				</Typography>

				<Typography
					variant="subtitle1"
					sx={(theme) => ({
						mt: 1,
						color: theme.custom.pageHeader.subtitle,
						fontSize: { xs: "0.9rem", sm: "1rem" },
					})}
				>
					Find projects that fit your expertise, availability, and career goals.
				</Typography>
			</Box>

			<Box
				sx={{
					position: "relative",
					zIndex: 1,
					mt: 3,
					p: { xs: 1, sm: 1 },
					borderRadius: 2,
					bgcolor: "rgba(255, 255, 255, 0.94)",
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "minmax(0, 1fr) auto",
					},
					gap: 1,
					alignItems: "center",
				}}
			>
				<TextField
					size="small"
					placeholder="Search by job title, skill, or keyword"
					value={filters.search}
					onChange={updateFilter("search")}
					onKeyDown={handleSearchKeyDown}
					sx={{
						width: "100%",
						"& .MuiOutlinedInput-root": {
							"& fieldset": { border: "none" },
							"&:hover fieldset": { border: "none" },
							"&.Mui-focused fieldset": { border: "none" },
						},
					}}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<SearchRoundedIcon fontSize="medium" />
								</InputAdornment>
							),
						},
					}}
				/>

				<PrimaryButton
					onClick={onSearch}
					sx={{
						justifySelf: { xs: "end", sm: "auto" },
						px: 2.5,
						whiteSpace: "nowrap",
					}}
				>
					Search Jobs
				</PrimaryButton>
			</Box>
		</Box>
	);
}
