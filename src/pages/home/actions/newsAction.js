import { IntlHelper } from "lib-for-react-app";
import API from "../api";
import * as actionTypes from "../consts/actionTypes";
import messages from "../messages";

export function cleanNews() {
  return {
    type: actionTypes.CLEAN_NEWS
  };
}

export function getNewsByTitle(title, graphql = false) {
  return dispatch => {
    dispatch(cleanNews());

    const getNews = graphql ? API.getNewsByGraphql : API.getNews;

    return dispatch({
      type: actionTypes.GET_NEWS_BY_TITLE,
      payload: getNews(title)
    });
  };
}

export function useIntlInAction() {
  // 组件外使用intl的例子，action，reducer，utils等等
  // 1. 可以获取intl实例，使用intl实例的各种方法
  const intl = IntlHelper.getIntlContext();
  intl.formatMessage(messages.noNews);
  intl.formatNumber(1000);
  // 2. 如果只用formatMessage，也可以直接像下面这样使用
  IntlHelper.formatMessage(messages.noNews);

  console.log(intl.messages);

  return {
    type: actionTypes.USE_INTL_IN_ACTION
  };
}
