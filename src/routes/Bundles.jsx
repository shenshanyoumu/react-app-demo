import { Utils } from 'lib-for-react-app';

const { syncComponent } = Utils;

export const MainLayout = syncComponent({
  chunkName: 'MainLayout',
  component: require('layout'),
});

export const Home = syncComponent(
  {
    chunkName: 'Home',
    component: require('pages/home/components'),
  },
  {
    home: require('pages/home/reducers'),
  },
);

export const GraphqlDemo = syncComponent({
  chunkName: 'GraphqlDemo',
  component: require('pages/graphqlDemo/components'),
});

export const NoMatch = syncComponent({
  chunkName: 'NoMatch',
  component: require('pages/noMatch'),
});
