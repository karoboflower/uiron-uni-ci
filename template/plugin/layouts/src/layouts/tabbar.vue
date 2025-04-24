<template>
  <wd-config-provider
    :theme-vars="themeVars"
    :theme="theme"
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
import { useTheme } from "@/hooks/use-theme";
import { redirectTo } from "@/hooks/use-uni/router";
const { theme, themeVars } = useTheme();
const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } =
  useTabbar();

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value);
  redirectTo(value);
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
