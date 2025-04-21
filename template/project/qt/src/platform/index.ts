// 根据不同的环境引入不同的变量
/* #ifdef MP-WEIXIN */
export * from './wechat';
/* #endif */
/* #ifdef MP-ALIPAY */
export * from './alipay';
/* #endif */
/* #ifdef H5 */
export * from './h5';
/* #endif */
