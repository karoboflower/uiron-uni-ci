const { MODE } = import.meta.env;
export interface MotReportConstructor {
  appKey: string;
  trackDomain: string;
  envEvent: any;
  platform?: string;
  appId: string;
}
export class MotReport {
  private config: MotReportConstructor;
  private env: any;
  constructor(config) {
    this.config = config;
    this.env = config.envEvent;
  }

  /**
   * 基本配置信息
   */
  getConfig() {
    const aplusConfig = {
      metaInfo: {
        appKey: this.config.appKey, // 平台系统中创建应用时填写的Appkey, 必填
        trackDomain: this.config.trackDomain, // 采集日志上报域名，必填
        _hold: 'BLOCK', // 阻塞日志上报，待openid&unionid成功获取后再上报
        // 可选，控制聚合
        DEBUG: MODE === 'development', // 是否展示采集日志
        // 可选，控制聚合日志条数，默认不聚合，建议最多配置1~5之间的数字
        'max-queue-count': 1,
        // 可选，最多同时占用的请求通道数量，默认是1，支持配置1~5之间的数字
        'aplus_queue-mini-requests-limit': 1,
        // 可选，设置默认请求超时时间，单位是ms; networkTimeout 优先级高于此配置
        'aplus_queue-request-timeout': 3000,
        pageConfig: {
          // 首页
          'pages/home/index': {
            pageName: 'a_page_home_view',
            regRule: /pages\/home\/index/,
            skipMe: true,
          },
        },
      },
    };

    return aplusConfig;
  }

  /**
   * 开启埋点
   */
  start(params) {
    this.addMetaInfo({
      ...params,
    });
    // 在获取到openid&unionid后，调用start方法
    this.addMetaInfo({
      _hold: 'START',
    });
    const canIUseAccountInfo = uni.canIUse('getAccountInfoSync');
    if (canIUseAccountInfo && uni.getAccountInfoSync) {
      const accountInfo = uni.getAccountInfoSync();
      const { version } = accountInfo.miniProgram;
      this.addGlobal({
        mini_client_version: version || '0.0.0',
      });
    }
    this.addGlobal({
      platform: this.config.platform,
      app_id: this.config.appId,
    });
  }

  /**
   * 添加全局变量
   * @data {object} 添加的全局变量
   */
  addMetaInfo(data) {
    for (const key in data) {
      this.env.aplus_queue.push({ action: 'aplus.setMetaInfo', arguments: [key, data[key]] });
    }
  }

  /**
   * 添加全局属性
   * @data {object} 添加的全局属性
   */
  addGlobal(data) {
    const oData = this.env.aplus?.getMetaInfo?.('globalproperty');
    this.env.aplus_queue.push({
      action: 'aplus.appendMetaInfo',
      arguments: [
        'globalproperty',
        {
          ...oData,
          ...data,
        },
      ],
    });
  }

  /**
   * 点击事件
   * @param eventName 埋点方案中的事件编码
   */
  addClick(eventName, params) {
    try {
      let param = {};
      if (typeof params === 'object' && params !== null) {
        param = params;
      } else {
        param = { content: params };
      }
      this.env.aplus_queue.push({
        action: 'aplus.record',
        arguments: [eventName, 'CLK', { ...param }],
      });
    } catch (error) {}
  }

  /**
   * OTHER 其他事件埋点
   * @param eventName 埋点方案中的事件编码
   */
  addOther(eventName: string, params: unknown) {
    try {
      let param = {};
      if (typeof params === 'object' && params !== null) {
        param = params;
      } else {
        param = { content: params };
      }
      this.env.aplus_queue.push({
        action: 'aplus.record',
        arguments: [
          eventName,
          'OTHER',
          {
            ...param,
          },
        ],
      });
    } catch (error) {}
  }

  /**
   * 曝光事件
   * @param eventName 埋点方案中的事件编码
   */
  addExp(eventName: string, params: unknown) {
    try {
      let param = {};
      if (typeof params === 'object' && params !== null) {
        param = params;
      } else {
        param = { content: params };
      }
      this.env.aplus_queue.push({
        action: 'aplus.record',
        arguments: [
          eventName,
          'EXP',
          {
            ...param,
          },
        ],
      });
    } catch (error) {}
  }

  /**
   * 公共点击事件
   */
  commonClk(eleName: string, params = {}) {
    this.addClick('a_common_main_clk', {
      ele_name: eleName,
      ...params,
    });
  }

  /**
   * 公共曝光事件
   */
  commonExp(eleName: string, params = {}) {
    this.addExp('a_common_main_exp', {
      ele_name: eleName,
      ...params,
    });
  }

  /**
   * 信息事件
   * @param eventName 埋点方案中的事件编码
   */
  info(params: unknown) {
    this.addOther('info', params);
  }

  /**
   * 警告事件
   * @param eventName 埋点方案中的事件编码
   */
  warn(params: unknown) {
    this.addOther('warn', params);
  }

  /**
   * 错误事件
   * @param eventName 埋点方案中的事件编码
   */
  error(params: unknown) {
    this.addOther('error', params);
  }

  /**
   * 添加页面
   * @param eventName 埋点方案中的事件编码
   */
  addPage(pageConfig, params = { is_auto: false }) {
    this.env.aplus_queue.push({
      action: 'aplus.sendPV',
      arguments: [params, pageConfig],
    });
  }
}

export function createReport(config: MotReportConstructor) {
  return new MotReport(config);
}
