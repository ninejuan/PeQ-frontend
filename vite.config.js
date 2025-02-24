import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 4173,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  server: {
    cors: {
      origin: ["https://peq.us", "https://api.peq.us"],
      methods: ["POST", "GET", "PATCH", "PUT", "OPTIONS", "DELETE"],
      allowedHeaders: ["*"],
    },
    allowedHosts: ["https://peq.us", "https://api.peq.us"],
  },
});
