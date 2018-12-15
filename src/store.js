import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { fromJS } from 'immutable';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { Middlewares, Utils, FetchHelper } from 'lib-for-react-app';
import DevTools from './DevTools';
import rootReducer, { rootReducerObj } from './reducers';

const { initalAsyncReducers } = Utils;
const { FetchRequest } = FetchHelper;

// 将redux的初始状态对象转换为immutable结构
function createImmutable(initialState) {
  const state = {};

  Object.keys(initialState).forEach(key => {
    state[key] = {};

    Object.keys(initialState[key]).forEach(k => {
      state[key][k] = fromJS(initialState[key][k]);
    });
  });

  return state;
}

function configureStore(history, initialState = {}) {
  const _routerMiddleware = routerMiddleware(history);

  let enhancer = applyMiddleware(_routerMiddleware, ...Middlewares.middlewares);
  if (__DEV__) {
    // console error in development environment
    Middlewares.errorMiddleware.isConsole = true;

    enhancer = compose(
      enhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : DevTools.instrument(),
    );
  }

  const _initialState = createImmutable(initialState);

  // inital async reducers
  initalAsyncReducers(rootReducerObj);

  const store = createStore(rootReducer, _initialState, enhancer);

  if (module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}

const initialState = !__SERVER__ ? window.__INITIAL_STATE__ : {};

// 在服务端使用MemoryHistory对象来处理路由变换
export const history = __SERVER__
  ? createMemoryHistory()
  : createBrowserHistory();

const store = configureStore(history, initialState);

FetchRequest.connectToRedux(store);

export default store;
