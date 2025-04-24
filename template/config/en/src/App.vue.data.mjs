export default function getData({ oldData }) {
  const enAppTemplate = {
    id: 'enAppTemplate',
    config: {
      ScriptImport: `import { setSystemLanguage, setTabBarLanguage } from '@/local';`,
      ScriptonLaunch: `// 设置系统语言
  setSystemLanguage();
  // 设置tabar语言
  setTabBarLanguage();`,
    },
  };
  const layouts = oldData.findIndex((item) => item.id === 'layouts');
  if (layouts !== -1) {
    enAppTemplate.config.ScriptImport = `import { setSystemLanguage } from '@/local';`;
    enAppTemplate.config.ScriptonLaunch = `// 设置系统语言
  setSystemLanguage();`;
  }
  oldData.push(enAppTemplate);
  return oldData;
}
