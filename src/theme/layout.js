export const sectionPaddingSx = {
    p: { xs: 2, sm: 3 },
};

export const surfaceSx = {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "background.paper",
};

export const surfaceSectionSx = {
    ...surfaceSx,
    ...sectionPaddingSx,
};

export const fullHeightSectionSx = {
    ...surfaceSectionSx,
    height: "100%",
};

export const sectionTitleSx = {
    fontWeight: 800,
    lineHeight: 1.3,
};

export const detailGridSx = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 1.25,
};

export const hoverLiftSx = {
    transition: "transform 200ms ease, box-shadow 200ms ease",

    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 16px 36px rgba(15, 23, 42, 0.12)",
    },
};

export const jobCardBaseSx = {
    ...surfaceSx,
    ...hoverLiftSx,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
};

export const appPageContentSx = {
    width: "100%",
    maxWidth: 1440,
    minHeight: "100vh",
    mx: "auto",
    p: { xs: 2, sm: 3, lg: 4 },
};

export const authPageSx = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 4, md: 6 },
    bgcolor: "background.default",
};

export const homePageSx = {
    width: "100%",
    minHeight: "100vh",
    mx: "auto",
    px: { xs: 0, md: 1 },
    pb: { xs: 3, md: 5 },
    color: "text.primary",
    background:
        "radial-gradient(circle at 0% 0%, rgba(110, 68, 232, 0.08), transparent 26%), radial-gradient(circle at 100% 100%, rgba(23, 160, 91, 0.1), transparent 28%), #ffffff",
    overflow: "hidden",
};