export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoComponents',
    ScriptImport: `import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers';`,
    config: `        resolvers: [WotResolver()],`,
  };
  const configIndex = oldData.findIndex((item) => item.id === 'autoComponents');
  if (configIndex !== -1) {
    oldData[configIndex].config = (oldData[configIndex].config || '') + '\n' + autoImportPlugin.config;
    oldData[configIndex].ScriptImport = (oldData[configIndex].ScriptImport || '') + '\n' + autoImportPlugin.ScriptImport;
  }
  return oldData;
}
