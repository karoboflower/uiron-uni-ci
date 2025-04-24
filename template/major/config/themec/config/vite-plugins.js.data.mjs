export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'changeThemefiles',
    ScriptImport: `import { changeFile } from './change-file';`,
    ScriptContent: `changeFile(env.VITE_THEME, dev, system),`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
