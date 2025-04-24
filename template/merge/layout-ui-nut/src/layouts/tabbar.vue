<template>
  <nut-config-provider
    custom-style="min-height: 100vh"
  >
    <nut-navbar
      :title="activeTabbar.title"
      safe-area-inset-top
      placeholder
      fixed
      :bordered="false"
    />
    <slot />
    <nut-tabbar
      :model-value="activeTabbar.name"
      placeholder
      bordered
      safe-area-inset-bottom
      fixed
      @change="handleTabbarChange"
    >
      <nut-tabbar-item
        v-for="(item, index) in tabbarList"
        :key="index"
        :name="item.name"
        :value="getTabbarItemValue(item.name)"
        :title="item.title"
        :icon="item.icon"
      />
    </nut-tabbar>
    <nut-notify />
    <nut-toast />
    <nut-dialog />
  </nut-config-provider>
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
