import React from "react";
import { FormattedMessage } from "react-intl";
import { renderRoutes } from "react-router-config";
import { BaseComponent } from "lib-for-react-app";
import messages from "shared/messages";
import LeftMenu from "./leftMenu";
import "./index.less";

export default class Main extends BaseComponent {
  constructor() {
    super();

    this.state = {
      collapse: true
    };
  }

  onCollapseChange = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  render() {
    const { collapse } = this.state;

    return (
      <div
        className={
          collapse ? "layout-aside layout-aside-collapse" : "layout-aside"
        }
      >
        <LeftMenu
          collapse={collapse}
          onCollapseChange={this.onCollapseChange}
        />
        <div className="layout-main">
          <div className="layout-header">
            <FormattedMessage {...messages.header} />
          </div>
          <div className="layout-container">
            <div className="layout-content">
              {renderRoutes(this.props.route.routes)}
            </div>
          </div>
          <div className="layout-footer">
            <FormattedMessage {...messages.footer} />
          </div>
        </div>
      </div>
    );
  }
}
