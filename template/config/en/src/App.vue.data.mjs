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
  oldData.push(enAppTemplate);
  return oldData;
}
