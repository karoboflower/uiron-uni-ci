export default function getData({ oldData }) {
  const autoImportPlugin = {
    id: 'autoComponents',
    ScriptImport: `import Components from '@uni-helper/vite-plugin-uni-components';`,
    config: `dirs: ['src/components'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'types/components.d.ts',`,
  };
  oldData.push(autoImportPlugin);
  return oldData;
}
