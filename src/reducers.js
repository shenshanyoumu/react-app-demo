import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { Reducers } from "lib-for-react-app";
import * as Bundles from "./routes/Bundles";

const system = combineReducers({
  error: Reducers.systemError,
  loading: Reducers.systemLoading
});

const baseRootReducerObj = {
  __router__: routerReducer,
  __system__: system
};

const splitPoints =
  !__SERVER__ && window.__SPLIT_POINTS__ ? window.__SPLIT_POINTS__ : [];

// 根据代码分割点的同步加载的模块可选的reducers参数来整合combinedReducers
// 这一步在服务端处理真正有效的数据，而将state传递给浏览器时需要根据这个state来重新生成完整的redux state树
export const rootReducerObj = splitPoints
  .map(chunk => Bundles[chunk].reducers)
  .reduce(
    (prev, current) => Object.assign({}, prev, current),
    baseRootReducerObj
  );

export default combineReducers(rootReducerObj);
