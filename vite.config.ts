import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The dev server is reached through the builder's preview proxy
// (<id>.preview.ninoo.app over TLS), so HMR must dial the proxy's port, not
// 5173. The image sets HMR_CLIENT_PORT=443; locally it falls back to 5173.
const hmrClientPort = Number(process.env.HMR_CLIENT_PORT ?? 5173);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    hmr: { clientPort: hmrClientPort },
  },
  preview: { host: true, port: 5173 },
});
