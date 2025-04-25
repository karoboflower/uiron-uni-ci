import type { MotReport } from '@/hooks/use-report';
import type { ConfigType } from './types/common';
import { createReport } from '@/hooks/use-report';
const { VITE_WX_APP_APPKEY, VITE_WX_APP_TRACKDOMAIN, VITE_WX_APP_ID } = import.meta.env;
class Wechat {
  config: ConfigType;
  report: MotReport;
  constructor() {
    this.config = {
      platform: 'wx',
      appId: '',
    };
    this.report = createReport({
      appKey: VITE_WX_APP_APPKEY,
      trackDomain: VITE_WX_APP_TRACKDOMAIN,
      envEvent: wx,
      platform: 'wx',
      appId: VITE_WX_APP_ID,
    });
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
