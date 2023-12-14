import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "https://fkhamroev.github.io/todo-list",
  plugins: [react()],
});
