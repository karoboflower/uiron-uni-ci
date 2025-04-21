import type { IConfigType, IHeaderType, IRequestType, requestQueueType, ReseponseType } from './types';
import CryptoJS from 'crypto-js';
import { getTokenStorage, removeTokenStorage } from '@/hooks/use-cache';
import { envEvent } from '@/platform';
import { TIME_OUT } from './const';
import { apiKey, baseURL, prefix, xAppId } from '@/const/env';
let refreshing = false;
export class HttpService {
  private header: IHeaderType;
  private config: IConfigType;
  private requestQueue: requestQueueType = {};
  private waitRequestQueue: (() => void)[] = [];
  constructor(config: IConfigType) {
    this.config = config;
    this.header = config.header;
  }

  get<T = any>(url: string, params?: any, opt = {}): ReseponseType<T> {
    return this.request({ url, params, method: 'GET', ...opt });
  }

  post<T = any>(url: string, params?: any, opt = {}): ReseponseType<T> {
    return this.request({ url, params, method: 'POST', ...opt });
  }

  put<T = any>(url: string, params?: any, opt = {}): ReseponseType<T> {
    return this.request({ url, params, method: 'PUT', ...opt });
  }

  delete<T = any>(url: string, params?: any, opt = {}): ReseponseType<T> {
    return this.request({
      url,
      params,
      method: 'DELETE',
      ...opt,
    });
  }

  // 没有id 默认中断所有
  cancel(id?: string | number) {
    return new Promise((resolve, reject) => {
      if (id) {
        this.requestQueue[id]?.abort();
        delete this.requestQueue[id];
        resolve(true);
        return;
      }
      const task = this.requestQueue;
      const cancelPromises = [];
      for (const i in task) {
        cancelPromises.push(
          () =>
            new Promise((taskResolve) => {
              task[i]?.abort();
              taskResolve(true); // 标记任务已完成
            }),
        );
      }
      Promise.all(cancelPromises)
        .then(() => {
          this.requestQueue = {};
          resolve(true); // 所有任务执行完毕后 resolve
        })
        .catch((error) => {
          this.requestQueue = {};
          reject(error); // 如果有任务出错，reject
        });
    });
  }

  private mergeDefaultHeader<U>(config: IRequestType<U>) {
    const token = getTokenStorage();
    const times = new Date().getTime();
    return Object.assign(this.header, config.header, {
      Authorization: `Motern ${token}`,
      Timestamp: times,
      Sign: CryptoJS.MD5(times + (this.config?.apiKey || apiKey)).toString(),
    });
  }

  private mergeDefaultConfig<U>(config: IRequestType<U>) {
    return Object.assign({}, this.config, config);
  }

  private catchErrorMsg(title: string): void {
    uni.showToast({
      title,
      icon: 'error',
    });
  }

  private showLoading() {
    uni.showLoading({
      title: '加载中',
    });
  }

  private hideLoading() {
    uni.hideLoading();
  }

  async request<T, U>(config: IRequestType<U>): ReseponseType<T> {
    config = this.mergeDefaultConfig(config);
    const header = await this.mergeDefaultHeader(config);
    const { url, params, method = 'GET', loading = false, id, catchError = true } = config;

    return new Promise((resolve, reject) => {
      loading && this.showLoading();
      // 添加令牌标识key 取消重复请求
      id && this.cancel(config.id);
      const request = uni.request({
        url: this.joinBaseUrl(url),
        timeout: config.timeout,
        data: params || config.data,
        header,
        method,
        dataType: 'json',
        responseType: 'text',
        success: async (response: any) => {
          const { data, statusCode } = response;
          if (statusCode === 200 || statusCode === 201) {
            return resolve(data);
          }
          if (statusCode === 401) {
            removeTokenStorage();
            this.refreshToken(config, resolve);
            return false;
          }
          catchError && this.catchErrorMsg(response);
          reject(data);
        },
        fail: (err: any) => {
          /* #ifdef MP-ALIPAY */
          if (err.statusCode === 401) {
            removeTokenStorage();
            this.refreshToken(config, resolve);
            return false;
          }
          catchError && this.catchErrorMsg(err);
          reject(err);
          /* #endif */
          /* #ifdef MP-WEIXIN || H5 */
          catchError && this.catchErrorMsg(err);
          reject(err);
          /* #endif */
        },
      });
      // 将有令牌标识的临时保存一份
      id && (this.requestQueue[id] = request);
    }).finally(() => {
      loading && this.hideLoading();
    }) as ReseponseType<T>;
  }

  private refreshToken<T, U>(config: IRequestType<U>, resolve: any) {
    this.waitRequestQueue.push(() => {
      resolve(this.request(config));
    });
    if (!refreshing) {
      refreshing = true;
      envEvent
        .login()
        .then(() => {
          // 重新请求队列
          this.waitRequestQueue.forEach((MT) => {
            MT();
          });
          this.waitRequestQueue = []; // 清空队列
        })
        .finally(() => {
          // 解除正在刷新
          refreshing = false;
        });
    }
  }

  /**
   * 整合Url
   */
  private joinBaseUrl(url: string) {
    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      return url;
    }
    const { baseURL, prefix: configPrefix } = this.config;
    if (prefix) {
      return `${baseURL}/${configPrefix || prefix}${url}`;
    }
    return baseURL + url;
  }
}

/**
 * Create a new HTTP service instance with custom configuration
 * @param {IConfigType} [config] - Optional configuration for the HTTP service
 * @returns {HttpService} A new HTTP service instance
 */
export function createHttp(config?: IConfigType) {
  return new HttpService(
    config || {
      header: {
        'content-type': 'application/json; charset=utf-8',
        'Xi-App-Id': xAppId,
      },
      baseURL,
      timeout: TIME_OUT,

    },
  );
}
export const defHttp = createHttp();
