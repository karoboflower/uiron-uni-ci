export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'layouts',
    ScriptImport: `import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';`,
    ScriptContent: `// https://github.com/uni-helper/vite-plugin-uni-layouts
      // 依赖于 @uni-helper/vite-plugin-uni-pages
      UniLayouts(),`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
