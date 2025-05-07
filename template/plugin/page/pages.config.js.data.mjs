export default function getData({ oldData }) {
  const pagesConfig = {
    id: 'pagesConfig',
    config: `globalStyle: {
    "backgroundColor": "#efeff4",
    "backgroundTextStyle": "dark",
    "enablePullDownRefresh": false,
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "uni-app",
    "navigationBarBackgroundColor": "#ffffff",
  },
  "tabBar": {
    "color": "#555",
    "borderStyle": "white",
    "selectedColor": "#333333",
    "backgroundColor": "#ffffff",
    "list": [
      {
        "pagePath": "pages/home/index",
        "iconPath": "static/tabs/home.png",
        "selectedIconPath": "static/tabs/home@selected.png",
        "text": "首页",
      },
      {
        "pagePath": "pages/me/index",
        "iconPath": "static/tabs/me.png",
        "selectedIconPath": "static/tabs/me@selected.png",
        "text": "我的",
      },
    ],
  },`,
  };
  oldData.push(pagesConfig);
  return oldData;
}
