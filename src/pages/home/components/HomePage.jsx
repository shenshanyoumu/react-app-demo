import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { intlShape, FormattedMessage } from 'react-intl';
import { BaseComponent } from 'lib-for-react-app';
import { Tabs, Button, Select } from 'antd';
import globalMessages from 'shared/messages';
import messages from '../messages';

const { TabPane } = Tabs;
const { Option } = Select;

export default class HomePage extends BaseComponent {
  static propTypes = {
    home: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  };

  componentDidMount() {
    const {
      // isPreload属性来自withServerRender
      isPreload,
      getNewsByTitle,
      getStockByMarket,
      useIntlInAction,
    } = this.props;

    if (!isPreload) {
      getNewsByTitle('football');
      getStockByMarket('sh');
    }

    // use intl in action example
    useIntlInAction();
  }

  changeNewsTitle = value => {
    this.props.getNewsByTitle(value);
  };

  cleanNews = () => {
    this.props.cleanNews();
  };

  changeStockMarket = value => {
    this.props.getStockByMarket(value);
  };

  cleanStock = () => {
    this.props.cleanStock();
  };

  render() {
    const { system, intl, home } = this.props;
    const isLoading = system.loading.get('display');
    const newsList = home.news.get('list');
    const stockList = home.stock.getIn(['data', 'list']);

    return (
      <div>
        <Helmet>
          <title>首页</title>
          <meta name="description" content="首页" />
          <meta name="keywords" content="react-app-demo" />
        </Helmet>

        <FormattedMessage {...globalMessages.home} />
        <Tabs defaultActiveKey="1">
          <TabPane tab={intl.formatMessage(messages.news)} key="1">
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
              <Button onClick={this.cleanNews}>
                <FormattedMessage {...messages.cleanMessage} />
              </Button>
            </div>
            {newsList && newsList.size > 0 ? (
              <ul>
                {newsList.map(news => (
                  <li key={news.get('title')}>
                    <h3>{news.get('title')}</h3>
                    <p>{news.get('desc')}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                {isLoading ? (
                  <FormattedMessage {...messages.loading} />
                ) : (
                  <FormattedMessage {...messages.noNews} />
                )}
              </p>
            )}
          </TabPane>
          <TabPane tab={intl.formatMessage(messages.stock)} key="2">
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
              <Button onClick={this.cleanStock}>
                <FormattedMessage {...messages.cleanMessage} />
              </Button>
            </div>
            {stockList && stockList.size > 0 ? (
              <ul>
                {stockList.map(item => (
                  <li key={item.get('name')}>
                    <h3>{item.get('name')}</h3>
                    <p>代码：{item.get('code')}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                {isLoading ? (
                  <FormattedMessage {...messages.loading} />
                ) : (
                  <FormattedMessage {...messages.noStock} />
                )}
              </p>
            )}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
