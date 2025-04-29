<template>
  <nut-config-provider
    custom-style="min-height: 100vh"
  >
   <!-- 自定义tabbar页面 -->
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
