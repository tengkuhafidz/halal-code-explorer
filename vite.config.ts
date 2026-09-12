import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Service-Worker-Allowed': '/',
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // The SSR bundle only exists for build-time prerendering (scripts/prerender.js);
  // bundle every dependency into it so Node never has to interop CJS packages.
  ssr: {
    noExternal: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) duplicated React into a separate chunk when a custom
        // manualChunks function was used, which silently broke react-helmet-async
        // in production (every page shipped the homepage <title>/canonical).
        // Leave chunking to the bundler's defaults.
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? (assetInfo as { name?: string }).name ?? '';
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
      treeshake: {
        moduleSideEffects: 'no-external',
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        dead_code: true,
        global_defs: {
          'process.env.NODE_ENV': '"production"',
        },
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2020',
    reportCompressedSize: false,
  },
}));
