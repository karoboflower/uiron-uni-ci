<template>
  <div class="loading-page">
    <uv-loading />
  </div>
</template>

<route type="home" lang="json">
{
  "layout": "default",
  "name": "index"
}
</route>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
onLoad(() => {
  // 模拟加载数据
  setTimeout(() => {
    // 数据加载完成后，跳转到首页
    uni.reLaunch({
      url: '/pages/home/index',
    });
  }, 2000); // 2秒后跳转
});
</script>

<style scoped>
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>