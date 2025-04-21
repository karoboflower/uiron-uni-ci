import type { CacheEnum } from '@/const';

/**
 * Get data from storage
 * @param {CacheEnum} key - The storage key to retrieve
 * @returns {Promise<any>} A promise that resolves with the stored data
 */
export function getStorage(key: CacheEnum) {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key,
      success: (res) => {
        resolve(res.data);
      },
      fail: reject,
    });
  });
}

/**
 * Set data in storage
 * @param {CacheEnum} key - The storage key to set
 * @param {Record<string, any>} data - The data to store
 * @returns {Promise<any>} A promise that resolves when storage is successful
 */
export function setStorage(key: CacheEnum, data: Record<string, any>) {
  return new Promise((resolve, reject) => {
    uni.setStorage({
      key,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: reject,
    });
  });
}

export function removeStorage(key: CacheEnum) {
  return new Promise((resolve, reject) => {
    uni.getStorage({
      key,
      success: (res) => {
        resolve(res);
      },
      fail: reject,
    });
  });
}
