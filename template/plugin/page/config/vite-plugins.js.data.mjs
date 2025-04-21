export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'page',
    ScriptImport: `import UniPages from '@uni-helper/vite-plugin-uni-pages';`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
