import { useEffect, useMemo, useState } from "react";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import { Avatar, Box, ButtonBase, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import SecondaryButton from "../../../../components/ui/SecondaryButton";
import { sectionTitleSx } from "../../../../theme/layout";

import {
	avatarSx,
	centeredSectionSx,
	descriptionSx,
	dialogActionsSx,
	dialogContentSx,
	dialogPaperSx,
	enlargedImageSx,
	headerIconSx,
	headerSx,
	imagePreviewButtonSx,
	imagePreviewSx,
	sectionContentSx,
	uploadButtonSx,
} from "./ProfileImageUpload.styles";

const VisuallyHiddenInput = styled("input")({
	position: "absolute",
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0 0 0 0)",
	whiteSpace: "nowrap",
	border: 0,
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
		if (!imagePreview?.startsWith("blob:")) {
			return undefined;
		}

		return () => {
			URL.revokeObjectURL(imagePreview);
		};
	}, [imagePreview]);

	const handleImageChange = (event) => {
		const file = event.target.files?.[0];

		if (!file) return;

		onImageChange?.(file);
		event.target.value = "";
	};

	const openPreview = () => {
		setPreviewOpen(true);
	};

	const closePreview = () => {
		setPreviewOpen(false);
	};

	return (
		<Box sx={centeredSectionSx}>
			<Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={sectionContentSx}>
				<Box sx={{ flex: 1 }}>
					<Stack direction="row" spacing={1.25} sx={headerSx}>
						<Box sx={headerIconSx}>
							<PhotoRoundedIcon sx={{ fontSize: 21 }} />
						</Box>

						<Typography variant="h6" sx={sectionTitleSx}>
							Profile photo
						</Typography>
					</Stack>

					<Typography variant="body2" color="text.secondary" sx={descriptionSx}>
						A clear photo helps contractors recognize and remember you.
					</Typography>

					<SecondaryButton component="label" startIcon={<AddPhotoAlternateRoundedIcon />} sx={uploadButtonSx}>
						Upload image
						<VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
					</SecondaryButton>
				</Box>

				{imagePreview ? (
					<ButtonBase aria-label="Open profile image preview" onClick={openPreview} sx={imagePreviewButtonSx}>
						<Box
							component="img"
							src={imagePreview}
							alt="Profile preview"
							referrerPolicy="no-referrer"
							sx={imagePreviewSx}
						/>
					</ButtonBase>
				) : (
					<Avatar sx={avatarSx}>
						<PersonRoundedIcon sx={{ fontSize: 48 }} />
					</Avatar>
				)}
			</Stack>

			<Dialog
				open={previewOpen && Boolean(imagePreview)}
				onClose={closePreview}
				fullWidth
				maxWidth="md"
				slotProps={{
					paper: {
						sx: dialogPaperSx,
					},
				}}
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
					<PrimaryButton onClick={closePreview}>Close</PrimaryButton>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
