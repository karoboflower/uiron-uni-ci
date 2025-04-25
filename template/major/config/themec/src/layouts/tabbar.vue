<template>
  <wd-config-provider
   :theme="theme"
    :theme-vars="themeVars"
    custom-style="min-height: 100vh"
  >
    <wd-navbar
      :title="activeTabbar.title"
      safe-area-inset-top
      placeholder
      fixed
      :bordered="false"
    />
    <slot />
    <wd-tabbar
      :model-value="activeTabbar.name"
      placeholder
      bordered
      safe-area-inset-bottom
      fixed
      @change="handleTabbarChange"
    >
      <wd-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :name="item.name"
        :value="getTabbarItemValue(item.name)"
        :title="item.title"
        :icon="item.icon"
      />
    </wd-tabbar>
    <wd-notify />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { useTabbar } from "@/hooks/use-tabbar";
import { useTheme } from '@/hooks/use-theme';
const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } =
  useTabbar();
const { theme, themeVars } = useTheme();
function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value);
  uni.redirectTo({ url: value });
}
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared",
  },
};
</script>
