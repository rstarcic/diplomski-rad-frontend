import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
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
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";

import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { BUDGET_TYPES, INITIAL_JOB_FILTERS, LOCATION_TYPES, WORK_MODES } from "../../../../constants/jobFilters";
import { filterCardSx, resetButtonSx, filterGridSx, budgetSectionSx, budgetLabelSx, budgetToggleGroupSx } from "./Filters.styles";

export default function Filters({
	filters = INITIAL_JOB_FILTERS,
	onChange,
	onReset,
	showSearchField = true,
	showCategoryField = true,
	showWorkModeField = true,
}) {
	const isCityVisible = ["onsite", "hybrid"].includes(filters.workMode);
	const isFixedBudget = filters.budgetType === "fixed";

	const minValue = isFixedBudget ? filters.minFixedBudget : filters.minHourlyRate;
	const maxValue = isFixedBudget ? filters.maxFixedBudget : filters.maxHourlyRate;
	const minField = isFixedBudget ? "minFixedBudget" : "minHourlyRate";
	const maxField = isFixedBudget ? "maxFixedBudget" : "maxHourlyRate";
	const budgetAdornment = isFixedBudget ? "€" : "€/h";

	const handleChange = (field) => (event) => {
		const value = event.target.value;
		onChange?.({
			...filters,
			[field]: value,
			...(field === "workMode" && value === "remote" ? { city: "" } : {}),
		});
	};

	const handleBudgetTypeChange = (event, value) => {
		if (!value) return;
		onChange?.({
			...filters,
			budgetType: value,
			...(value === "fixed" ? { minHourlyRate: "", maxHourlyRate: "" } : { minFixedBudget: "", maxFixedBudget: "" }),
		});
	};

	const handleReset = () => {
		onChange?.(INITIAL_JOB_FILTERS);
		onReset?.();
	};

	return (
		<Card elevation={0} sx={filterCardSx}>
			{/* Header */}
			<Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}>
				<Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
					<FilterListRoundedIcon sx={{ color: "primary.main", fontSize: 25 }} />
				</Stack>
				<Box component="button" onClick={handleReset} sx={resetButtonSx}>
					<RestartAltRoundedIcon sx={{ color: "primary.main", fontSize: 25 }} />
					<Typography>Reset</Typography>
				</Box>
			</Stack>

			<Divider sx={{ mb: 2 }} />

			{/* Search, category, work mode, city */}
			<Box sx={filterGridSx}>
				{showSearchField && (
					<PrimaryTextField
						label="Search jobs"
						placeholder="Search by title, skill, or keyword"
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
						<Select label="Category" value={filters.category} onChange={handleChange("category")}>
							<MenuItem value="">All categories</MenuItem>
							{["it", "design", "marketing"].map((category) => (
								<MenuItem key={category} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				{showWorkModeField && (
					<FormControl size="small" fullWidth>
						<InputLabel>Work mode</InputLabel>
						<Select label="Work mode" value={filters.workMode} onChange={handleChange("workMode")}>
							<MenuItem value="">All modes</MenuItem>
							{WORK_MODES.map((mode) => (
								<MenuItem key={mode.value} value={mode.value}>
									{mode.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				)}

				{isCityVisible && (
					<Autocomplete
						options={LOCATION_TYPES}
						value={LOCATION_TYPES.find((location) => location.value === filters.city) || null}
						getOptionLabel={(option) => option.label}
						isOptionEqualToValue={(option, value) => option.value === value.value}
						onChange={(event, newValue) => {
							onChange?.({ ...filters, city: newValue?.value || "" });
						}}
						renderInput={(params) => <TextField {...params} label="City" size="small" />}
					/>
				)}
			</Box>

			{/* Budget section */}
			<Box sx={budgetSectionSx}>
				<Typography variant="caption" fontWeight={700} color="text.secondary" sx={budgetLabelSx}>
					Budget
				</Typography>

				<Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" } }}>
					<ToggleButtonGroup
						exclusive
						size="small"
						value={filters.budgetType}
						onChange={handleBudgetTypeChange}
						sx={budgetToggleGroupSx}
					>
						{BUDGET_TYPES.map((type) => (
							<ToggleButton key={type.value} value={type.value}>
								{type.label}
							</ToggleButton>
						))}
					</ToggleButtonGroup>

					<Stack direction="row" spacing={1} flex={1} width="100%">
						<TextField
							label="Min"
							type="number"
							value={minValue}
							onChange={handleChange(minField)}
							size="small"
							fullWidth
							slotProps={{
								input: { endAdornment: <InputAdornment position="end">{budgetAdornment}</InputAdornment> },
								htmlInput: { min: 0 },
							}}
						/>
						<TextField
							label="Max"
							type="number"
							value={maxValue}
							onChange={handleChange(maxField)}
							size="small"
							fullWidth
							slotProps={{
								input: { endAdornment: <InputAdornment position="end">{budgetAdornment}</InputAdornment> },
								htmlInput: { min: 0 },
							}}
						/>
					</Stack>
				</Stack>
			</Box>
		</Card>
	);
}
