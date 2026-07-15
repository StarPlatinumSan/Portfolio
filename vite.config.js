import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	preview: {
		allowedHosts: ["portfolio-production-a8b4.up.railway.app"],
	},
});
