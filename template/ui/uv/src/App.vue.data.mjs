export default function getData({ oldData }) {
  const nvAppTemplate = {
    id: 'nvAppTemplate',
    config: {
      styleImport: `@import '@climblee/uv-ui/index.scss';`,
    },
  };
  oldData.push(nvAppTemplate);
  const configIndex = oldData.findIndex((item) => item.id === 'enAppTemplate');
  if (configIndex !== -1) {
    oldData[configIndex].config.ScriptImport = `import { setSystemLanguage } from '@/local';`;
    oldData[configIndex].config.ScriptonLaunch = `// 设置系统语言
  setSystemLanguage();`;
  }
  return oldData;
}
