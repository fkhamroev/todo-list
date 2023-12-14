import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/fkhamroev/todo-list/",
  plugins: [react()],
});
