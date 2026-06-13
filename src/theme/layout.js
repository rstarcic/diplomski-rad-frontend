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

export const rowDetailSx = {
    display: "grid",
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
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

export const pageSx = {
    width: "100%",
    maxWidth: "1440px",
    mx: "auto",
    px: { xs: 0, md: 1 },
    pb: { xs: 3, md: 5 },
};

export default pageSx;
