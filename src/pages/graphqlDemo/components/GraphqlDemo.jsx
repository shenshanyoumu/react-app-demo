import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import { compose } from 'recompose';
import { BaseComponent, withServerRender } from 'lib-for-react-app';
import { Helmet } from 'react-helmet';
import { Tabs, Select } from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import DisplayLoadingState from './DisplayLoadingState';
import DisplayErrorState from './DisplayErrorState';
import messages from '../messages';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class GraphqlDemo extends BaseComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    selectedNews: PropTypes.string.isRequired,
    selectedStock: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.bind('changeNewsTitle', 'changeStockMarket');
  }

  changeNewsTitle(val) {
    this.props.changeNewsTitle(val);
  }

  changeStockMarket(val) {
    this.props.changeStockMarket(val);
  }

  render() {
    const allQuery = this.props.allQuery;
    const newsList = allQuery.allNews;
    const stockList = allQuery.allStocks;

    return (
      <div>
        <Helmet>
          <title>Graphql Demo</title>
          <meta name="description" content="graphql-demo" />
          <meta name="keywords" content="react-app-demo" />
        </Helmet>
        <Tabs defaultActiveKey="1">
          <TabPane tab={this.props.intl.formatMessage(messages.news)} key="1">
            <div>
              <Select
                defaultValue="football"
                style={{ width: 120 }}
                onChange={this.changeNewsTitle}
              >
                <Option value="football">
                  <FormattedMessage {...messages.football} />
                </Option>
                <Option value="basketball">
                  <FormattedMessage {...messages.basketball} />
                </Option>
              </Select>
            </div>
            {newsList && newsList.length > 0 ? (
              <ul>
                {newsList.map(news => (
                  <li key={news.id}>
                    <h3>{news.title}</h3>
                    <p>{news.desc}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <FormattedMessage {...messages.noNews} />
              </p>
            )}
          </TabPane>
          <TabPane tab={this.props.intl.formatMessage(messages.stock)} key="2">
            <div>
              <Select
                defaultValue="sh"
                style={{ width: 120 }}
                onChange={this.changeStockMarket}
              >
                <Option value="sh">
                  <FormattedMessage {...messages.shanghai} />
                </Option>
                <Option value="sz">
                  <FormattedMessage {...messages.shenzhen} />
                </Option>
              </Select>
            </div>
            {stockList && stockList.length > 0 ? (
              <ul>
                {stockList.map(item => (
                  <li key={item.id}>
                    <h3>{item.name}</h3>
                    <p>代码：{item.code}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <FormattedMessage {...messages.noStock} />
              </p>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const data = graphql(
  gql`
    query AllQuery($selectedNews: String, $selectedStock: String) {
      allNews(filter: $selectedNews) {
        id
        title
        desc
      }
      allStocks(filter: $selectedStock) {
        id
        name
        code
      }
    }
  `,
  {
    name: 'allQuery',
    options: props => ({
      variables: {
        selectedNews: props.selectedNews,
        selectedStock: props.selectedStock,
      },
    }),
  },
);

export default compose(
  data,
  DisplayLoadingState,
  DisplayErrorState,
  withServerRender(),
)(GraphqlDemo);
