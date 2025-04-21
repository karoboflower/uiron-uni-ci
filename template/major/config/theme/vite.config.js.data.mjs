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
  };
  const configIndex = oldData.findIndex((item) => item.id === 'ViteConfig');
  const css = `\`\${themeSrc}\``;
  if (configIndex !== -1) {
    // oldData[configIndex].ScriptImport += ViteConfig.ScriptImport;
    oldData[configIndex].configContent += ViteConfig.configContent;
    oldData[configIndex].ScriptContent += ViteConfig.ScriptContent;
    // todo
    // const { additionalData } = oldData[configIndex].extraConfig.css.preprocessorOptions.scss;
    // oldData[configIndex].extraConfig.css.preprocessorOptions.scss.additionalData = additionalData + css;
  }
  return oldData;
}
