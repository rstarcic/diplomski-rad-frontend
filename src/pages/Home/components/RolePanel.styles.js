const getRolePanel = (theme) => theme.custom.home.rolePanel;

const getTone = (theme, variant) =>
    getRolePanel(theme).tones[variant];

export const getRoleTone = (theme, variant) =>
    getTone(theme, variant);

export const panelSx = (variant) => (theme) => {
    const rolePanel = getRolePanel(theme);
    const tone = getTone(theme, variant);

    return {
        ...rolePanel.root,
        background: tone.background,
    };
};

export const contentSx = (theme) =>
    getRolePanel(theme).content.sx;

export const eyebrowSx = (variant) => (theme) => {
    const rolePanel = getRolePanel(theme);
    const tone = getTone(theme, variant);

    return {
        ...rolePanel.eyebrow,
        color: tone.accentDark,
        bgcolor: tone.soft,
    };
};

export const titleSx = (theme) =>
    getRolePanel(theme).title;

export const accentTextSx = (variant) => (theme) => ({
    color: getTone(theme, variant).accent,
});

export const bodySx = (theme) =>
    getRolePanel(theme).body;

export const stepsContentSx = (theme) => {
    const rolePanel = getRolePanel(theme);

    return {
        ...rolePanel.content.sx,
        gap: rolePanel.steps.spacing,
    };
};

export const stepsListSx = (theme) => ({
    gap: getRolePanel(theme).steps.spacing,
});

export const subtitleSx = (theme) =>
    getRolePanel(theme).subtitle;

export const signupButtonSx = (variant) => (theme) => {
    const rolePanel = getRolePanel(theme);
    const tone = getTone(theme, variant);

    return {
        ...rolePanel.button,
        bgcolor: tone.accent,
        boxShadow: tone.buttonShadow,
        "&:hover": {
            bgcolor: tone.accentDark,
        },
    };
};

export const illustrationWrapSx = (theme) =>
    getRolePanel(theme).illustrationWrap;

export const illustrationSx = (theme) =>
    getRolePanel(theme).illustration;