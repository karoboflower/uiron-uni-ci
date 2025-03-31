export default function getData({ oldData }) {
  const nutAppTemplate = {
    id: 'nutAppTemplate',
    config: {
      styleImport: `@import "nutui-uniapp/styles/index.scss";`,
    },
  };
  oldData.push(nutAppTemplate);
  return oldData;
}
