import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  server: {
    proxy: {
      // Using the proxy instance
      "/api": {
        target: "http://armin-linx",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },

      "/omdb": {
        target: "http://www.omdbapi.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/omdb/, ""),
      },
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      "/socket.io": {
        target: "ws://localhost:5174",
        ws: true,
      },
    },
  },
  plugins: [vue(), vueJsx(), VueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  module: {
    transpileDependencies: ["portal-vue"],
  },
});
