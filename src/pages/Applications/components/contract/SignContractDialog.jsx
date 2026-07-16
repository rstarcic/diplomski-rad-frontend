import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";

export default function SignContractDialog({ open, onClose, onConfirm, loading = false }) {
	const sigRef = useRef(null);

	const handleConfirm = async () => {
		if (sigRef.current?.isEmpty()) return;
		const signatureDataUrl = sigRef.current.getCanvas().toDataURL("image/png");
		await onConfirm(signatureDataUrl);
	};

	return (
		<Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
			<DialogTitle>Sign contract</DialogTitle>
			<DialogContent>
				<Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, overflow: "hidden" }}>
					<SignatureCanvas ref={sigRef} clearOnResize={false} canvasProps={{ style: { width: "100%", height: 200 } }} />
				</Box>
			</DialogContent>
			<DialogActions>
				<Button disabled={loading} onClick={() => sigRef.current?.clear()}>Clear</Button>
				<Button disabled={loading} onClick={onClose}>Cancel</Button>
				<Button disabled={loading} variant="contained" onClick={handleConfirm}>
					{loading ? "Signing..." : "Confirm signature"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
