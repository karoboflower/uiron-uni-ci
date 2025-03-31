export default function getData({ oldData }) {
  const enAppTemplate = {
    id: 'enmainTemplate',
    config: {
      ScriptImport: `import { I18n } from '@/local';`,
      userIntries: `app.use(I18n);`,
    },
  };
  oldData.push(enAppTemplate);
  return oldData;
}
