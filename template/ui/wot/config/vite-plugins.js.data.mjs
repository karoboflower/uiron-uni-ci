export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoComponents',
    ScriptImport: `import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';`,
    config: `      resolvers: [WotResolver()],`,
  };
  const configIndex = oldData.findIndex((item) => item.id === 'autoComponents');
  const enAppTemplateIndex = oldData.findIndex((item) => item.id === 'enAppTemplate');
  const layoutsIndex = oldData.findIndex((item) => item.id === 'layouts');
  // 如果存在layouts 多语言模式下不设置tabbars
  if (enAppTemplateIndex !== -1 && layoutsIndex !== -1) {
    oldData[enAppTemplateIndex].config.ScriptImport = `import { setSystemLanguage } from '@/local';`;
    oldData[enAppTemplateIndex].config.ScriptonLaunch = `// 设置系统语言
  setSystemLanguage();`;
  }
  if (configIndex !== -1) {
    oldData[configIndex].config = (oldData[configIndex].config || '') + '\n' + autoImportPlugin.config;
    oldData[configIndex].ScriptImport = (oldData[configIndex].ScriptImport || '') + '\n' + autoImportPlugin.ScriptImport;
  }
  return oldData;
}
