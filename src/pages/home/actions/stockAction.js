import { Utils } from "lib-for-react-app";
import API from "../api";
import * as actionTypes from "../consts/actionTypes";

const { customShowLoading, customTimestampMeta } = Utils.customActionUtil;

export function cleanStock() {
  return {
    type: actionTypes.CLEAN_STOCK
  };
}

export function getStockByMarket(market) {
  return dispatch => {
    // 标记加载中
    dispatch(customShowLoading(actionTypes.GET_STOCK_BY_MARKET));

    dispatch(cleanStock());

    // 发起接口数据请求
    return dispatch({
      type: actionTypes.GET_STOCK_BY_MARKET,
      payload: API.getStock(market),
      // 调用timestampMeta，支持处理同一个请求的先后顺序问题
      meta: customTimestampMeta({
        handlers: {
          success: () => {
            // 接口成功回调或者toast提示（如果需要）
          },
          failed: () => {
            // 接口失败回调或者toast提示（如果需要）
          },
          finally: () => {
            // success/failed 执行结束之后执行
          }
        }
      })
    });
  };
}
