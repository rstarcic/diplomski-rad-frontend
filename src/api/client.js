import axios from "axios";
import { refreshToken } from "./authAPI.js";

export const api = axios.create({
	baseURL: "/",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});


api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");
        const isLoginCall = originalRequest?.url?.includes("/auth/login");
        const isRegisterCall = originalRequest?.url?.includes("/auth/register");
        const isMeCall = originalRequest?.url?.includes("/auth/me");

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshCall && !isLoginCall && !isRegisterCall && !isMeCall) {
            originalRequest._retry = true;
            try {
                await refreshToken();
                return api(originalRequest);
            } catch (e) {
                window.location.href = "/error?error=session_expired";
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    },
);
