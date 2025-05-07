export default function getData({ oldData }) {
  const pagesConfig = {
    id: 'pagesConfig',
    config: `globalStyle: {
    navigationBarTitleText: "uni-app",
    backgroundTextStyle: "dark",
    navigationBarTextStyle: "white",
    navigationStyle: "custom",
    'mp-alipay': {
      defaultTitle: "",
      transparentTitle: "always",
      titlePenetrate: "YES",
      titleBarColor: "#FFFFFF",
    },
  },`,
  };
  oldData.push(pagesConfig);
  return oldData;
}
