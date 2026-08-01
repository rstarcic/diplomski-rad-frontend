import {
	Autocomplete,
	Box,
	Card,
	Divider,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { BUDGET_TYPES, INITIAL_JOB_FILTERS, LOCATION_TYPES } from "../../../../constants/jobFilters";
import { budgetToggleGroupSx, filterActionsSx, filterCardSx, filterGridSx, resetButtonSx } from "./Filters.styles";

const EMPTY_OPTIONS = {
	categories: [],
	cities: [],
};

const getOptionValue = (option) => option?.value ?? option ?? "";
const getOptionLabel = (option) => option?.label ?? option ?? "";

export default function Filters({
	filters = INITIAL_JOB_FILTERS,
	options = EMPTY_OPTIONS,
	onChange,
	onApply,
	onReset,
	showSearchField = true,
	showCategoryField = true,
	showLocationTypes = true,
}) {
	const { categories = [], cities = [] } = options;
	const isCityVisible = filters.locationType !== "remote";
	const hasBudgetType = Boolean(filters.budgetType);
	const isFixedBudget = filters.budgetType === "fixed";

	const minValue = filters.minBudget;
	const maxValue = filters.maxBudget;
	const budgetAdornment = isFixedBudget ? "EUR" : "EUR/h";

	const handleChange = (field) => (event) => {
		const value = event.target.value;
		onChange?.({
			...filters,
			[field]: value,
			...(field === "locationType" && value === "remote" ? { city: "" } : {}),
		});
	};

	const handleCityChange = (_event, newValue) => {
		onChange?.({ ...filters, city: getOptionValue(newValue) });
	};

	const handleBudgetTypeChange = (_event, value) => {
		if (!value) return;
		onChange?.({
			...filters,
			budgetType: value,
			minBudget: "",
			maxBudget: "",
		});
	};

	const handleReset = () => {
		onChange?.({ ...INITIAL_JOB_FILTERS });
		onReset?.();
	};

	return (
		<Card elevation={0} sx={filterCardSx}>
			<Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
				<Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
					<FilterListRoundedIcon sx={{ color: "primary.main", fontSize: 24 }} />
					<Box component="span" sx={{ color: "text.primary", fontWeight: 700 }}>
						Filters
					</Box>
				</Stack>

				<Box component="button" type="button" onClick={handleReset} sx={resetButtonSx}>
					<RestartAltRoundedIcon sx={{ color: "primary.main", fontSize: 23 }} />
					<Box component="span">Reset</Box>
				</Box>
			</Stack>

			<Divider sx={{ mb: 1.5 }} />

			<Box sx={filterGridSx(isCityVisible)}>
				{showSearchField && (
					<PrimaryTextField
						label="Search jobs"
						placeholder="Search by title, category, or keyword"
						value={filters.search}
						onChange={handleChange("search")}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<SearchRoundedIcon sx={{ color: "text.disabled", fontSize: 18 }} />
									</InputAdornment>
								),
							},
						}}
					/>
				)}

				{showCategoryField && (
					<FormControl size="small" fullWidth>
						<InputLabel>Category</InputLabel>
						<Select label="Category" value={filters.category ?? ""} onChange={handleChange("category")}>
							<MenuItem value="">All categories</MenuItem>
							{categories.map((category) => (
								<MenuItem key={getOptionValue(category)} value={getOptionValue(category)}>
									{getOptionLabel(category)}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				{showLocationTypes && (
					<FormControl size="small" fullWidth>
						<InputLabel>Work mode</InputLabel>
						<Select label="Work mode" value={filters.locationType ?? ""} onChange={handleChange("locationType")}>
							<MenuItem value="">All modes</MenuItem>
							{LOCATION_TYPES.map((mode) => (
								<MenuItem key={mode.value} value={mode.value}>
									{mode.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				{isCityVisible && (
					<Autocomplete
						options={cities}
						value={cities.find((city) => getOptionValue(city) === filters.city) ?? null}
						getOptionLabel={getOptionLabel}
						isOptionEqualToValue={(option, value) => getOptionValue(option) === getOptionValue(value)}
						onChange={handleCityChange}
						renderInput={(params) => (
							<PrimaryTextField {...params} label="City" placeholder="All cities" size="small" />
						)}
					/>
				)}

				<ToggleButtonGroup
					exclusive
					size="small"
					value={filters.budgetType ?? ""}
					onChange={handleBudgetTypeChange}
					sx={budgetToggleGroupSx}
				>
					{BUDGET_TYPES.map((type) => (
						<ToggleButton key={type.value} value={type.value}>
							{type.label}
						</ToggleButton>
					))}
				</ToggleButtonGroup>

				<PrimaryTextField
					label="Min"
					type="number"
					disabled={!hasBudgetType}
					value={minValue}
					onChange={handleChange("minBudget")}
					size="small"
					fullWidth
					slotProps={{
						input: { endAdornment: <InputAdornment position="end">{budgetAdornment}</InputAdornment> },
						htmlInput: { min: 0 },
					}}
				/>

				<PrimaryTextField
					label="Max"
					type="number"
					disabled={!hasBudgetType}
					value={maxValue}
					onChange={handleChange("maxBudget")}
					size="small"
					fullWidth
					slotProps={{
						input: { endAdornment: <InputAdornment position="end">{budgetAdornment}</InputAdornment> },
						htmlInput: { min: 0 },
					}}
				/>

				<Box sx={filterActionsSx}>
					<PrimaryButton size="small" onClick={onApply}>
						Apply filters
					</PrimaryButton>
				</Box>
			</Box>
		</Card>
	);
}
