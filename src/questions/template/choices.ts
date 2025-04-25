import { green, trueColor as rgb } from 'kolorist';
import type { ModelType } from '../type';

export const templateList: ModelType[] = [
  {
    title: green('基础模板'),
    description: 'eslint + plugin + i18n + ui',
    value: 'base',
  },
  {
    title: green('加强版本'),
    description: `集成了以下功能:
    1. 自动导入types文件
    2. 自动导入模块（vue,pinia,i18n）
    3. 自动导入全局组件
    4. 提供基于文件系统的路由
    5. 自动生成manifest.json文件
    6. 提供类nuxt的layouts系统
    7. i18n多语言
    8. eslint + prettier风格统一
    9. 基础hooks+工具库utils+store
    10.可供选择的原子化css
    11.可供选择的主题引入形式
    `,
    value: 'major',
  },
  {
    title: rgb(250, 44, 25)('小铁团队版本'),
    description: 'qt设置+dockerfile+各类环境变量',
    value: 'project',
  },
];
