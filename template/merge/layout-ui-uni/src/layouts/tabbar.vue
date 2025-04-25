<template>
  <view class="container" style="min-height: 100vh">
    <uni-nav-bar
      :title="activeTabbar.title"
      fixed
      status-bar
      :border="false"
    />
    <slot />
    <uni-tab-bar 
      :value="activeTabbar.name"
      :fixed="true"
      :tabs="tabbarList"
      @change="handleTabbarChange"
    />
    <uni-popup ref="notifyPopup" type="top">
      <uni-popup-message type="success" />
    </uni-popup>
    <uni-popup ref="messagePopup" type="dialog">
      <uni-popup-dialog />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { useTabbar } from "@/hooks/use-tabbar";
const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } =
  useTabbar();

function handleTabbarChange(value: string) {
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
