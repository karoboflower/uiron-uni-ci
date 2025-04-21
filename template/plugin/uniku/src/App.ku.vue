<script setup lang="ts">
import { useTheme } from './hooks/useTheme'

const { theme, themeVars } = useTheme({
  buttonPrimaryBgColor: '#07c160',
  buttonPrimaryColor: '#07c160'
})
</script>

<template>
  <div>Hello AppKuVue</div>
  <!-- 假设已注册 WdConfigProvider 组件 -->
  <WdConfigProvider :theme="theme" :theme-vars="themeVars">
    <KuRootView />
  </WdConfigProvider>
</template>