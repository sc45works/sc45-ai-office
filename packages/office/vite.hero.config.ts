import { defineConfig } from 'vite';

/**
 * Builds hero mode (src/hero.ts) as a module to drop into another site.
 *
 *   --mode shared      three.js is left as an import, for a site that already has it
 *   --mode standalone  three.js is built in
 */
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone';
  return {
  build: {
    target: 'es2022',
    outDir: 'dist-hero',
    emptyOutDir: false,
    chunkSizeWarningLimit: 1200,
    lib: { entry: 'src/hero.ts', formats: ['es'], fileName: () => (standalone ? 'office-hero.standalone.js' : 'office-hero.js') },
    rollupOptions: { external: standalone ? [] : [/^three($|\/)/] },
  },
  };
});
