import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [react(), tsconfigPaths(), eslint()]
});
