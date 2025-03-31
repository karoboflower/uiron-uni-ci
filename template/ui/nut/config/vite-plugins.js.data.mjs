export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoComponents',
    ScriptImport: `import { NutResolver } from 'nutui-uniapp'`,
    extraResolvers: 'NutResolver',
  };
  const configIndex = oldData.findIndex((item) => item.id === 'autoComponents');
  if (configIndex !== -1) {
    oldData[configIndex].extraResolvers = (oldData[configIndex].extraResolvers || '') + autoImportPlugin.extraResolvers;
    oldData[configIndex].ScriptImport = (oldData[configIndex].ScriptImport || '') + autoImportPlugin.ScriptImport;
  }
  return oldData;
}
