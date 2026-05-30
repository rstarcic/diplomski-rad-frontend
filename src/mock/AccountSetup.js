export const accountSetupMock = {
	client: {
		userId: "user-1",
		role: "client",
		profileCompleted: true,
		paymentCompleted: false,
	},
	contractor: {
		userId: "contractor-1",
		role: "contractor",
		profileCompleted: false,
		payoutCompleted: true,
	},
};

export const getAccountSetupMock = (role) => accountSetupMock[role];
