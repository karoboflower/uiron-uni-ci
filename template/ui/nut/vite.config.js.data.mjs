export default function getData({ oldData }) {
  const ViteConfig = {
    id: "ViteConfig",
    extraConfig: `css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/index.scss";@import "nutui-uniapp/styles/variables.scss";',
        },
      },
    },`,
  };
  const configIndex = oldData.findIndex((item) => item.id === "ViteConfig");
  if (configIndex !== -1 && oldData[configIndex]?.extraConfig) {
    oldData[configIndex].extraConfig = ViteConfig.extraConfig;
  } else {
    oldData.push(ViteConfig);
  }
  return oldData;
}
