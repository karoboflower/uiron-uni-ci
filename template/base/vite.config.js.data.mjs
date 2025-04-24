export default function getData({ oldData }) {
  const ViteConfig = {
    id: 'ViteConfig',
    extraConfig: `css: {
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
