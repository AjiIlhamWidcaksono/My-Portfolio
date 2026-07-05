import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    base: '/My-Portfolio/', // Sesuai dengan sub-url repositori GitHub Pages Anda
    build: {
        outDir: 'docs', // Menyusun hasil build statis ke folder docs agar bisa dideploy di GitHub Pages
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'), // Menjaga alias '@' tetap aktif mengarah ke folder resources/js
        },
    },
});
