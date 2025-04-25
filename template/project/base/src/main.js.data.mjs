export default function getData({ oldData }) {
  const enAppTemplate = {
    id: 'enmainTemplate'
  };
  oldData.push(enAppTemplate);
  return oldData;
}
