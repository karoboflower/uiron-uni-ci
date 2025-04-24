export default function getData({ oldData }) {
  const ViteConfig = {
    id: 'ViteConfig',
    ScriptContent: `
  const themeSrcMap = {
    blue: \`@import "@/theme/blue.scss";\`,
    yellow: \`@import "@/theme/yellow.scss";\`,
  };
`,
  configContent: `
  const themeSrc = themeSrcMap[env.VITE_THEME] || themeSrcMap.yellow;
  `,
  extraConfig: `css: {
      postcss,
      preprocessorOptions: {
        scss: {
          additionalData: themeSrc,
        },
      },
    },`,
  extraConfig2: `css: {
      preprocessorOptions: {
        scss: {
          additionalData: themeSrc,
        },
      },
    },`,
  };
  const configIndex = oldData.findIndex((item) => item.id === 'ViteConfig');
  if (configIndex !== -1) {
    oldData[configIndex].configContent += ViteConfig.configContent;
    oldData[configIndex].ScriptContent += ViteConfig.ScriptContent;
    const extraConfig = oldData[configIndex].extraConfig;
    if (extraConfig.includes('postcss')) {
      oldData[configIndex].extraConfig = ViteConfig.extraConfig;
    } else {
      oldData[configIndex].extraConfig = ViteConfig.extraConfig2;
    }
  }
  return oldData;
}
