export default function getData({ oldData }) {
  const enAppTemplate = {
    id: 'unocssTemplate',
    config: {
      ScriptImport: `import 'virtual:uno.css';`,
    },
  };
  oldData.push(enAppTemplate);
  return oldData;
}
