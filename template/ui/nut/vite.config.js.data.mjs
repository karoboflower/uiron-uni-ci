export default function getData({ oldData }) {
  const config = oldData.find((item) => item.id === 'autoComponents');
  if (config && config.extraConfig) {
    let { additionalData } = config.extraConfig.css.preprocessorOptions.scss;
    if (!additionalData.includes('nutui-uniapp/styles/variables.scss')) {
      additionalData += '@import "nutui-uniapp/styles/variables.scss";';
    }
  }
  return oldData;
}
