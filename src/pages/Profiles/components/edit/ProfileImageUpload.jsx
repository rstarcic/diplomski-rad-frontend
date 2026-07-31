import { useEffect, useMemo, useState } from "react";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Avatar, Box, Dialog, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { sectionTitleSx } from "../../../../theme/layout";
import {
	avatarSx,
	centeredSectionSx,
	dialogActionsSx,
	dialogContentSx,
	dialogPaperSx,
	enlargedImageSx,
	imagePreviewSx,
} from "./ProfileImageUpload.styles";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function ProfileImageUpload({ image, onImageChange }) {
	const [previewOpen, setPreviewOpen] = useState(false);

	const imagePreview = useMemo(() => {
		if (image instanceof File || image instanceof Blob) {
			return URL.createObjectURL(image);
		}

		if (typeof image === "string") {
			return image.trim() || null;
		}

		return null;
	}, [image]);

	useEffect(() => {
		if (!imagePreview?.startsWith("blob:")) return undefined;

		return () => URL.revokeObjectURL(imagePreview);
	}, [imagePreview]);

	const handleImageChange = (event) => {
		const file = event.target.files?.[0];

		if (!file) return;

		onImageChange?.(file);
		event.target.value = "";
	};

	return (
		<Box sx={centeredSectionSx}>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ alignItems: "center", justifyContent: "space-between" }}>
				<Box sx={{ textAlign: "left", flex: 1 }}>
					<Stack direction="row" spacing={1.25} sx={{ alignItems: "center", mb: 0.5 }}>
						<Box sx={{ width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center", bgcolor: "rgba(91,63,214,.1)", color: "primary.main", flexShrink: 0 }}>
							<PhotoRoundedIcon sx={{ fontSize: 21 }} />
						</Box>
						<Typography variant="h6" sx={sectionTitleSx}>Profile photo</Typography>
					</Stack>

					<Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 250 }}>
						A clear photo helps contractors recognize and remember you.
					</Typography>

					<PrimaryButton component="label" variant="outlined" startIcon={<AddPhotoAlternateRoundedIcon />} sx={{ borderStyle: "dashed", minHeight: 56 }}>
						Upload image
						<VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
					</PrimaryButton>
				</Box>

				{imagePreview ? (
					<Box component="img" src={imagePreview} alt="Profile preview" referrerPolicy="no-referrer" sx={imagePreviewSx} onClick={() => setPreviewOpen(true)} />
				) : (
					<Avatar sx={avatarSx}><PersonRoundedIcon sx={{ fontSize: 48 }} /></Avatar>
				)}
			</Stack>
			<Dialog
				open={previewOpen}
				onClose={() => setPreviewOpen(false)}
				fullWidth
				maxWidth="md"
				PaperProps={{ sx: dialogPaperSx }}
			>
				<DialogContent sx={dialogContentSx}>
					<Box
						component="img"
						src={imagePreview}
						alt="Profile preview enlarged"
						referrerPolicy="no-referrer"
						sx={enlargedImageSx}
					/>
				</DialogContent>

				<DialogActions sx={dialogActionsSx}>
					<PrimaryButton onClick={() => setPreviewOpen(false)}>Close</PrimaryButton>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
