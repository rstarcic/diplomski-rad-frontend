import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const SERVICE_URLS = {
	auth: "http://localhost:8000",
	core: "http://localhost:8001",
	contracts: "http://localhost:8002",
	payments: "http://localhost:8003",
};

const createProxy = (target) => ({
	target,
	changeOrigin: true,
});

const isPackage = (id, packageName) =>
	id.includes(`/node_modules/${packageName}/`);

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/auth": createProxy(SERVICE_URLS.auth),
			"/profiles": createProxy(SERVICE_URLS.core),
			"/jobs": createProxy(SERVICE_URLS.core),
			"/applications": createProxy(SERVICE_URLS.core),
			"/reviews": createProxy(SERVICE_URLS.core),
			"/dashboard": createProxy(SERVICE_URLS.core),
			"/contracts": createProxy(SERVICE_URLS.contracts),
			"/payments": createProxy(SERVICE_URLS.payments),
		},
	},
	preview: {
		host: "0.0.0.0",
		allowedHosts: ["frontend"],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes("node_modules")) return undefined;

					if (id.includes("/node_modules/@mui/") || id.includes("/node_modules/@emotion/")) {
						return "mui";
					}

					if (
						isPackage(id, "react") ||
						isPackage(id, "react-dom") ||
						isPackage(id, "react-router-dom")
					) {
						return "react-vendor";
					}

					if (isPackage(id, "axios")) return "axios";

					return "vendor";
				},
			},
		},
	},
});
