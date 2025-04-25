import { loadEnv } from 'vite';
import uni from "@dcloudio/vite-plugin-uni";
import path from 'node:path';
import process from 'node:process';
import { createProxy } from './config/proxy';
  
import { configUnplugin } from './config/vite-plugins';
export default ({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'));
  const port = Number(env.VITE_PORT) || 3000;
  const VITE_PROXY = env.VITE_PROXY ? JSON.parse(env.VITE_PROXY) : [];
  return {
    envDir: './env', // 自定义env目录
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: '/',
    server: {
      host: true, //'0.0.0.0'
      port,
      open: true, //自动打开
      base: './ ', //生产环境路径
      proxy: createProxy(VITE_PROXY),
    },
    plugins: [configUnplugin(), uni()],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "@/styles/index.scss";',
          },
        },
      },
  };
};
