export default function getData({ oldData }) {
  const baseAppTemplate = {
    id: 'baseAppTemplate',
    config: {
      ScriptImport: `import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";`,
      ScriptonLaunch: ` console.log("App Launch");`,
      ScriptonShow: ` console.log("App Show");`,
      ScriptononHide: ` console.log("App Hide");`,
      styleImport: ``,
      stylecontent: ``,
    },
  };
  oldData.push(baseAppTemplate);
  return oldData;
}
