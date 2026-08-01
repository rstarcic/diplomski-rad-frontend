import { Button } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useLocation, useNavigate } from "react-router-dom";

const createBackButtonSx = (customSx) => (theme) => ({
	height: 40,
	borderRadius: theme.custom.radius.pill,
	px: 2,
	fontWeight: 700,
	textTransform: "none",
	color: theme.palette.text.primary,
	borderColor: theme.palette.divider,
	backgroundColor: theme.palette.background.paper,
	backdropFilter: "blur(8px)",
	boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.03)",

	"&:hover": {
		borderColor: theme.palette.primary.main,
		backgroundColor: theme.palette.background.paper,
	},

	...(typeof customSx === "function" ? customSx(theme) : customSx),
});

export function BackButton({ children = "Back", sx = {}, backTo }) {
	const navigate = useNavigate();
	const location = useLocation();

	function handleBack() {
		const previousPath = location.state?.from;

		if (previousPath) {
			navigate(previousPath);
			return;
		}

		if (backTo) {
			navigate(backTo);
			return;
		}

		navigate(-1);
	}

	return (
		<Button variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={handleBack} sx={createBackButtonSx(sx)}>
			{children}
		</Button>
	);
}
