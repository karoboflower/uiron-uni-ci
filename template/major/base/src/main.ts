import { createSSRApp } from 'vue';
  import store from '@/store/setup';
  import { I18n } from '@/local';
import App from './App.vue';
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.use(I18n);
  return {
    app,
  };
}