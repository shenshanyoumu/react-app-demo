import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import { IntlHelper } from 'lib-for-react-app';
import getLocale from 'shared/utils/getLocale';
import routes from './routes';
import store from './store';

addLocaleData([...en, ...zh]);
addLocaleData({ locale: 'zh-CN', parentLocale: 'zh' });

function fetchAllData(batch, dispatch, locale) {
  const promises = batch
    .map(item => {
      item.route.component.loadReducers();
      return item;
    })
    //当前路由组件的fetchData方法
    .filter(item => item.route.component.fetchData)
    .reduce(
      (prev, current) =>
        current.route.component.fetchData(current.match.params).concat(prev),
      [],
    )
    .map(action => dispatch(action));

  const intlPage = batch
    .filter(item => item.route.component.fetchIntl)
    .map(item => item.route.component.fetchIntl())[0];

  const intlGlobal = fetch(
    `${__HOST_CDN__}lang/${locale}/global.json?_timestamp=${Date.now()}`,
  ).then(res => res.json());

  promises.unshift(intlGlobal, intlPage);

  return Promise.all(promises);
}

// 根据访问路由进行服务端渲染
export default function render(req, res) {
  // 在Node环境，request.acceptsLanguages表示请求对象支持的语言包
  global.__LOCALE__ = req.acceptsLanguages(['en-US', 'zh-CN']);

  const locale = getLocale();

  // 匹配请求路由
  const batch = matchRoutes(routes, req.url);

  fetchAllData(batch, store.dispatch, locale)
    .then(data => {
      const context = {
        splitPoints: [],
        localeData: data[1],
      };
      const intlConfig = {
        locale,
        messages: data[0],
      };

      IntlHelper.createIntlContext(intlConfig);

      // SSR渲染中将组件render为HTML代码片段
      const markup = ReactDOMServer.renderToString(
        <IntlProvider {...intlConfig}>
          <Provider store={store}>
            <div className="app-container">
              <StaticRouter location={req.url} context={context}>
                {renderRoutes(routes)}
              </StaticRouter>
            </div>
          </Provider>
        </IntlProvider>,
      );

      // 是否重定向的逻辑
      if (context.url) {
        return res.redirect(302, context.url);
      }

      const helmet = Helmet.renderStatic();

      // 首次渲染生成的redux  state树
      const initialState = store.getState();

      // 根据HtmlWebpackPlugin插件将index.ejs模板文件转换为index.html文件
      // 然后将index.html文件中的占位字符串替换
      fs.readFile('./index.html', 'utf8', (err, file) => {
        if (err) return console.log(err);

        const html = file
          .replace(/<!-- title -->/, `${helmet.title.toString()}`)
          .replace(/<!-- meta -->/, `${helmet.meta.toString()}`)
          .replace(
            /<div id=app-root class=app-root><\/div>/,
            `<div id="app-root" class="app-root">${markup}</div>`,
          )
          .replace(
            /<!-- splitPoints -->/,
            `<script type="text/javascript">
            window.__SPLIT_POINTS__=${JSON.stringify(context.splitPoints)};
          </script>`,
          )
          .replace(
            /<!-- initialState -->/,
            `<script type="text/javascript">
            window.__INITIAL_STATE__=${JSON.stringify(initialState)};
          </script>`,
          )
          .replace(
            /<!-- isPreload -->/,
            `<script type="text/javascript">
            window.__IS_PRELOAD__=${JSON.stringify(true)};
          </script>`,
          );

        res.send(html);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}
