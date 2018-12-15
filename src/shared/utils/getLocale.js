const supportLocale = ["en-US", "zh-CN"];
const defaultLocale = "zh-CN";

// 根据浏览器获得默认的语言类别
export default function getLocale() {
  const locale = __SERVER__ ? global.__LOCALE__ : window.navigator.language;

  if (!locale || !supportLocale.includes(locale)) {
    return defaultLocale;
  }

  return locale;
}
