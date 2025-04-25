<script setup lang="ts">
  import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
  import { setSystemLanguage, setTabBarLanguage } from '@/local';
  onLaunch(() => {
  console.log("App Launch");
  // 设置系统语言
  setSystemLanguage();
  // 设置tabar语言
  setTabBarLanguage();
  });
  onShow(() => {
  });
  onHide(() => {
  });
</script>
<style lang="scss">
  
  
</style>
