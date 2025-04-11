<h1 align="center">✨uiron-uni-ci✨</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/uiron-uni-ci">
        <img src="https://img.shields.io/npm/v/uiron-uni-ci?style=for-the-badge&colorA=363a4f&colorB=a6da95" alt="NPM version">
    </a>
    <a href="https://github.com/karoboflower/uiron-uni-ci/blob/main/LICENSE">
        <img src="https://img.shields.io/github/license/karoboflower/uiron-uni-ci?style=for-the-badge&colorA=363a4f&colorB=a6da95" alt="License">
    </a>
</p>

<h2 align="center">
<sub> >_ Easy to use create uni-app-vue3-vite-template</sub>
</h2>

# 📦 使用

```shell
# npm
    npm create uiron-uni-ci@latest

# pnpm
    pnpm create uiron-uni-ci
```

> [!TIP]
> 建议添加上标记名（@latest），否则 npm 可能会解析到缓存的过时软件包版本。

## 📖 介绍

`uiron-uni-ci` 是一个用于快速创建 uni-app 项目的轻量脚手架工具，它可以帮助你快速创建一个基于`vite`和`vue3`的`uni-app`项目，同时提供了一些模板供你选择。

<p align="left"><img  src=".github/image/demo.png"></p>

### 参数说明

| 配置项 | 参数 | 别名 | 可选值 |
|  :---: | :---: | :---: | :---: |
| Plugin | pluginList | p | 见[插件列表](#插件列表) |
| UI | ui | u | 见[组件列表](#组件列表) |
| Eslint | eslint | e | —— |
| 国际化 | vue-i18n | e | —— |
#### 📦插件列表

| 插件名 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [auto-import-types](https://github.com/Allen-1998/auto-import-types.git) | 自动引入types | autoTypes |
| [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) | 自动引入组件 | autoComponents |
| [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) | 自动引入库 | autoImport |

#### 📦组件列表

| 组件名 | 描述 | 参数名 |
| :---: | :---: | :---: |
| [Uni UI](https://uniapp.dcloud.net.cn/component/uniui/uni-ui.html) | UniApp官方组件库 | uni |
| [wot-design-uni](https://wot-design-uni.pages.dev/) | 高颜值、轻量化的uni-app组件库 | wot |
| [nutui-uniapp](https://uniapp-nutui.tech/) | 京东风格的轻量级移动端组件库 | nut |
| [uv-ui](https://www.uvui.cn/components/intro.html) | 多平台快速开发的UI框架 | uv |

## 🛠️ 环境要求
Vite 需要 Node.js 版本 18+ 或 20+

## 🤝 参与贡献

- 提交新功能
- 解决[`issues`](https://github.com/karoboflower/uiron-uni-ci/issues)

## 🌸 感谢

项目灵感及部分代码来自 [create-vue](https://github.com/vuejs/create-vue)

## 📄 License

[MIT LICENSE](./LICENSE)

## 🙇🏻‍♂️赞助

<p align="left">
  <img src=".github/image/pay.jpg" alt="赞助二维码" style="width: 300px;">
</p>
