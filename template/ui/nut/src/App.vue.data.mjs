export default function getData({ oldData }) {
  const nutAppTemplate = {
    id: 'nutAppTemplate',
    config: {
      styleImport: `@import "nutui-uniapp/styles/index.scss";`,
    },
  };
  const configIndex = oldData.findIndex((item) => item.id === 'enAppTemplate');
  if (configIndex !== -1) {
    oldData[configIndex].config.ScriptImport = `import { setSystemLanguage } from '@/local';`;
    oldData[configIndex].config.ScriptonLaunch = `// 设置系统语言
  setSystemLanguage();`;
  }
  oldData.push(nutAppTemplate);
  return oldData;
}
