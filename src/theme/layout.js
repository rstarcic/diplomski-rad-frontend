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
    ...sectionPaddingSx,
    ...surfaceSx,
};

export const sectionTitleSx = {
    fontWeight: 800,
};

export const detailGridSx = {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 1.25,
};

export const hoverLiftSx = {
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 16px 36px rgba(15, 23, 42, 0.12)",
    },
};

export const sectionSx = {
    p: { xs: 2, sm: 3 },
    height: "100%",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
};

export const jobCardBaseSx = {
    ...hoverLiftSx,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
};

export const appPageContentSx = {
    width: "100%",
    maxWidth: "1440px",
    mx: "auto",
    p: { xs: 2, sm: 3, lg: 4 },
    minHeight: "100vh",
};

export const authPageSx = {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.default",
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 4, md: 6 },
};

export const homePageSx = {
    width: "100%",
    minHeight: "100vh",
    mx: "auto",
    px: { xs: 0, md: 1 },
    pb: { xs: 3, md: 5 },

    color: "#111733",
    background:
        "radial-gradient(circle at 0% 0%, rgba(110, 68, 232, 0.08), transparent 26%), radial-gradient(circle at 100% 100%, rgba(23, 160, 91, 0.1), transparent 28%), #ffffff",
    overflow: "hidden",
};
