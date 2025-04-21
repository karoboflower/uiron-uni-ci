export default function getData({ oldData }) {
  const ViteConfig = {
    id: 'ViteConfig',
    ScriptImport: `import postcss from './postcss.config';`,
    // todo
    extraConfig: {
      css: {
        postcss: `${postcss}`,
        preprocessorOptions: {

        },
      },
    },
    configContent: '',
  };
  const configIndex = oldData.findIndex((item) => item.id === 'ViteConfig');
  if (configIndex !== -1) {
    oldData[configIndex].ScriptImport = (oldData[configIndex].ScriptImport || '') + ViteConfig.ScriptImport;
    if (oldData[configIndex].extraConfig.css) {
      const { css } = oldData[configIndex].extraConfig;
      oldData[configIndex].extraConfig.css = { ...css, ...ViteConfig.extraConfig.css };
    }
  }

  return oldData;
}
