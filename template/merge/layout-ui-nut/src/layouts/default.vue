<template>
  <nut-config-provider
    :theme-vars="themeVars"
    custom-style="background-color: #f5f5f5;min-height: 100vh"
  >
    <slot />
    <nut-notify />
    <nut-toast />
    <nut-message-box />
  </nut-config-provider>
</template>

<script lang="ts" setup>
const themeVars = reactive<any>({
  colorTheme: "#FF5454",
  tabsNavLineBgColor: "red",
  navbarColor: "#ffffff",
});
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
