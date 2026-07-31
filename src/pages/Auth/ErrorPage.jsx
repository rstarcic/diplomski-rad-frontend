import { Box, Button, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

import Logo from "../../components/ui/Logo";
import { ERROR_CONFIG, FALLBACK_ERROR } from "./ErrorPage.config";
import {
	blobBottomSx,
	blobTopSx,
	buttonSx,
	descriptionSx,
	iconCircleSx,
	iconFloatSx,
	iconSx,
	logoWrapSx,
	pageSx,
	titleSx,
} from "./ErrorPage.styles";

export default function ErrorPage() {
	const [searchParams] = useSearchParams();
	const code = searchParams.get("error");
	const { title, description, action } = ERROR_CONFIG[code] ?? FALLBACK_ERROR;

	return (
		<Box sx={pageSx}>
			<Box sx={blobTopSx} />
			<Box sx={blobBottomSx} />

			<Box sx={logoWrapSx}>
				<Logo />
			</Box>

			<Box sx={iconFloatSx}>
				<Box sx={iconCircleSx}>
					<SentimentDissatisfiedRoundedIcon sx={iconSx} />
				</Box>
			</Box>

			<Typography variant="h4" fontWeight={800} sx={titleSx}>
				{title}
			</Typography>

			<Typography variant="body1" sx={descriptionSx}>
				{description}
			</Typography>

			<Button component={RouterLink} to={action.to} variant="contained" size="large" sx={buttonSx}>
				{action.label}
			</Button>
		</Box>
	);
}
