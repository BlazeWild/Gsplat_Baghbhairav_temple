import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true, // Allows the server to be accessible from your local network
    port: 5174, // Optional: Specify the port if you want to ensure it's consistent
  },
});
