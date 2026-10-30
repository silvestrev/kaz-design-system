import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O site consome o Kaz direto do código-fonte deste repositório.
// Num projeto separado, basta `npm install @bloo/kaz` e remover estes aliases.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@bloo/kaz/styles.css', replacement: fileURLToPath(new URL('../src/styles/index.css', import.meta.url)) },
      { find: '@bloo/kaz', replacement: fileURLToPath(new URL('../src/index.ts', import.meta.url)) },
    ],
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
