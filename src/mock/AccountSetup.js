export const accountSetupMock = {
	client: {
		userId: "user-1",
		role: "client",
		profileCompleted: true,
		paymentCompleted: true,
	},
	contractor: {
		userId: "contractor-1",
		role: "contractor",
		profileCompleted: false,
		payoutCompleted: true,
	},
};

export const getAccountSetupMock = (role) => accountSetupMock[role];
