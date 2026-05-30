import { Box, Typography } from "@mui/material";

const headerSx = (theme) => ({
	display: "flex",
	justifyContent: "space-between",
	flexDirection: { xs: "column", md: "row" },
	alignItems: { xs: "flex-start", md: "center" },
	gap: { xs: 2, md: 3 },
	p: { xs: 2.25, sm: 3, md: 4 },
	border: theme.custom.pageHeader.border,
	borderRadius: theme.custom.pageHeader.borderRadius,
	background: theme.custom.pageHeader.background,
	color: theme.custom.pageHeader.color,
	boxShadow: theme.custom.pageHeader.shadow,
	minHeight: theme.custom.pageHeader.minHeight,
});

const labelSx = (theme) => ({
	color: theme.custom.pageHeader.label,
});

const titleSx = {
	fontSize: { xs: "2rem", sm: "2.35rem", md: "3rem" },
	lineHeight: 1.1,
};

const subtitleSx = (theme) => ({
	mt: 1,
	maxWidth: 680,
	color: theme.custom.pageHeader.subtitle,
	fontSize: { xs: "0.9rem", sm: "1rem" },
});

const actionsSx = {
	display: "flex",
	alignItems: "center",
	gap: 1.5,
	flexWrap: "wrap",
	justifyContent: { xs: "flex-start", md: "flex-end" },
	flexShrink: 0,
};

export default function PageHeader({ label, title, subtitle, children }) {
	return (
		<Box sx={headerSx}>
			<Box sx={{ minWidth: 0 }}>
				{label && (
					<Typography variant="overline" sx={labelSx}>
						{label}
					</Typography>
				)}

				<Typography variant="h3" sx={titleSx}>
					{title}
				</Typography>

				{subtitle && (
					<Typography variant="subtitle1" sx={subtitleSx}>
						{subtitle}
					</Typography>
				)}
			</Box>

			{children && <Box sx={actionsSx}>{children}</Box>}
		</Box>
	);
}
