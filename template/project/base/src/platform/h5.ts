import type { MotReport } from '@/hooks/use-report';
import type { ConfigType } from './types/common';
import { createReport } from '@/hooks/use-report';
const { VITE_H5_APP_APPKEY, VITE_H5_TRACKDOMAIN, VITE_H5_APP_ID } = import.meta.env;
class H5 {
  config: ConfigType;
  creport: MotReport;
  constructor() {
    this.config = {
      platform: 'h5',
      appId: '',
    };
    this.report = createReport({
      appKey: VITE_H5_APP_APPKEY,
      trackDomain: VITE_H5_TRACKDOMAIN,
      envEvent: window,
      platform: 'h5',
      appId: VITE_H5_APP_ID,
    });
  }

  login(): Promise<string> {
    return new Promise(() => {
      return Math.floor(Math.random() * 1000000);
    });
  }
}
const liveEvent = new H5();
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
