import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { BaseComponent } from 'lib-for-react-app';
import { Menu, Icon } from 'antd';
import messages from 'shared/messages';

export default class LeftMenu extends BaseComponent {
  render() {
    return (
      <aside className="layout-sider">
        <div className="layout-logo" />
        <Menu mode="inline" theme="dark" defaultSelectedKeys={['laptop']}>
          <Menu.Item key="laptop">
            <Icon type="laptop" />
            <Link to="/">
              <FormattedMessage className="nav-text" {...messages.home} />
            </Link>
          </Menu.Item>
          <Menu.Item key="graphqlDemo">
            <Icon type="bars" />
            <Link to="/graphql-demo">
              <FormattedMessage
                className="nav-text"
                {...messages.graphqlDemo}
              />
            </Link>
          </Menu.Item>
        </Menu>
        <button
          className="ant-aside-action"
          onClick={this.props.onCollapseChange}
        >
          {this.props.collapse ? <Icon type="right" /> : <Icon type="left" />}
        </button>
      </aside>
    );
  }
}
