import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

// This config builds the self-contained embeddable widget bundle.
// Run: npm run build:widget
// Output: dist/widget/teddy-widget.iife.js  (single file, CSS injected)
//
// After deploying to Vercel, set VITE_API_URL to your Vercel URL:
// VITE_API_URL=https://your-app.vercel.app npm run build:widget

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJs(), // inlines CSS into the JS bundle — single file embed
  ],
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: 'src/widget.jsx',
      name: 'TeddyWidget',
      fileName: 'teddy-widget',
      formats: ['iife'],
    },
    outDir: 'dist/widget',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
