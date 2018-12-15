import { compose } from "redux";
import { connect } from "react-redux";
import { withServerRender } from "lib-for-react-app";
import HomePage from "./HomePage";
import {
  getNewsByTitle,
  cleanNews,
  getStockByMarket,
  cleanStock,
  useIntlInAction
} from "../actions";

const mapStateToProps = state => ({
  system: state.__system__,
  home: state.home
});

const mapDispatchToProps = {
  getNewsByTitle,
  cleanNews,
  getStockByMarket,
  cleanStock,
  useIntlInAction
};

HomePage.fetchData = () => [getNewsByTitle("football"), getStockByMarket("sh")];

// 注意compose函数中reduceRight的执行逻辑
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withServerRender()
)(HomePage);
