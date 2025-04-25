import { t } from '@/local';

// 检查小程序版本更新
export function checkVersionUpdate(): void {
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(t('update.checkUpdate') + '：' + res.hasUpdate);
  });
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: t('update.updateTitle'),
      content: t('update.updateContent'),
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      },
    });
  });
  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
    console.log('新版本下载失败');
  });
}
