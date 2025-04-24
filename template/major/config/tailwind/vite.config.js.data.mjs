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
  const configIndex = oldData.findIndex((item) => item.id === 'ViteConfig');
  if (configIndex !== -1) {
    oldData[configIndex].ScriptImport = (oldData[configIndex].ScriptImport || '') + ViteConfig.ScriptImport;
    oldData[configIndex].extraConfig = ViteConfig.extraConfig;
  }

  return oldData;
}
