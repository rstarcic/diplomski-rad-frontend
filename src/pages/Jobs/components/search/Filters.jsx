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
import { surfaceSectionSx } from "../../../../theme/layout";
import { BUDGET_TYPES, INITIAL_JOB_FILTERS, LOCATION_TYPES, WORK_MODES } from "../../../../constants/jobFilters";

const filterCardSx = {
	...surfaceSectionSx,
	p: { xs: 2, md: 2.5 },
};

const resetButtonSx = {
	display: "flex",
	alignItems: "center",
	gap: 0.5,
	background: "none",
	border: "none",
	cursor: "pointer",
	color: "text.secondary",
	fontSize: "0.8125rem",
	fontWeight: 600,
	p: 0,
	transition: "color 0.15s",
	"&:hover": { color: "primary.main" },
};

const filterGridSx = {
	display: "grid",
	gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
	gap: 2,
	alignItems: "center",
};

const budgetSectionSx = (theme) => ({
	mt: 2,
	p: { xs: 1.5, md: 2 },
	border: "1px solid",
	borderColor: "divider",
	borderRadius: 2,
	bgcolor: theme.custom.tint.primarySubtle,
});

const budgetLabelSx = {
	display: "block",
	mb: 1.5,
	textTransform: "uppercase",
	letterSpacing: 0.8,
	fontSize: "0.7rem",
};

const budgetToggleGroupSx = {
	height: 40,
	flexShrink: 0,
	"& .MuiToggleButton-root": {
		px: 2.5,
		fontSize: "0.8125rem",
		"&:first-of-type": { borderRadius: "20px 0 0 20px" },
		"&:last-of-type": { borderRadius: "0 20px 20px 0" },
	},
};

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
