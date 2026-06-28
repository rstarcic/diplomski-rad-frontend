import { api } from "./client.js";

export async function loginApi(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
}

export async function registerApi(role, credentials) {
    const { data } = await api.post(`/auth/register/${role}`, credentials);
    return data;
}

export async function refreshToken() {
    const { data } = await api.post("/auth/refresh");
    return data;
}

export async function logoutApi() {
    await api.post("/auth/logout");
}

export async function meApi() {
    const { data } = await api.get("/auth/me");
    return data;
}

export function startGoogleLogin() {
    window.location.href = "/auth/google/login/start";
}

export function startGoogleRegister(role) {
    window.location.href = `/auth/google/register/start?role=${role}`;
}

export async function forgotPasswordApi(email) {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
}

export async function resetPasswordApi(token, newPassword) {
    const { data } = await api.post("/auth/reset-password", { token, new_password: newPassword });
    return data;
}
