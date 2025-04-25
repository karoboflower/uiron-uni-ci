//import { useTheme } from '@/hooks/use-theme';
import { t } from '@/local';
// const { themeVars } = useTheme();
// const confirmColor = themeVars.value['$primary-color'];
// const cancelColor = themeVars.value['$text-color-disabled'];
const confirmColor = '#F6A623'; // 主题色
const cancelColor = '#F5F5F5';
/**
 * Show a toast message
 * @param {string} title - The message to display
 * @param {'none' | 'success' | 'error' | 'loading'} [icon] - The icon to display with the message
 * @returns {Promise<void>} A promise that resolves when the toast is shown
 */
export function toast(title: string, icon: 'none' | 'success' | 'error' | 'loading' = 'none') {
  return uni.showToast({
    title,
    icon,
    duration: 2000,
  });
}

/**
 * Show a modal dialog
 * @param {object} options - Modal options
 * @param {string} [options.title] - The title of the modal
 * @param {string} [options.content] - The content of the modal
 * @param {string} [options.confirmText] - The text for the confirm button
 * @param {string} [options.cancelText] - The text for the cancel button
 * @returns {Promise<boolean>} A promise that resolves to true if confirmed, rejects if cancelled
 */
export function showModal({
  title = '',
  content = t('dialog.confirmOperation'),
  confirmText = t('dialog.confirm'),
  cancelText = t('dialog.cancel'),
} = {}) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      confirmText,
      cancelText,
      confirmColor,
      cancelColor,
      success: (res) => {
        if (res.confirm) {
          resolve(true);
          return;
        }
        reject(res);
      },
      fail: reject,
    });
  });
}

/**
 *  确认提示框
 */
export function confirm(
  content = t('dialog.confirmOperation'),
  title = '',
  confirmText = t('dialog.confirm'),
  cancelText = t('dialog.cancel'),
) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      showCancel: true,
      confirmText,
      cancelText,
      success(res) {
        if (res.confirm) {
          resolve(res);
          return;
        }
        reject(res);
      },
      fail: reject,
    });
  });
}

/**
 * 显示loading动画，需要调用hideLoading()手动关闭
 */
export function showLoading(title = t('dialog.loading')) {
  uni.showLoading({
    title,
  });
}

/**
 * 关闭loading
 */
export function hideLoading() {
  uni.hideLoading();
}
