export default function getData({ oldData }) {
  const nvAppTemplate = {
    id: 'nvAppTemplate',
    config: {
      styleImport: `@import '@climblee/uv-ui/index.scss';`,
    },
  };
  oldData.push(nvAppTemplate);
  return oldData;
}
