import path from "path"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {nodePolyfills} from "vite-plugin-node-polyfills";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({mode}) => ({
        base: mode === 'production' ? '/portfolio/' : '/',
        plugins: [
            react(),
            nodePolyfills(),
            tailwindcss()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    })
)