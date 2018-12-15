import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { AppContainer } from 'react-hot-loader';
import { IntlHelper } from 'lib-for-react-app';
import getLocale from 'shared/utils/getLocale';
import 'shared/styles/index.less';
import * as Bundles from './routes/Bundles';

addLocaleData([...en, ...zh]);
addLocaleData({ locale: 'zh-CN', parentLocale: 'zh' });

const locale = getLocale();

/**
 * 如果进行了服务端渲染，则会设置__IS_PRELOAD__变量。因此需要hydrate操作
 * 否则就是正常的浏览器端组件渲染流程
 */
const ReactDOMRender = window.__IS_PRELOAD__
  ? ReactDOM.hydrate
  : ReactDOM.render;

const render = (Component, preload) => {
  const intlConfig = {
    locale,
    messages: preload[0],
  };

  IntlHelper.createIntlContext(intlConfig);

  ReactDOMRender(
    <AppContainer>
      <IntlProvider {...intlConfig}>
        <Component />
      </IntlProvider>
    </AppContainer>,
    document.getElementById('app-root'),
  );

  // 注册离线应用插件
  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => window.location.reload(),
  });
};

const fetchPreload = () => {
  // 基于SSR获取项目的分割点数组
  const splitPoints = window.__SPLIT_POINTS__ || [];

  //在客户端渲染前预取组件
  const promises = splitPoints.map(chunk => Bundles[chunk].loadComponent());

  // 导入当前执行环境的全局语言包
  const fetchIntl = fetch(
    `${__HOST_CDN__}lang/${locale}/global.json?_timestamp=${Date.now()}`,
    {
      credentials: 'include',
    },
  ).then(res => res.json());

  // 先获取语言包
  promises.unshift(fetchIntl);

  // 预加载所需的组件及对应的reducers。如果在配置Bundles时没有配置对用的reducer，则不管
  return Promise.all(promises)
    .then(data => {
      const App = require('./App').default;

      // 注意数据集中，根据Promise.all的声明顺序，data[0]表示语言包
      render(App, data);
    })
    .catch(err => console.error(err));
};

fetchPreload();

// 在开发中基于HMR机制，开发者修改文件会触发热加载行为
if (module.hot) {
  module.hot.accept('./App', () => fetchPreload());
}
