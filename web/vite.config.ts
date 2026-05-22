import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

// HMR is served through nginx on app.localhost:80, so the client must
// connect its WebSocket to that host/port (not the container's 5173).
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: { usePolling: true },
    hmr: {
      host: 'app.localhost',
      clientPort: 80,
      protocol: 'ws',
    },
  },
});
