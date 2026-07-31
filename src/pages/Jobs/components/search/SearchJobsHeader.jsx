import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
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

	const handleSearchKeyDown = (event) => {
		if (event.key === "Enter") {
			onSearch?.();
		}
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

			<Box sx={searchBarSx}>
				<TextField
					size="small"
					placeholder="Search by job title, category or keyword"
					value={value}
					onChange={handleSearchChange}
					onKeyDown={handleSearchKeyDown}
					sx={searchFieldSx}
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

				<PrimaryButton onClick={onSearch} sx={searchButtonSx}>
					Search Jobs
				</PrimaryButton>
			</Box>
		</Box>
	);
}
