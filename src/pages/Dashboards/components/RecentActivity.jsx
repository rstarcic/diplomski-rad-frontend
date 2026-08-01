import { useState } from "react";
import { Box, Button, Card, Chip, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import { fullHeightSectionSx, sectionTitleSx } from "../../../theme/layout";

import { getActivityVisual } from "../dashboardActivity";
import { getDashboardItemPath } from "../dashboardRoutes";
import {
	activityTextSx,
	iconWrapSx,
	itemContentSx,
	itemSx,
	metaChipSx,
	sectionHeaderSx,
	subtitleSx,
	titleSx,
	viewAllButtonSx,
} from "./RecentActivity.styles";

const DEFAULT_VISIBLE_COUNT = 3;

export default function RecentActivity({ activities = [] }) {
	const { role } = useAuth();
	const [showAll, setShowAll] = useState(false);

	const hasMore = activities.length > DEFAULT_VISIBLE_COUNT;

	const visibleActivities = showAll ? activities : activities.slice(0, DEFAULT_VISIBLE_COUNT);

	return (
		<Paper elevation={0} sx={fullHeightSectionSx}>
			<Box sx={sectionHeaderSx}>
				<Typography variant="h6" sx={sectionTitleSx}>
					Recent activity
				</Typography>

				{hasMore && (
					<Button
						variant="text"
						size="small"
						aria-expanded={showAll}
						onClick={() => setShowAll((current) => !current)}
						sx={viewAllButtonSx}
					>
						{showAll ? "Show less" : "View all"}
					</Button>
				)}
			</Box>

			<Stack spacing={{ xs: 1.25, sm: 2 }} sx={{ mt: { xs: 2, sm: 3 } }}>
				{visibleActivities.map((activity) => {
					const path = getDashboardItemPath(activity, role);
					const { Icon, tone } = getActivityVisual(activity.type);

					return (
						<Card
							key={activity.id}
							component={path ? RouterLink : "div"}
							to={path || undefined}
							aria-label={path ? `Open ${activity.title}` : undefined}
							sx={itemSx(Boolean(path))}
						>
							<Box sx={itemContentSx}>
								<Box sx={iconWrapSx(tone)}>
									<Icon />
								</Box>

								<Box sx={activityTextSx}>
									<Typography variant="subtitle1" sx={titleSx}>
										{activity.title}
									</Typography>

									<Typography variant="body2" sx={subtitleSx}>
										{activity.subtitle}
									</Typography>
								</Box>

								<Chip label={activity.meta} size="small" sx={metaChipSx} />
							</Box>
						</Card>
					);
				})}
			</Stack>
		</Paper>
	);
}
