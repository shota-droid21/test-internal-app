import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "../backend/static",
        emptyOutDir: true,
        sourcemap: true,
        minify: false
    },
    server: {
        host: "0.0.0.0", // Dockerコンテナからアクセスするためには必須
        port: 6050,
        strictPort: true, // ポートが使用中の場合にエラーを発生させます
        proxy: {
            "/ask": "http://localhost:6050,",
            "/chat": "http://localhost:6050,",
            "/history": "http://localhost:6050,"
        }
    }
});
