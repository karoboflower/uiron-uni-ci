export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoComponents',
    ScriptImport: `import Components from 'unplugin-vue-components/vite';`,
    config: `
      dirs: ['src/components'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'types/components.d.ts',
    `,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
