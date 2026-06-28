import { api } from "./client.js";

export async function getMyProfile() {
	const { data } = await api.get("/profile/me");
	return data;
}
