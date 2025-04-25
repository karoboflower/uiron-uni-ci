import { gray, trueColor as rgb } from "kolorist";
import type { PromptObject } from "prompts";
import PLUGINS from "./plugin/choices";
import { UIList } from "./UI/choices";
import { templateList } from "./template/choices";
export const baseChoices = (): PromptObject<string>[] => {
  return [
    {
      name: "needsEslint",
      type: "toggle",
      message: "是否引入 ESLint 用于代码质量检测？",
      initial: true,
      active: "是",
      inactive: "否",
    },
    {
      name: "needsI18n",
      type: "toggle",
      message: "是否引入国际化？",
      initial: true,
      active: "是",
      inactive: "否",
    },
    {
      name: "pluginList",
      type: "multiselect",
      message: "选择需要的vite插件？",
      instructions: gray("使用↑↓选择，空格或←→选中，a全选，回车确认"),
      choices: PLUGINS,
    },
    {
      name: "UIName",
      type: "select",
      message: "选择需要的组件库？",
      hint: "使用↑↓选择，回车确认",
      choices: UIList,
    },
  ];
};
export const majorChoices = (): PromptObject<string>[] => {
  return [
    {
      name: "atomicCss",
      type: "select",
      message: "原子化css？",
      hint: "使用↑↓选择，回车确认",
      choices: [
        {
          title: rgb(243, 156, 18)("tailwind"),
          value: "tailwind",
          description: "",
        },
        {
          title: rgb(236, 112, 99)("unocss"),
          value: "unocss",
          description: "",
        },
      ],
    },
    {
      name: "themes",
      type: "select",
      message: "选择需要的主题模式",
      hint: "使用↑↓选择，回车确认",
      choices: [
        {
          title: rgb(243, 156, 18)("不需要主题切换"),
          value: "null",
          description: "不需要主题切换",
        },
        {
          title: rgb(236, 112, 99)("自动切换主题"),
          value: "themec",
          description: "将主题全部打包在一起，自动切换",
        },
        {
          title: rgb(241, 196, 15)("主题打包"),
          value: "theme",
          description: "在打包的时候将主题打包进去",
        },
      ],
    },
  ];
};
export const projectChoices = (): PromptObject<string>[] => {
  return [];
};
