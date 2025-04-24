<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    切换主题，当前模式：{{ theme }}
  </button>
</template>