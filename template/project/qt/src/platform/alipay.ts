import type { MotReport } from '@/hooks/use-report';
import type { ConfigType } from './types/common';
import { createReport } from '@/hooks/use-report';
const { VITE_ALIPAY_APP_APPKEY, VITE_ALIPAY_APP_TRACKDOMAIN, VITE_ALIPAY_APP_ID } = import.meta.env;
class AliPay {
  config: ConfigType;
  report: MotReport;
  constructor() {
    this.config = {
      platform: 'ali',
      appId: '',
    };
    this.report = createReport({
      appKey: VITE_ALIPAY_APP_APPKEY,
      trackDomain: VITE_ALIPAY_APP_TRACKDOMAIN,
      envEvent: my,
      platform: 'ali',
      appId: VITE_ALIPAY_APP_ID,
    });
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
