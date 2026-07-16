export const MAX_SIGNATURE_SIZE_BYTES = 500_000;

export function getBase64DataUrlSize(dataUrl = "") {
	const encodedData = dataUrl.split(",", 2)[1];
	if (!encodedData) return 0;

	const paddingLength = encodedData.endsWith("==") ? 2 : encodedData.endsWith("=") ? 1 : 0;
	return Math.floor((encodedData.length * 3) / 4) - paddingLength;
}

export function isSignatureTooLarge(signatureDataUrl) {
	return getBase64DataUrlSize(signatureDataUrl) > MAX_SIGNATURE_SIZE_BYTES;
}
