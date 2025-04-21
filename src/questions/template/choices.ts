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
    description: `
    基础配置: sass + husky + prettier + eslint + typescript
    eslint: true
    i18n: true
    ui: wot-design-ui
    插件：auto-import-types + unplugin-auto-import + vite-plugin-uni-components + vite-plugin-uni-pages + uni-ku/root + vite-plugin-uni-manifest
    其他配置：
    原子化插件：tailwindcss 
    主题切换： theme
    基础hooks: useRequest + useStorage + useDebounce + useThrottle + useEventListener + useTimeoutFn + useIntervalFn + useClipboard
    基础工具库utils: is, isEmpty, isEqual, isObject, isArray, isString, isNumber
    基础store: userinfo
    `,
    value: 'major',
  },
  {
    title: rgb(250, 44, 25)('小铁团队版本'),
    description: 'qt设置+dockerfile+各类环境变量',
    value: 'project',
  },
];
