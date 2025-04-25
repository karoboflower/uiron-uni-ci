export default function getData({ oldData }) {
  const ViteConfig = {
    id: 'ViteConfig',
    ScriptImport: `import postcss from './postcss.config';`,
    extraConfig: `css: {
        postcss,
        preprocessorOptions: {
          scss: {
            additionalData: '@import "@/styles/index.scss";',
          },
        },
      },`,
    configContent: '',
  };
  oldData.push(ViteConfig);
  return oldData;
}
