export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'changeThemefiles',
    ScriptImport: `import fs from 'fs';\nimport path from 'path';`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
