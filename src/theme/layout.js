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

export const pageSx = {
    width: "100%",
    maxWidth: "1440px",
    mx: "auto",
    px: { xs: 0, md: 1 },
    pb: { xs: 3, md: 5 },
};

export default pageSx;
