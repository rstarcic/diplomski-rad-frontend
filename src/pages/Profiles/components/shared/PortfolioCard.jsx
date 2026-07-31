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
	DialogActions,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

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
	viewAllButtonSx,
	dialogTitleSx,
	dialogTitleTextSx,
	portfolioItemSx,
	itemActionsSx,
} from "./PortfolioCard.styles";

const PREVIEW_LIMIT = 2;

const emptyForm = {
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
							sx={portfolioLinkButtonSx}
						>
							<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
						</IconButton>
					)}

					{editable && (
						<>
							<IconButton size="small" onClick={() => onEdit?.(item)}>
								<EditRoundedIcon sx={{ fontSize: 16 }} />
							</IconButton>

							<IconButton size="small" color="error" onClick={() => onDelete?.(item)}>
								<DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
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
	const [form, setForm] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null);
	const [deleteItem, setDeleteItem] = useState(null);
	const [open, setOpen] = useState(false);
	const [openProjects, setOpenProjects] = useState(false);

	const previewItems = editable ? items : items.slice(0, featured ? 1 : PREVIEW_LIMIT);
	const hasMoreProjects = !editable && (featured ? items.length > 0 : items.length > PREVIEW_LIMIT);
	const isEditing = Boolean(editingId);

	const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

	const resetForm = () => {
		setForm(emptyForm);
		setEditingId(null);
		setOpen(false);
	};

	const handleEdit = (item) => {
		setEditingId(item.id);
		setForm({
			title: item.title ?? "",
			description: item.description ?? "",
			projectUrl: item.url ?? "",
			imageUrl: item.image ?? "",
		});
		setOpen(true);
	};

	const handleSubmitItem = () => {
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

	const handleConfirmDelete = () => {
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
					<Button
						variant="outlined"
						endIcon={<OpenInNewRoundedIcon />}
						onClick={() => setOpenProjects(true)}
						sx={{ ml: "auto", flexShrink: 0 }}
					>
						View full portfolio
					</Button>
				)}
			</Stack>

			{previewItems.length > 0 ? (
				<>
					<Box sx={featured ? { ...portfolioGridSx, gridTemplateColumns: "minmax(0, 1fr)", maxWidth: 480 } : portfolioGridSx}>
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
						onClick={() => {
							if (open) {
								resetForm();
							} else {
								setOpen(true);
							}
						}}
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

						<TextField
							label="Project URL"
							size="small"
							value={form.projectUrl}
							onChange={handleChange("projectUrl")}
							type="url"
						/>

						<TextField
							label="Image URL"
							size="small"
							value={form.imageUrl}
							onChange={handleChange("imageUrl")}
							type="url"
						/>

						<Box sx={formActionsRowSx}>
							<PrimaryButton size="small" color="inherit" onClick={resetForm} sx={{ textTransform: "none" }}>
								Cancel
							</PrimaryButton>

							<PrimaryButton size="small" variant="contained" onClick={handleSubmitItem} sx={{ textTransform: "none" }}>
								{isEditing ? "Save changes" : "Add"}
							</PrimaryButton>
						</Box>
					</Stack>
				</Collapse>
			)}

			<Dialog open={openProjects} onClose={() => setOpenProjects(false)} maxWidth="md" fullWidth>
				<DialogTitle sx={dialogTitleSx}>
					<Box>
						<Typography variant="h6" sx={dialogTitleTextSx}>
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
							<PortfolioItem
								key={item.id ?? index}
								item={item}
								editable={editable}
								onEdit={handleEdit}
								onDelete={setDeleteItem}
							/>
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
					<PrimaryButton color="inherit" onClick={() => setDeleteItem(null)}>
						Cancel
					</PrimaryButton>
					<PrimaryButton color="error" onClick={handleConfirmDelete}>
						Delete
					</PrimaryButton>
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
