<template>
  <uv-config-provider
    custom-style="min-height: 100vh"
  >
    <uv-navbar
      :title="activeTabbar.title"
      safe-area-inset-top
      placeholder
      fixed
      :bordered="false"
    />
    <slot />
    <uv-tabbar
      :model-value="activeTabbar.name"
      placeholder
      bordered
      safe-area-inset-bottom
      fixed
      @change="handleTabbarChange"
    >
      <uv-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :name="item.name"
        :value="getTabbarItemValue(item.name)"
        :title="item.title"
        :icon="item.icon"
      />
    </uv-tabbar>
    <uv-notify />
    <uv-toast />
    <uv-message-box />
  </uv-config-provider>
</template>

<script lang="ts" setup>
import { useTabbar } from "@/hooks/use-tabbar";
const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } =
  useTabbar();

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
