export const cardSx = {
    p: { xs: 2, sm: 3 },
    borderRadius: { xs: 3, sm: 4 },
    color: "primary.contrastText",
    background:
        "linear-gradient(135deg, #6C4DF6 0%, #8E6CFF 55%, #B18CFF 100%)",
    boxShadow: {
        xs: "0 12px 28px rgba(108, 77, 246, 0.22)",
        sm: "0 18px 45px rgba(108, 77, 246, 0.28)",
    },
};

export const progressSx = {
    height: { xs: 8, sm: 10 },
    borderRadius: 999,
    bgcolor: "rgba(255,255,255,0.24)",
    "& .MuiLinearProgress-bar": {
        borderRadius: 999,
        bgcolor: "#fff",
    },
};

export const percentageSx = {
    fontSize: { xs: "2.25rem", sm: "3.75rem" },
    fontWeight: 950,
    lineHeight: 0.95,
    mt: 0.5,
};

export const mutedTextSx = {
    color: "rgba(255,255,255,0.84)",
    fontWeight: 600,
};
