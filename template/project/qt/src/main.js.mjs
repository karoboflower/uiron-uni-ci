export default function getData({ oldData }) {
    const enAppTemplate = {
      id: 'enmainTemplate',
      config: {
        ScriptImport: `
            import { envEvent } from '@/platform';
            const qtConfig = envEvent.report.getConfig();
            // 不同环境引入不同的埋点
            /* #ifdef MP-WEIXIN || MP-ALIPAY */
            import initQTSDK from '@/utils/report/qt_mini.umd-mini.js'; todo
            initQTSDK(qtConfig);
            /* #endif */
            /* #ifdef H5 */
            import initQTSDK from '@/utils/report/qt_mini.umd-h5.js'; todo
            initQTSDK();
            envEvent.report.addMetaInfo(qtConfig?.metaInfo);
            /* #endif */`,
        userIntries: `app.use(store);`,
      },
    };
    oldData.push(enAppTemplate);
    return oldData;
  }
