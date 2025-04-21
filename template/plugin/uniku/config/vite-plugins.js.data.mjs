export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'uniku',
    ScriptImport: `import UniKuRoot from '@uni-ku/root';`,
    ScriptContent: `//@see https://github.com/uni-ku/root
      UniKuRoot(),`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
