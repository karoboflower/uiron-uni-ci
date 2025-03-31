export default function getData({ oldData }) {
  const config = oldData.find((item) => item.id === 'ViteConfig');
  if (config && config.extraConfig) {
    const { additionalData } = config.extraConfig.css.preprocessorOptions.scss;
    if (!additionalData.includes('nutui-uniapp/styles/variables.scss')) {
      additionalData += '@import "nutui-uniapp/styles/variables.scss";';
    }
  }
  return oldData;
}
