import type { PromptObject } from 'prompts';
import { templateList } from './template/choices';

export default (): PromptObject<string>[] => {
  return [
    {
      name: 'templateType',
      type: 'select',
      message: '选择需要的模板模式？',
      hint: '使用↑↓选择，回车确认',
      choices: templateList,
    },
  ];
};
