import en from './en.json';
import zh from './zh.json';
import zhTw from './zh-tw.json';
import { createI18n } from 'vue-i18n';
enum Langs {
  en = 'en',
  zh = 'zh',
  zhTw = 'zh_tw',
}
enum CacheEnum {
  LANGUAGE_KEY = '__LANGUAGE_KEY__',
}
const langsMap = {
  [Langs.zh]: '中文',
  [Langs.en]: 'EN',
  [Langs.zhTw]: '繁體',
};
const getSystemInfo = (): Promise<UniApp.GetSystemInfoResult> => {
  return new Promise((resolve, reject) => {
    uni.getSystemInfo({
      success: (res) => {
        resolve(res);
      },
      fail: reject,
    });
  });
};
async function setSystemLanguage() {
  const systemInfo = await getSystemInfo();
  // 每个平台不一样 h5 en-US zh-TW zh-CN weixin en zh zh_TW
  const languageLow = systemInfo.language?.toLowerCase();
  const language = determineLanguage(languageLow as string);
  switch (language) {
    case 'zh':
      changeLanguage('zh');
      break;
    case 'zh_tw':
      changeLanguage('zh_tw');
      break;
    default:
      changeLanguage('en');
      break;
  }
}
function determineLanguage(languageLow: string): string {
  if (languageLow.includes('tw') || languageLow.includes('hk')) {
    return 'zh_tw';
  } else if (languageLow.includes('zh')) {
    return 'zh';
  }
  {
    return 'en';
  }
}

const getLanguageStorage = () => {
  return uni.getStorageSync(CacheEnum.LANGUAGE_KEY) || 'zh';
};
const language = getLanguageStorage();
const I18n = createI18n({
  locale: language,
  fallbackLocale: language,
  messages: {
    en,
    zh,
    zh_tw: zhTw,
  },
});
const t = I18n.global.t;
const changeLanguage = (lang: string) => {
  I18n.global.locale = lang;
  I18n.global.fallbackLocale = lang;
  uni.setStorageSync(CacheEnum.LANGUAGE_KEY, lang);
};
const setTabBarLanguage = () => {
  const mapTabBar = [
    {
      index: 0,
      text: t('menu.home'),
    },
    {
      index: 1,
      text: t('menu.me'),
    },
  ];
  for (let i = 0; i < mapTabBar.length; i++) {
    const { index, text } = mapTabBar[i];
    uni.setTabBarItem({
      index,
      text,
    });
  }
};
export { changeLanguage, I18n, Langs, langsMap, setSystemLanguage, setTabBarLanguage, t };
