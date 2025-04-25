export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'unocss',
    ScriptImport: `import UnoCSS from 'unocss/vite';`,
    ScriptContent: ` UnoCSS(),`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
