/**
 * Navigate to a new page
 * @param {string} url - The page URL to navigate to
 * @returns {Promise<any>} A promise that resolves when navigation is successful
 */
export function navigateBack(params = {}) {
  return new Promise((resolve, reject) => {
    uni.navigateBack({
      ...params,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * Switch to a tab page
 * @param {string} url - The tab page URL to switch to
 * @returns {Promise<any>} A promise that resolves when tab switch is successful
 */
export function switchTab(url: string) {
  return new Promise((resolve, reject) => {
    uni.switchTab({
      url,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * Navigate to a new page
 * @param {string} url - The page URL to navigate to
 * @returns {Promise<any>} A promise that resolves when navigation is successful
 */
export function navigateTo(url: string) {
  return new Promise((resolve, reject) => {
    uni.navigateTo({
      url,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * Redirect to a new page, closing the current page
 * @param {string} url - The page URL to redirect to
 * @returns {Promise<any>} A promise that resolves when redirection is successful
 */
export function redirectTo(url: string) {
  return new Promise((resolve, reject) => {
    uni.redirectTo({
      url,
      success: resolve,
      fail: reject,
    });
  });
}

/**
 * Relaunch the application to a new page
 * @param {string} url - The page URL to relaunch to
 * @returns {Promise<any>} A promise that resolves when relaunch is successful
 */
export function reLaunch(url: string) {
  return new Promise((resolve, reject) => {
    uni.reLaunch({
      url,
      success: resolve,
      fail: reject,
    });
  });
}
