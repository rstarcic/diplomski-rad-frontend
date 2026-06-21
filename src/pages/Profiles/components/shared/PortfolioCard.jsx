import { useState } from "react";
import {
	Paper,
	Box,
	Stack,
	Typography,
	IconButton,
	TextField,
	Collapse,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { sectionTitleSx } from "../../../../theme/layout";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import {
	portfolioPaperSx,
	portfolioHeaderSx,
	portfolioGridSx,
	portfolioImageSx,
	portfolioItemHeaderSx,
	portfolioItemTitleSx,
	portfolioLinkButtonSx,
	portfolioItemDescSx,
	toggleButtonRowSx,
	toggleButtonSx,
	addFormStackSx,
	formActionsRowSx,
} from "./PortfolioCard.styles";

const PREVIEW_LIMIT = 2;

const emptyForm = {
	title: "",
	description: "",
	url: "",
	image: "",
};

const viewAllButtonSx = {
	mt: 2,
	fontWeight: 800,
	textTransform: "none",
};

const dialogTitleSx = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	pr: 1,
};

function PortfolioItem({ item }) {
	return (
		<Box sx={{ minWidth: 0 }}>
			<Box component="img" src={item.image} alt={item.title || "Portfolio item"} sx={portfolioImageSx} />

			<Stack direction="row" spacing={1} sx={portfolioItemHeaderSx}>
				<Typography variant="subtitle2" sx={portfolioItemTitleSx}>
					{item.title || "Untitled project"}
				</Typography>

				{item.url && (
					<IconButton
						size="small"
						component="a"
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						sx={portfolioLinkButtonSx}
					>
						<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
					</IconButton>
				)}
			</Stack>

			<Typography variant="body2" color="text.secondary" sx={portfolioItemDescSx}>
				{item.description || "No description provided."}
			</Typography>
		</Box>
	);
}

export default function PortfolioCard({
	items = [],
	editable = false,
	onAddItem,
	title = "Portfolio",
	disablePaper = false,
}) {
	const [form, setForm] = useState(emptyForm);
	const [open, setOpen] = useState(false);
	const [openProjects, setOpenProjects] = useState(false);

	const previewItems = editable ? items : items.slice(0, PREVIEW_LIMIT);
	const hasMoreProjects = !editable && items.length > PREVIEW_LIMIT;

	const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

	const handleAdd = () => {
		if (!form.title.trim()) return;

		onAddItem?.({
			title: form.title.trim(),
			description: form.description.trim(),
			url: form.url.trim(),
			image: form.image.trim(),
		});

		setForm(emptyForm);
		setOpen(false);
	};

	const content = (
		<>
			<Stack direction="row" spacing={1.5} sx={portfolioHeaderSx}>
				<Box>
					<Typography variant="h6" sx={sectionTitleSx}>
						{title}
					</Typography>

					{editable && (
						<Typography variant="body2" color="text.secondary">
							Showcase your best work and past projects.
						</Typography>
					)}
				</Box>
			</Stack>

			{previewItems.length > 0 ? (
				<>
					<Box sx={portfolioGridSx}>
						{previewItems.map((item, index) => (
							<PortfolioItem key={item.id ?? index} item={item} />
						))}
					</Box>

					{hasMoreProjects && (
						<Button
							variant="text"
							endIcon={<ArrowForwardRoundedIcon />}
							onClick={() => setOpenProjects(true)}
							sx={viewAllButtonSx}
						>
							View all projects
						</Button>
					)}
				</>
			) : (
				<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
					{editable ? "Add your first project below." : "No portfolio items yet."}
				</Typography>
			)}

			{editable && (
				<Box sx={toggleButtonRowSx}>
					<PrimaryButton
						variant="outlined"
						startIcon={open ? <ExpandLessRoundedIcon /> : <AddRoundedIcon />}
						onClick={() => setOpen((value) => !value)}
						sx={toggleButtonSx}
					>
						{open ? "Hide form" : "Add portfolio item"}
					</PrimaryButton>
				</Box>
			)}

			{editable && (
				<Collapse in={open} unmountOnExit>
					<Stack spacing={1.5} sx={addFormStackSx}>
						<TextField
							label="Project title"
							size="small"
							value={form.title}
							onChange={handleChange("title")}
							required
						/>

						<TextField
							label="Description"
							size="small"
							value={form.description}
							onChange={handleChange("description")}
							multiline
							minRows={2}
						/>

						<TextField label="Project URL" size="small" value={form.url} onChange={handleChange("url")} type="url" />

						<TextField label="Image URL" size="small" value={form.image} onChange={handleChange("image")} type="url" />

						<Box sx={formActionsRowSx}>
							<PrimaryButton
								size="small"
								color="inherit"
								onClick={() => {
									setForm(emptyForm);
									setOpen(false);
								}}
								sx={{ textTransform: "none" }}
							>
								Cancel
							</PrimaryButton>

							<PrimaryButton size="small" variant="contained" onClick={handleAdd} sx={{ textTransform: "none" }}>
								Add
							</PrimaryButton>
						</Box>
					</Stack>
				</Collapse>
			)}

			<Dialog open={openProjects} onClose={() => setOpenProjects(false)} maxWidth="md" fullWidth>
				<DialogTitle sx={dialogTitleSx}>
					<Box>
						<Typography variant="h6" sx={{ fontWeight: 900 }}>
							{title}
						</Typography>

						<Typography variant="body2" color="text.secondary">
							{items.length} projects
						</Typography>
					</Box>

					<IconButton onClick={() => setOpenProjects(false)}>
						<CloseRoundedIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent dividers>
					<Box sx={portfolioGridSx}>
						{items.map((item, index) => (
							<PortfolioItem key={item.id ?? index} item={item} />
						))}
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);

	if (disablePaper) return content;

	return (
		<Paper variant="outlined" sx={portfolioPaperSx}>
			{content}
		</Paper>
	);
}
