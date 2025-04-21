export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoTypes',
    ScriptImport: `import AutoImportTypes from 'auto-import-types';`,
    config: `dtsDir: 'types',
    filepath: '.eslintrc-auto-import-types.json',
    globalsPropValue: true,`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
