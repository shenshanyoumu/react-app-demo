import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';
import DevTools from './DevTools';
import routes from './routes';
import store, { history } from './store';

const App = () => (
  <Provider store={store}>
    <div className="app-container">
      <Helmet>
        <title>react-app-demo</title>
        <meta name="description" content="react-app-demo's description" />
        <meta name="keywords" content="react-app-demo" />
      </Helmet>
      <Router history={history}>{renderRoutes(routes)}</Router>
      {__DEV__ && !window.__REDUX_DEVTOOLS_EXTENSION__ ? (
        <DevTools />
      ) : (
        undefined
      )}
    </div>
  </Provider>
);

export default App;
