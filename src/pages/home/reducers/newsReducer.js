import { fromJS } from "immutable";
import { Utils } from "lib-for-react-app";
import * as actionTypes from "../consts/actionTypes";

const { createReducer } = Utils;

const initialState = fromJS({
  list: []
});

const handlers = {
  [actionTypes.GET_NEWS_BY_TITLE](state, { payload }) {
    if (!payload || (!payload.body && !payload.data)) {
      return state;
    }

    const list = payload.data ? payload.data.allNews : payload.body.list;

    return state.set("list", fromJS(list));
  },

  [actionTypes.CLEAN_NEWS](state) {
    return state.set("list", fromJS([]));
  },

  [actionTypes.USE_INTL_IN_ACTION](state) {
    return state;
  }
};

export default createReducer(initialState, handlers);
