export interface Response<T = any> {
  ErrCode: number;
  ErrMsg: string;
  RequestId: string;
  Results?: T;
  Result?: T;
  Count?: number;
  [key: string]: any;
}
export interface IHeaderType {
  'content-type'?: string;
  [key: string]: any;
}
export interface IRequestType<U> {
  url: string;
  params?: U;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  [key: string]: any;
}

export interface IConfigType {
  baseURL: string;
  timeout: number;
  header: IHeaderType;
  prefix?: string;
  apiKey?: string;
}
export type requestQueueType = Record<string | number, UniApp.RequestTask>;

export type ReseponseType<T> = Promise<Response<T> | undefined | boolean>;
