import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";
import process from "process";
import { fileURLToPath } from "url";

const API_URI =
  process.env.NODE_ENV === "production"
    ? "https://npbmis-server.vercel.app/api/v1"
    : "http://localhost:3000/api/v1";

export default defineConfig({
  plugins: [react(), vercel()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // Correct alias for src
    },
  },
  define: {
    "process.env.API_URI": JSON.stringify(API_URI),
  },
});
