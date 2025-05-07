export default function getData({ oldData, otherData }) {
  const getValuesByKeySubstring = (obj, substring) => {
    return Object.entries(obj)
      .filter(([key]) => key.includes(substring))
      .map(([_, value]) => value);
  };

  const pagesConfig = {
    id: 'pagesConfig',
    config: '',
  };

  const configIndex = oldData.findIndex((item) => item.id === 'pagesConfig');
  const pluginList = getValuesByKeySubstring(otherData, 'vite-plugins')?.[0] || [];

  if (pluginList.length > 0) {
    const isPage = pluginList.some((item) => item.id === 'page');
    const isLayout = pluginList.some((item) => item.id === 'layouts');
    const isComponent = pluginList.some((item) => item.id === 'autoComponents');
     console.log('pluginList', pluginList, isPage, isLayout, isComponent);
    // Add easycom configuration if no autoComponents plugin
    if (!isComponent) {
      pagesConfig.config += `easycom: {
    autoscan: true,
    custom: {
      "^wd-(.*)": "wot-design-uni/components/wd-$1/wd-$1.vue",
      // 可以添加更多组件的映射规则
      // "^([A-Z][a-z]*)": "src/components/$1.vue",
    },
  },`;
    }

    // Add appropriate global style based on layout or page plugins
    if (isLayout) {
      pagesConfig.config += `globalStyle: {
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
  },`;
    } else if (isPage) {
      pagesConfig.config += `globalStyle: {
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
  },`;
    }
  }

  // Update config if exists
  configIndex !== -1 && (oldData[configIndex].config = pagesConfig.config);

  return oldData;
}
