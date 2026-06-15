import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";

export default function SignContractDialog({ open, onClose, onConfirm }) {
	const sigRef = useRef(null);

	const handleConfirm = () => {
		if (sigRef.current?.isEmpty()) return;
		const signatureDataUrl = sigRef.current.getCanvas().toDataURL("image/png");
		onConfirm(signatureDataUrl);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Sign contract</DialogTitle>
			<DialogContent>
				<Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
					<SignatureCanvas ref={sigRef} clearOnResize={false} canvasProps={{ style: { width: "100%", height: 200 } }} />
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => sigRef.current?.clear()}>Clear</Button>
				<Button onClick={onClose}>Cancel</Button>
				<Button variant="contained" onClick={handleConfirm}>
					Confirm signature
				</Button>
			</DialogActions>
		</Dialog>
	);
}
