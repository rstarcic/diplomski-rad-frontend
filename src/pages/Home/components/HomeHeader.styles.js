export const navSx = (theme) => ({
	...theme.custom.home.header.root,
});

export const actionsSx = (theme) => ({
	...theme.custom.home.header.actions.sx,
	display: "flex",
});

export const loginButtonSx = (theme) => ({
	...theme.custom.home.header.button,
	...theme.custom.home.header.secondaryButton,
});

export const primaryButtonSx = (theme) => ({
	...theme.custom.home.header.button,
	...theme.custom.home.header.primaryButton,
});
