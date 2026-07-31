import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { Box, Card, Chip, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { sectionSx, sectionTitleSx } from "../../../theme/layout";

import { getActionPresentation } from "../dashboardActions";
import { getDashboardItemPath } from "../dashboardRoutes";
import {
	actionAsideSx,
	actionCardSx,
	actionContentSx,
	actionCtaSx,
	actionSubtitleSx,
	actionTextSx,
	actionTitleSx,
	eyebrowSx,
	jobTitleSx,
	priorityChipSx,
} from "./NextStepsCard.styles";

export default function NextStepsCard({ actions = [] }) {
	const { role } = useAuth();

	return (
		<Paper elevation={0} sx={sectionSx}>
			<Typography variant="h6" sx={sectionTitleSx}>
				Next steps
			</Typography>

			<Stack spacing={{ xs: 1.25, sm: 2 }} sx={{ mt: { xs: 2, sm: 2.5 } }}>
				{actions.map((action) => {
					const path = getDashboardItemPath(action, role);
					const { eyebrow, title, ctaLabel } = getActionPresentation(action);

					return (
						<Card
							key={action.id}
							component={path ? RouterLink : "div"}
							to={path || undefined}
							aria-label={path ? `Open ${action.title}` : undefined}
							sx={actionCardSx(Boolean(path))}
						>
							<Box sx={actionContentSx}>
								<Box sx={actionTextSx}>
									<Typography variant="overline" sx={eyebrowSx}>
										<BoltRoundedIcon fontSize="small" />
										{eyebrow}
									</Typography>

									<Typography variant="h6" sx={actionTitleSx}>
										{title}
									</Typography>

									{action.job_title && (
										<Typography variant="body2" sx={jobTitleSx}>
											{action.job_title}
										</Typography>
									)}

									<Typography variant="body2" sx={actionSubtitleSx}>
										{action.subtitle}
									</Typography>
								</Box>

								<Box sx={actionAsideSx}>
									<Chip label={action.meta} size="small" sx={priorityChipSx} />
									{path && (
										<Box aria-hidden sx={actionCtaSx}>
											{ctaLabel}
											<ArrowForwardRoundedIcon fontSize="small" />
										</Box>
									)}
								</Box>
							</Box>
						</Card>
					);
				})}
			</Stack>
		</Paper>
	);
}
