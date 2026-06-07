import {
	Autocomplete,
	Box,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import { surfaceSectionSx } from "../../../../theme/layout";
import { BUDGET_TYPES, INITIAL_JOB_FILTERS, LOCATION_TYPES, WORK_MODES } from "../../constants/jobFilters";

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
		<Card elevation={0} sx={{ ...surfaceSectionSx, p: { xs: 2, md: 2.5 } }}>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					},
					gap: 2,
					alignItems: "center",
				}}
			>
				{showSearchField && (
					<PrimaryTextField
						label="Search jobs"
						placeholder="Search by title, skill, or keyword"
						value={filters.search}
						onChange={handleChange("search")}
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
							onChange?.({
								...filters,
								city: newValue?.value || "",
							});
						}}
						renderInput={(params) => <TextField {...params} label="City" size="small" />}
					/>
				)}

				<ToggleButtonGroup
					exclusive
					size="small"
					value={filters.budgetType}
					onChange={handleBudgetTypeChange}
					sx={{
						width: "100%",
						height: 40,
						"& .MuiToggleButton-root": {
							flex: 1,
							textTransform: "none",
							fontWeight: 700,
						},
						"& .Mui-selected": {
							color: "white",
							bgcolor: "primary.main",
							"&:hover": {
								bgcolor: "primary.dark",
							},
						},
					}}
				>
					{BUDGET_TYPES.map((type) => (
						<ToggleButton key={type.value} value={type.value}>
							{type.label}
						</ToggleButton>
					))}
				</ToggleButtonGroup>

				<Stack direction="row" spacing={1}>
					<TextField
						label="Min"
						type="number"
						value={minValue}
						onChange={handleChange(minField)}
						size="small"
						fullWidth
						slotProps={{
							input: {
								endAdornment: <InputAdornment position="end">{budgetAdornment}</InputAdornment>,
							},
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
							input: {
								endAdornment: <InputAdornment position="end">{budgetAdornment}</InputAdornment>,
							},
							htmlInput: { min: 0 },
						}}
					/>
				</Stack>

				<PrimaryButton variant="outlined" onClick={handleReset} sx={{ height: 40, whiteSpace: "nowrap" }}>
					Reset filters
				</PrimaryButton>
			</Box>
		</Card>
	);
}
