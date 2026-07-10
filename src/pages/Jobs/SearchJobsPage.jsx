import { useState } from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Box, Drawer, Pagination } from "@mui/material";

import AppAlert from "../../components/ui/Alert";
import SecondaryButton from "../../components/ui/SecondaryButton";
import Filters from "./components/search/Filters";
import SearchJobsHeader from "./components/search/SearchJobsHeader";
import JobsResultsSection from "./components/search/JobsResultsSection";

import { useJobSearch } from "../../hooks/useJobSearch";
import { useJobFilterOptions } from "../../hooks/useJobFilterOptions";
import { INITIAL_JOB_FILTERS } from "../../constants/jobFilters";

const mobileFilterButtonSx = {
	display: { xs: "flex", md: "none" },
	justifyContent: "flex-end",
	mt: 1.5,
};

const desktopFiltersSx = {
	display: { xs: "none", md: "block" },
	mt: 2,
};

const drawerSx = {
	display: { xs: "block", md: "none" },
};

const drawerPaperSx = {
	p: 2,
	borderTopLeftRadius: 3,
	borderTopRightRadius: 3,
	maxHeight: "85vh",
	overflowY: "auto",
};

const paginationContainerSx = {
	display: "flex",
	justifyContent: "center",
	mt: 4,
};

export default function SearchJobsPage() {
	const [searchInput, setSearchInput] = useState("");
	const [appliedSearch, setAppliedSearch] = useState("");

	const [draftFilters, setDraftFilters] = useState(INITIAL_JOB_FILTERS);
	const [appliedFilters, setAppliedFilters] = useState(INITIAL_JOB_FILTERS);

	const [page, setPage] = useState(1);
	const [filtersOpen, setFiltersOpen] = useState(false);

	const {
		jobs,
		pagination,
		loading: jobsLoading,
		error: jobsError,
	} = useJobSearch({
		search: appliedSearch,
		filters: appliedFilters,
		page,
	});

	const { options, loading: optionsLoading, error: optionsError } = useJobFilterOptions();

	const handleSearch = () => {
		setPage(1);
		setAppliedSearch(searchInput.trim());
	};

	const handleApplyFilters = () => {
		setPage(1);
		setAppliedFilters(draftFilters);
		setFiltersOpen(false);
	};

	const handleResetFilters = () => {
		setPage(1);
		setDraftFilters(INITIAL_JOB_FILTERS);
		setAppliedFilters(INITIAL_JOB_FILTERS);
	};

	const handlePageChange = (_event, nextPage) => {
		setPage(nextPage);

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<Box>
			<SearchJobsHeader value={searchInput} onChange={setSearchInput} onSearch={handleSearch} />

			<Box sx={mobileFilterButtonSx}>
				<SecondaryButton startIcon={<FilterListRoundedIcon />} onClick={() => setFiltersOpen(true)}>
					Filter
				</SecondaryButton>
			</Box>

			{optionsError && (
				<AppAlert severity="warning" title="Filters could not be loaded" sx={{ mt: 2 }}>
					{optionsError}
				</AppAlert>
			)}

			<Box sx={desktopFiltersSx}>
				{optionsLoading ? (
					<AppAlert title="Loading filters">Please wait while we load available filters.</AppAlert>
				) : (
					<Filters
						filters={draftFilters}
						options={options}
						onChange={setDraftFilters}
						onApply={handleApplyFilters}
						onReset={handleResetFilters}
						showSearchField={false}
					/>
				)}
			</Box>

			<Drawer
				anchor="bottom"
				open={filtersOpen}
				onClose={() => setFiltersOpen(false)}
				sx={drawerSx}
				slotProps={{
					paper: {
						sx: drawerPaperSx,
					},
				}}
			>
				{optionsLoading ? (
					<AppAlert title="Loading filters">Please wait while we load available filters.</AppAlert>
				) : optionsError ? (
					<AppAlert severity="warning" title="Filters could not be loaded">
						{optionsError}
					</AppAlert>
				) : (
					<Filters
						filters={draftFilters}
						options={options}
						onChange={setDraftFilters}
						onApply={handleApplyFilters}
						onReset={handleResetFilters}
						showSearchField={false}
					/>
				)}
			</Drawer>

			{jobsLoading ? (
				<AppAlert title="Loading jobs" sx={{ mt: 3 }}>
					Please wait while we load available jobs.
				</AppAlert>
			) : jobsError ? (
				<AppAlert severity="error" title="Jobs could not be loaded" sx={{ mt: 3 }}>
					{jobsError}
				</AppAlert>
			) : (
				<>
					<JobsResultsSection jobs={jobs} />

					{pagination?.totalPages > 1 && (
						<Box sx={paginationContainerSx}>
							<Pagination
								page={pagination.page}
								count={pagination.totalPages}
								onChange={handlePageChange}
								color="primary"
								shape="rounded"
							/>
						</Box>
					)}
				</>
			)}
		</Box>
	);
}
