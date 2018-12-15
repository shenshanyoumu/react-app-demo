import withIntl from "shared/utils/withIntl";
/** 
  Bundles用户node端, AsyncBundles用于浏览器端
  webpack中使用了插件, 如果是检查到是浏览器端, 会将Bundles自动替换成AsyncBundles 
 */
import { MainLayout, Home, GraphqlDemo, NoMatch } from "./Bundles";

const routes = [
  {
    component: MainLayout,
    routes: [
      {
        component: withIntl("home")(Home),
        path: "/",
        exact: true,
        breadcrumbName: "Home"
      },
      {
        component: withIntl("graphql-demo")(GraphqlDemo),
        path: "/graphql-demo",
        breadcrumbName: "GraphqlDemo"
      },
      {
        component: NoMatch,
        breadcrumbName: "NoMatch"
      }
    ]
  }
];

export default routes;
