import { useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
	Box,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Stack,
	Typography,
} from "@mui/material";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import PrimaryTextField from "../../../../components/ui/PrimaryTextField";
import SecondaryButton from "../../../../components/ui/SecondaryButton";
import TertiaryButton from "../../../../components/ui/TertiaryButton";
import { sectionTitleSx } from "../../../../theme/layout";

import {
	addFormStackSx,
	dialogTitleSx,
	dialogTitleTextSx,
	featuredGridSx,
	featuredPortfolioButtonSx,
	formActionsRowSx,
	itemActionsSx,
	portfolioGridSx,
	portfolioHeaderSx,
	portfolioImageSx,
	portfolioItemDescSx,
	portfolioItemHeaderSx,
	portfolioItemSx,
	portfolioItemTitleSx,
	portfolioLinkButtonSx,
	portfolioPaperSx,
	toggleButtonRowSx,
	toggleButtonSx,
	viewAllButtonSx,
} from "./PortfolioCard.styles";

const PREVIEW_LIMIT = 2;

const EMPTY_FORM = {
	title: "",
	description: "",
	projectUrl: "",
	imageUrl: "",
};

function PortfolioItem({ item, editable, onEdit, onDelete }) {
	return (
		<Box sx={portfolioItemSx}>
			<Box component="img" src={item.image} alt={item.title || "Portfolio item"} sx={portfolioImageSx} />

			<Stack direction="row" spacing={1} sx={portfolioItemHeaderSx}>
				<Typography variant="subtitle2" sx={portfolioItemTitleSx}>
					{item.title || "Untitled project"}
				</Typography>

				<Box sx={itemActionsSx}>
					{item.url && (
						<IconButton
							size="small"
							component="a"
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${item.title || "portfolio item"}`}
							sx={portfolioLinkButtonSx}
						>
							<OpenInNewRoundedIcon fontSize="small" />
						</IconButton>
					)}

					{editable && (
						<>
							<IconButton size="small" aria-label={`Edit ${item.title}`} onClick={() => onEdit?.(item)}>
								<EditRoundedIcon fontSize="small" />
							</IconButton>

							<IconButton
								size="small"
								color="error"
								aria-label={`Delete ${item.title}`}
								onClick={() => onDelete?.(item)}
							>
								<DeleteOutlineRoundedIcon fontSize="small" />
							</IconButton>
						</>
					)}
				</Box>
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
	onUpdateItem,
	onRemoveItem,
	title = "Portfolio",
	disablePaper = false,
	featured = false,
}) {
	const [form, setForm] = useState(EMPTY_FORM);
	const [editingId, setEditingId] = useState(null);
	const [deleteItem, setDeleteItem] = useState(null);
	const [formOpen, setFormOpen] = useState(false);
	const [projectsOpen, setProjectsOpen] = useState(false);

	const previewItems = editable ? items : items.slice(0, featured ? 1 : PREVIEW_LIMIT);
	const hasMoreProjects = !editable && items.length > (featured ? 0 : PREVIEW_LIMIT);
	const isEditing = editingId !== null;

	const updateFormField = (field) => (event) => {
		setForm((current) => ({ ...current, [field]: event.target.value }));
	};

	const resetForm = () => {
		setForm(EMPTY_FORM);
		setEditingId(null);
		setFormOpen(false);
	};

	const handleEdit = (item) => {
		setEditingId(item.id);
		setForm({
			title: item.title ?? "",
			description: item.description ?? "",
			projectUrl: item.url ?? "",
			imageUrl: item.image ?? "",
		});
		setFormOpen(true);
	};

	const handleSubmit = () => {
		if (!form.title.trim()) return;

		const payload = {
			title: form.title.trim(),
			description: form.description.trim(),
			url: form.projectUrl.trim(),
			image: form.imageUrl.trim(),
		};

		if (isEditing) {
			onUpdateItem?.({ id: editingId, ...payload });
		} else {
			onAddItem?.(payload);
		}

		resetForm();
	};

	const handleDelete = () => {
		if (!deleteItem) return;

		onRemoveItem?.(deleteItem);
		setDeleteItem(null);
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

				{featured && items.length > 0 && (
					<SecondaryButton
						endIcon={<OpenInNewRoundedIcon />}
						onClick={() => setProjectsOpen(true)}
						sx={featuredPortfolioButtonSx}
					>
						View full portfolio
					</SecondaryButton>
				)}
			</Stack>

			{previewItems.length > 0 ? (
				<>
					<Box sx={featured ? featuredGridSx : portfolioGridSx}>
						{previewItems.map((item, index) => (
							<PortfolioItem
								key={item.id ?? index}
								item={item}
								editable={editable}
								onEdit={handleEdit}
								onDelete={setDeleteItem}
							/>
						))}
					</Box>

					{hasMoreProjects && !featured && (
						<TertiaryButton
							endIcon={<ArrowForwardRoundedIcon />}
							onClick={() => setProjectsOpen(true)}
							sx={viewAllButtonSx}
						>
							View all projects
						</TertiaryButton>
					)}
				</>
			) : (
				<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
					{editable ? "Add your first project below." : "No portfolio items yet."}
				</Typography>
			)}

			{editable && (
				<Box sx={toggleButtonRowSx}>
					<SecondaryButton
						startIcon={formOpen ? <ExpandLessRoundedIcon /> : <AddRoundedIcon />}
						onClick={() => (formOpen ? resetForm() : setFormOpen(true))}
						sx={toggleButtonSx}
					>
						{formOpen ? "Hide form" : "Add portfolio item"}
					</SecondaryButton>
				</Box>
			)}

			{editable && (
				<Collapse in={formOpen} unmountOnExit>
					<Stack spacing={1.5} sx={addFormStackSx}>
						<PrimaryTextField required label="Project title" value={form.title} onChange={updateFormField("title")} />
						<PrimaryTextField multiline minRows={2} label="Description" value={form.description} onChange={updateFormField("description")} />
						<PrimaryTextField type="url" label="Project URL" value={form.projectUrl} onChange={updateFormField("projectUrl")} />
						<PrimaryTextField type="url" label="Image URL" value={form.imageUrl} onChange={updateFormField("imageUrl")} />

						<Box sx={formActionsRowSx}>
							<SecondaryButton size="small" onClick={resetForm}>
								Cancel
							</SecondaryButton>
							<PrimaryButton size="small" onClick={handleSubmit}>
								{isEditing ? "Save changes" : "Add"}
							</PrimaryButton>
						</Box>
					</Stack>
				</Collapse>
			)}

			<Dialog open={projectsOpen} onClose={() => setProjectsOpen(false)} maxWidth="md" fullWidth>
				<DialogTitle sx={dialogTitleSx}>
					<Box>
						<Typography variant="h6" sx={dialogTitleTextSx}>
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{items.length} projects
						</Typography>
					</Box>

					<IconButton aria-label="Close portfolio" onClick={() => setProjectsOpen(false)}>
						<CloseRoundedIcon />
					</IconButton>
				</DialogTitle>

				<DialogContent dividers>
					<Box sx={portfolioGridSx}>
						{items.map((item, index) => (
							<PortfolioItem key={item.id ?? index} item={item} editable={false} />
						))}
					</Box>
				</DialogContent>
			</Dialog>

			<Dialog open={Boolean(deleteItem)} onClose={() => setDeleteItem(null)} maxWidth="xs" fullWidth>
				<DialogTitle>Delete portfolio item?</DialogTitle>
				<DialogContent>
					<Typography variant="body2" color="text.secondary">
						This will remove {deleteItem?.title || "this portfolio item"} from your profile.
					</Typography>
				</DialogContent>
				<DialogActions>
					<SecondaryButton onClick={() => setDeleteItem(null)}>Cancel</SecondaryButton>
					<Button variant="contained" color="error" onClick={handleDelete}>
						Delete
					</Button>
				</DialogActions>
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
