import { gray } from 'kolorist';
import type { PromptObject } from 'prompts';
import PLUGINS from './plugin/choices';
import { UIList } from './UI/choices';
import { templateList } from './template/choices';
export const baseChoices = (): PromptObject<string>[] => {
  return [
    {
      name: 'needsEslint',
      type: 'toggle',
      message: '是否引入 ESLint 用于代码质量检测？',
      initial: true,
      active: '是',
      inactive: '否',
    },
    {
      name: 'needsI18n',
      type: 'toggle',
      message: '是否引入国际化？',
      initial: true,
      active: '是',
      inactive: '否',
    },
    {
      name: 'pluginList',
      type: 'multiselect',
      message: '选择需要的vite插件？',
      instructions: gray('使用↑↓选择，空格或←→选中，a全选，回车确认'),
      choices: PLUGINS,
    },
    {
      name: 'UIName',
      type: 'select',
      message: '选择需要的组件库？',
      hint: '使用↑↓选择，回车确认',
      choices: UIList,
    },
  ];
};
export const majorChoices = (): PromptObject<string>[] => {
  return [
    {
      name: 'needsTailwind',
      type: 'toggle',
      message: '是否引入 tailwindcss？',
      initial: true,
      active: '是',
      inactive: '否',
    },
    {
      name: 'needsTheme',
      type: 'toggle',
      message: '是否引入主题？',
      initial: false,
      active: '是',
      inactive: '否',
    },

  ];
};
export const projectChoices = (): PromptObject<string>[] => {
  return [
    {
      name: 'templateList',
      type: 'select',
      message: '选择需要的模板模式？',
      hint: '使用↑↓选择，回车确认',
      choices: templateList,
    },
    {
      name: 'needsI18n',
      type: 'toggle',
      message: '是否引入国际化？',
      initial: false,
      active: '是',
      inactive: '否',
    },
    {
      name: 'pluginList',
      type: 'multiselect',
      message: '选择需要的vite插件？',
      instructions: gray('使用↑↓选择，空格或←→选中，a全选，回车确认'),
      choices: PLUGINS,
    },
    {
      name: 'UIName',
      type: 'select',
      message: '选择需要的组件库？',
      hint: '使用↑↓选择，回车确认',
      choices: UIList,
    },
  ];
};
