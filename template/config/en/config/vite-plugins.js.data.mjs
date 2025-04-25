export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoImport',
    config: `// 自定义文件生成的位置，默认是根目录下
      dts: 'types/auto-imports.d.ts',
      imports: ["vue", "uni-app", "pinia","vue-i18n"],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: 'readonly',
      },`,
  };
  const configIndex = oldData.findIndex((item) => item.id === 'autoImport');
  if (configIndex !== -1) {
    oldData[configIndex].config = autoImportPlugin.config;
  }
  return oldData;
}
