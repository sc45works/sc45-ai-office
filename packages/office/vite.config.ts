import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths, so the built `dist/` folder works from any sub-path.
  base: './',
  build: {
    target: 'es2022',
    // Three.js is one large dependency; the default 500 kB warning is just noise here.
    chunkSizeWarningLimit: 900,
  },
});
