const env = import.meta.env;
export const isProd = import.meta.env.MODE === 'production';
export const isDev = import.meta.env.MODE === 'development';
const {
  VITE_API_BASE_URL,
  VITE_API_UPLOAD_URL,
  VITE_API_HEAD_APP_ID,
  VITE_API_PREFIX,
  VITE_THEME_FILE_URL,
  VITE_WX_APP_ID,
  VITE_ALIPAY_APP_ID,
  VITE_UNI_PLATFORM,
  VITE_API_HEAD_API_KEY,
  VITE_AES_KEY,
  VITE_H5_APP_ID,
  MODE,
  VITE_CLIENT_ID,
  VITE_MIXC_APP_ID,
  VITE_APP_NAME,
  VITE_REPORT_LOG,
  VITE_BUSINESS_MONEY_UNIT,
  VITE_ENV,
} = env;
export  {
  platform: VITE_UNI_PLATFORM,
  isMpAlipay: VITE_UNI_PLATFORM === EPlatform.MpAlipay,
  isMpWeixin: VITE_UNI_PLATFORM === EPlatform.MpWeixin,
  common: {
    servicePhoneText: '400-1020-932',
    servicePhone: '4001020932',
  },
  api: {
    aesKey: VITE_AES_KEY,
    prefix: VITE_API_PREFIX,
    baseURL: VITE_API_BASE_URL,
    uploadURL: VITE_API_UPLOAD_URL,
    xAppId: VITE_API_HEAD_APP_ID,
    apiKey: VITE_API_HEAD_API_KEY,
    timeout: 3000,
  }
  /* #ifdef MP-WEIXIN */
  appId: VITE_WX_APP_ID,
  /* #endif */
  /* #ifdef MP-ALIPAY */
  appId: VITE_ALIPAY_APP_ID,
  /* #endif */
  /* #ifdef H5 */
  appId: VITE_H5_APP_ID,
  /* #endif */
}
