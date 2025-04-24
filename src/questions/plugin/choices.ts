import { trueColor as rgb } from 'kolorist';
import type { ModelType } from '../type';

export default [
  {
    title: rgb(236, 112, 99)('auto-import-types'),
    value: 'autoTypes',
    description: '自动导入types文件',
  },
  {
    title: rgb(241, 196, 15)('unplugin-auto-import'),
    value: 'autoImport',
    description: '自动导入模块',
  },
  {
    title: rgb(243, 156, 18)('vite-plugin-uni-components'),
    value: 'autoComponents',
    description: '按需自动引入组件',
  },
  {
    title: rgb(243, 156, 18)('vite-plugin-uni-pages'),
    value: 'page',
    description: '提供基于文件系统的路由',
  },
  {
    title: rgb(241, 196, 15)('vite-plugin-uni-layouts'),
    value: 'layouts',
    description: '提供类 nuxt 的 layouts 系统',
  },
  {
    title: rgb(46, 204, 113)('vite-plugin-uni-manifest'),
    value: 'manifest',
    description: '自动生成 manifest.json 文件',
  },
] as ModelType[];
