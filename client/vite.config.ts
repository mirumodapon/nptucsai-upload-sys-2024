import { resolve } from 'node:path';
import { defineConfig, UserConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };

  if (mode === 'development') {
    config.server = {
      proxy: { '/api': { target: env.VITE_BASE_URL, changeOrigin: true } }
    };
  }

  return config;
});
