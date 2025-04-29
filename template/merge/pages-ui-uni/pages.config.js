import { defineUniPages } from "@uni-helper/vite-plugin-uni-pages";

export default defineUniPages({
  pages: [],
  homePage: 'pages/index/index',
  easycom: {
    autoscan: true,
    custom: {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue",
      // 可以添加更多组件的映射规则
      // "^([A-Z][a-z]*)": "src/components/$1.vue",
    },
  },
  globalStyle: {
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
  },
});
