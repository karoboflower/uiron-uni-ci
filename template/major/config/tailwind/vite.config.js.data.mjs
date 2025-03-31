export default function getData({ oldData }) {
  const ViteConfig = {
    id: 'ViteConfig',
    ScriptImport: `import postcss from './postcss.config';`,
    extraConfig: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "@/styles/index.scss";',
          },
        },
      },
    },
    configContent: '',
  };
  const config = oldData.find((item) => item.id === 'ViteConfig');
  if (config && config.extraConfig) {
    let { additionalData } = config.extraConfig.css;
    if (additionalData) {
      // additionalData = { postcss, ...additionalData };
    }
  }
  return oldData;
}
