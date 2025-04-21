import { CacheEnum } from '@/const';
import { getStorageSync, removeStorageSync, setStorageSync } from '@/hooks/use-uni';

/**
 * Store authentication token
 * @param {string} token - The authentication token to store
 * @returns {void}
 */
export function setTokenStorage(token) {
  return setStorageSync(CacheEnum.TOKEN_KEY, token);
}

/**
 * Retrieve stored authentication token
 * @returns {string | null} The stored token or null if not found
 */
export function getTokenStorage() {
  return getStorageSync(CacheEnum.TOKEN_KEY);
}

/**
 * Remove stored authentication token
 * @returns {void}
 */
export function removeTokenStorage() {
  return removeStorageSync(CacheEnum.TOKEN_KEY);
}
