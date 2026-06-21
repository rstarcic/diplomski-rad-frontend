import { useEffect, useMemo } from "react";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { sectionTitleSx, surfaceSectionSx } from "../../../../theme/layout";

const avatarSx = {
	width: 98,
	height: 98,
	mx: "auto",
	mb: 2,
	bgcolor: "primary.light",
	color: "primary.contrastText",
};

const centeredSectionSx = {
	...surfaceSectionSx,
	textAlign: "center",
};

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
	const previewUrl = useMemo(() => {
		if (!image) return "";

		return URL.createObjectURL(image);
	}, [image]);

	useEffect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const handleImageChange = (event) => {
		const file = event.target.files?.[0];

		if (!file) return;

		onImageChange?.(file);
	};

	return (
		<Box sx={centeredSectionSx}>
			<Avatar src={previewUrl} sx={avatarSx}>
				<PersonRoundedIcon sx={{ fontSize: 48 }} />
			</Avatar>

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
		</Box>
	);
}
