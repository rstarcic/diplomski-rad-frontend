import { useState } from "react";

export const useFormErrors = () => {
    const [errors, setErrors] = useState({});

    const setFieldError = (field, message) => {
        setErrors((prev) => ({
            ...prev,
            [field]: message,
        }));
    };

    const clearFieldError = (field) => {
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const clearErrors = () => {
        setErrors({});
    };

    return {
        errors,
        setErrors,
        setFieldError,
        clearFieldError,
        clearErrors,
    };
};
