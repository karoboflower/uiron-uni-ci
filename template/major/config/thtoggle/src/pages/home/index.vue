<template>
  <view>
    <InputEntry></InputEntry>
    <wd-button @click="toggleTheme(theme === 'yellow' ? 'blue' : 'yellow')">
    切换主题，当前模式：{{ theme }}
  </wd-button>
  </view>
</template>

<route type="page" lang="json">
{
  "layout": "tabbar",
  "name": "home"
}
</route>

<script lang="ts" setup>
import InputEntry from '@/components/InputEntry.vue';
import { useTheme } from '@/hooks/use-theme';
const { theme, toggleTheme } = useTheme();
</script>