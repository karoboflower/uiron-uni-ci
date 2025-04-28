export default function getData({ oldData }) {
  const ViteConfig = {
    id: 'ViteConfig',
    ScriptContent: `const themeSrcMap = {
  blue: \`@import "@/styles/blue.scss";\`,
  yellow: \`@import "@/styles/yellow.scss";\`,
};
`,
  configContent: `const themeSrc = themeSrcMap[env.VITE_THEME] || themeSrcMap.yellow;`,
  extraConfig: `css: {
      preprocessorOptions: {
        scss: {
          additionalData: \`@import "@/styles/index.scss";\$\{themeSrc\}\`,
        },
      },
    },`,
  extraConfig2: `css: {
      postcss,
      preprocessorOptions: {
        scss: {
          additionalData: \`@import "@/styles/index.scss";\$\{themeSrc\}\`,
        },
      },
    },`,
  };
  const configIndex = oldData.findIndex((item) => item.id === 'ViteConfig');
  if (configIndex !== -1) {
    oldData[configIndex].configContent = (oldData[configIndex].configContent || '') + ViteConfig.configContent;
    oldData[configIndex].ScriptContent = (oldData[configIndex].ScriptContent || '') + ViteConfig.ScriptContent;
    const extraConfig = oldData[configIndex].extraConfig;
    if (extraConfig.includes('postcss')) {
      oldData[configIndex].extraConfig = ViteConfig.extraConfig2;
    }
  } else {
    oldData.push(ViteConfig);
  }
  return oldData;
}
