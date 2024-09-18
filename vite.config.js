import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), ViteMinifyPlugin({})],
	base: "",
});
