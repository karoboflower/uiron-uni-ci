import type { ConfigType } from './types/common';
class AliPay {
  config: ConfigType;
  constructor() {
    this.config = {
      platform: 'ali',
      appId: '',
    };
  }

  login(): Promise<string> {
    return new Promise((resolve, reject) => {
      my.getAuthCode({
        scopes: 'auth_base',
        success: (auth) => {
          if (auth.authCode) {
            return resolve(auth.authCode);
          }
          reject(auth);
        },
        fail: reject,
      });
    });
  }
}
const liveEvent = new AliPay();
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
