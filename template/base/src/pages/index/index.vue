<template>
  <div class="loading-page">
    <div class="spinner"></div>
    <p>加载中，请稍候...</p>
  </div>
</template>

<script lang="ts" setup>  
import { onLoad } from '@dcloudio/uni-app';
onLoad(() => {
  // 模拟加载数据
  setTimeout(() => {
    // 数据加载完成后，跳转到首页
    uni.reLaunch({
      url: '/pages/home/index'
    });
  }, 2000); // 2秒后跳转
});
</script>

<style scoped>
.loading-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  color: #333;
  font-family: Arial, sans-serif;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>