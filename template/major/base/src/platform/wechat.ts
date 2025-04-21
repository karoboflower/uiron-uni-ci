import type { ConfigType } from './types/common';
class Wechat {
  config: ConfigType;
  constructor() {
    this.config = {
      platform: 'wx',
      appId: '',
    };
  }

  login(): Promise<string> {
    return new Promise((resolve, reject) => {
      uni.login({
        success: (res) => {
          const { code } = res || {};
          if (!code) {
            reject({ code: '10001', message: 'wx login code is null' });
          }
          resolve(code);
        },
        fail: reject,
      });
    });
  }
}
const liveEvent = new Wechat();
export const envEvent = new Proxy(liveEvent, {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        console.log(`Calling method: ${String(prop)}`);
        return target[prop](...args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
});
