import { useEffect, useMemo, useState } from "react";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Avatar, Box, Dialog, Typography } from "@mui/material";
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
			{imagePreview ? (
				<Box
					component="img"
					src={imagePreview}
					alt="Profile preview"
					referrerPolicy="no-referrer"
					sx={imagePreviewSx}
					onClick={() => setPreviewOpen(true)}
				/>
			) : (
				<Avatar sx={avatarSx}>
					<PersonRoundedIcon sx={{ fontSize: 48 }} />
				</Avatar>
			)}

			<Typography variant="h6" sx={sectionTitleSx}>
				Profile photo
			</Typography>

			<Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
				Add a clear image so contractors can recognize your profile.
			</Typography>

			<PrimaryButton component="label" variant="outlined" startIcon={<AddPhotoAlternateRoundedIcon />}>
				Upload image
				<VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
			</PrimaryButton>
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
