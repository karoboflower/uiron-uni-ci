export default function getData({ oldData }) {
  const enAppTemplate = {
    id: 'enmainTemplate',
    config: {
      ScriptImport: `import store from '@/store/setup';`,
      userIntries: `app.use(store);`,
    },
  };
  oldData.push(enAppTemplate);
  return oldData;
}
