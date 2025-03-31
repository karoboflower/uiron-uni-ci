import { trueColor as rgb } from 'kolorist';
import type { ModelType } from '../type';

export default [
  {
    title: rgb(236, 112, 99)('auto-import-types'),
    value: 'autoTypes',
    description: '自动导入types文件',
  },
  {
    title: rgb(243, 156, 18)('unplugin-vue-components'),
    value: 'autoComponents',
    description: '按需自动引入组件',
  },
  {
    title: rgb(241, 196, 15)('unplugin-auto-import'),
    value: 'autoImport',
    description: '自动导入模块',
  },
] as ModelType[];
