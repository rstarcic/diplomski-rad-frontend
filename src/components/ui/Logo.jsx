import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const logoRootSx = {
	display: "inline-flex",
	alignItems: "center",
	gap: 1.1,
	textDecoration: "none",
	color: "inherit",
};

const textWrapSx = {
	display: "flex",
	flexDirection: "column",
	lineHeight: 1,
};

const logoNameSx = {
	fontWeight: 950,
	fontSize: "1.45rem",
	letterSpacing: "-0.04em",
	lineHeight: 1,
	color: "#fff",
};

const logoNameDarkSx = {
	color: "#172554",
};

const logoAccentSx = {
	color: "#8b5cf6",
};

const mottoSx = {
	mt: 0.45,
	fontSize: "0.62rem",
	fontWeight: 800,
	letterSpacing: "0.17em",
	textTransform: "uppercase",
	color: "rgba(255,255,255,0.72)",
};

const mottoDarkSx = {
	color: "rgba(15, 23, 42, 0.55)",
};

export default function Logo({ dark = false, showMotto = true }) {
	return (
		<Box component={RouterLink} to="/" sx={logoRootSx}>
			<Box sx={textWrapSx}>
				<Typography
					component="span"
					sx={{
						...logoNameSx,
						...(dark && logoNameDarkSx),
					}}
				>
					Work
					<Box component="span" sx={logoAccentSx}>
						Link
					</Box>
				</Typography>

				{showMotto && (
					<Typography
						component="span"
						sx={{
							...mottoSx,
							...(dark && mottoDarkSx),
						}}
					>
						Work together. Achieve more.
					</Typography>
				)}
			</Box>
		</Box>
	);
}
