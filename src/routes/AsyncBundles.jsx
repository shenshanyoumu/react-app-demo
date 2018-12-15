import { Utils } from "lib-for-react-app";

const { asyncComponent } = Utils;

/** webpackChunkName是打包出来的chunk js文件名 */

export const MainLayout = asyncComponent({
  chunkName: "MainLayout",
  getComponent: () => import(/* webpackChunkName: 'mainLayout' */ "layout/")
});

export const Home = asyncComponent(
  {
    chunkName: "Home",
    getComponent: () =>
      import(/* webpackChunkName: 'home' */ "pages/home/components")
  },
  {
    home: () =>
      import(/* webpackChunkName: 'homeReducers' */ "pages/home/reducers")
  }
);

export const GraphqlDemo = asyncComponent({
  chunkName: "GraphqlDemo",
  getComponent: () =>
    import(/* webpackChunkName: 'graphqlDemo' */ "pages/graphqlDemo/components")
});

export const NoMatch = asyncComponent({
  chunkName: "NoMatch",
  getComponent: () => import(/* webpackChunkName: 'noMatch' */ "pages/noMatch")
});
