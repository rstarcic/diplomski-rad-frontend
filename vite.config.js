import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      "/profiles": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
      "/jobs": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
      "/applications": {
        target: "http://localhost:8001",
        changeOrigin: true,
      },
      // Sve contract operacije idu direktno contract servisu.
      "/contracts": {
        target: "http://localhost:8002",
        changeOrigin: true,
      },
      "/payments": {
        target: "http://localhost:8003",
        changeOrigin: true,
      },
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
          if (id.includes("node_modules")) {
            if (id.includes("@mui") || id.includes("@emotion")) return "mui";
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "react-vendor";
            }
            if (id.includes("axios")) return "axios";
            return "vendor";
          }
        },
      },
    },
  }

})
