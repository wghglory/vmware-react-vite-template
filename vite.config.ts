import react from '@vitejs/plugin-react';
import {resolve} from 'path'; // Need to install @types/node"
import {visualizer} from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        // icon: false,
        // typescript: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
    visualizer({
      // filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './',
  preview: {
    port: 4000,
  },
  server: {
    port: 4000,
    open: true,
    cors: true,
    proxy: {
      // common usage
      '/api/v1': {
        target: 'http://localhost:4000', // mock
        changeOrigin: true,
        secure: false, // [vite] http proxy error: Error: self signed certificate in certificate chain
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // regex
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fallback/, ''),
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      output: {
        // manualChunks: {'react-flow-renderer': ['react-flow-renderer']},
      },
    },
  },
});
