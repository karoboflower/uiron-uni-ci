export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'manifest',
    ScriptImport: `import UniManifest from '@uni-helper/vite-plugin-uni-manifest';`,
    ScriptContent: `UniManifest(),`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
