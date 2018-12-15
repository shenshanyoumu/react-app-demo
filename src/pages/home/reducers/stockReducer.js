import { fromJS } from "immutable";
import { Utils } from "lib-for-react-app";
import * as actionTypes from "../consts/actionTypes";

const { createReducer, customReducerUtil } = Utils;
const { initCustomState, customResultParser } = customReducerUtil;

const initialState = fromJS(initCustomState({ list: [] }));

const handlers = {
  [actionTypes.GET_STOCK_BY_MARKET](state, { payload, error, meta }) {
    if (!payload || !payload.body) {
      return state;
    }

    return customResultParser(state, { payload, error, meta });
  },

  [actionTypes.CLEAN_STOCK](state) {
    return state.setIn(["data", "list"], fromJS([]));
  }
};

export default createReducer(initialState, handlers);
