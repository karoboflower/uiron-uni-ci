<template>
  <wd-config-provider
    :theme="theme"
    :theme-vars="themeVars"
    custom-style="background-color: #f5f5f5;min-height: 100vh"
  >
    <slot />
    <wd-notify />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { useTheme } from '@/hooks/use-theme';
const { theme, themeVars } = useTheme();
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
