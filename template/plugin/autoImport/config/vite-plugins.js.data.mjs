export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoImport',
    ScriptImport: `import AutoImport from 'unplugin-auto-import/vite';`,
    config: `
       // 自定义文件生成的位置，默认是根目录下
       dts: 'types/auto-imports.d.ts',
       imports: ['vue', 'uni-app', 'pinia'],
       eslintrc: {
         enabled: true,
         filepath: './.eslintrc-auto-import.json',
         globalsPropValue: 'readonly',
       }
    `,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
