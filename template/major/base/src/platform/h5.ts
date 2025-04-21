import type { ConfigType } from './types/common';
class H5 {
  config: ConfigType;
  constructor() {
    this.config = {
      platform: 'h5',
      appId: '',
    };
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
