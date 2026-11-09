import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => ({
    plugins: [react()],
    // Saat build production untuk GitHub Pages gunakan '/My-Portfolio/', saat dev lokal gunakan '/'
    base: command === 'build' ? '/My-Portfolio/' : '/',
    build: {
        outDir: 'docs', // Menyusun hasil build statis ke folder docs agar bisa dideploy di GitHub Pages
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
}));
