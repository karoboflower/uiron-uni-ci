<script setup lang="ts">
  import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
  import { setSystemLanguage } from '@/local';
  onLaunch(() => {
  console.log("App Launch");
  // 设置系统语言
  setSystemLanguage();
  });
  onShow(() => {
  });
  onHide(() => {
  });
</script>
<style lang="scss">
  
  
</style>
