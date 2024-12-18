import path from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	publicDir: "public",
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "src/components"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@views": path.resolve(__dirname, "src/views"),
			"@api": path.resolve(__dirname, "src/api"),
			"@images": path.resolve(__dirname, "src/images"),
		},
	},
});
