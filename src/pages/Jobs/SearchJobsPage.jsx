import { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Box, Drawer } from "@mui/material";
import SecondaryButton from "../../components/ui/SecondaryButton";
import pageSx from "../../theme/layout";
import Filters from "./components/search/Filters";
import SearchJobsHeader from "./components/search/SearchJobsHeader";
import JobsResultsSection from "./components/search/JobsResultsSection";
import { INITIAL_JOB_FILTERS } from "./constants/jobFilters";
import { MOCK_JOBS } from "../../mock/Jobs";

const mobileFilterButtonSx = {
	display: { xs: "flex", md: "none" },
	justifyContent: "flex-end",
	mt: 1.5,
};

const desktopFiltersSx = {
	display: { xs: "none", md: "block" },
	mt: 2,
};

const drawerPaperSx = {
	p: 2,
	borderTopLeftRadius: 3,
	borderTopRightRadius: 3,
	maxHeight: "85vh",
	overflowY: "auto",
};

export default function SearchJobsPage() {
	const [filters, setFilters] = useState(INITIAL_JOB_FILTERS);
	const [filtersOpen, setFiltersOpen] = useState(false);

	const resetFilters = () => {
		setFilters(INITIAL_JOB_FILTERS);
	};

	const handleSearch = () => {};

	return (
		<Box sx={pageSx}>
			<SearchJobsHeader filters={filters} onChange={setFilters} onSearch={handleSearch} />

			<Box sx={mobileFilterButtonSx}>
				<SecondaryButton startIcon={<FilterListRoundedIcon />} onClick={() => setFiltersOpen(true)}>
					Filter
				</SecondaryButton>
			</Box>

			<Box sx={desktopFiltersSx}>
				<Filters
					filters={filters}
					onChange={setFilters}
					onReset={resetFilters}
					showSearchField={false}
					showWorkModeField={false}
				/>
			</Box>

			<Drawer
				anchor="bottom"
				open={filtersOpen}
				onClose={() => setFiltersOpen(false)}
				sx={{ display: { xs: "block", md: "none" } }}
				slotProps={{
					paper: {
						sx: { drawerPaperSx },
					},
				}}
			>
				<Filters filters={filters} onChange={setFilters} onReset={resetFilters} showSearchField={false} />
			</Drawer>
			<JobsResultsSection jobs={MOCK_JOBS} />
		</Box>
	);
}
