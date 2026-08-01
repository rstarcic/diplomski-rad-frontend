import { Box, InputAdornment, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import {
	contentSx,
	headerSx,
	labelSx,
	searchBarSx,
	searchButtonSx,
	searchFieldSx,
	subtitleSx,
	titleSx,
} from "./SearchJobsHeader.styles";

export default function SearchJobsHeader({ value = "", onChange, onSearch }) {
	const handleSearchChange = (event) => {
		onChange?.(event.target.value);
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();
		onSearch?.();
	};

	return (
		<Box sx={headerSx}>
			<Box sx={contentSx}>
				<Typography variant="overline" sx={labelSx}>
					Search jobs
				</Typography>

				<Typography variant="h3" sx={titleSx}>
					Find Opportunities
				</Typography>

				<Typography variant="subtitle1" sx={subtitleSx}>
					Find projects that fit your expertise, availability, and career goals.
				</Typography>
			</Box>

			<Box component="form" role="search" onSubmit={handleSearchSubmit} sx={searchBarSx}>
				<PrimaryTextField
					placeholder="Search by job title, category or keyword"
					value={value}
					onChange={handleSearchChange}
					sx={searchFieldSx}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<SearchRoundedIcon fontSize="medium" />
								</InputAdornment>
							),
						},
						htmlInput: {
							"aria-label": "Search jobs",
						},
					}}
				/>

				<PrimaryButton type="submit" sx={searchButtonSx}>
					Search Jobs
				</PrimaryButton>
			</Box>
		</Box>
	);
}
