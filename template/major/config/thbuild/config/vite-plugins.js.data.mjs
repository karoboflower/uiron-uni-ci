export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'changeThemefiles',
    ScriptImport: `import { changeFile } from './change-file';
  import process from 'node:process';
  const dev = process.env.NODE_ENV;
  const platform = process.env.UNI_PLATFORM;`,
    ScriptContent: `changeFile(env.VITE_THEME, platform, platform),`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
