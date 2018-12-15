import React from 'react';
import { intlShape } from 'react-intl';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from 'shared/utils/apolloHelper';
import GraphqlDemo from './GraphqlDemo';

export default class IndexPage extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
  };

  constructor() {
    super();

    this.state = {
      selectedNews: 'football',
      selectedStock: 'shanghai',
    };
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <GraphqlDemo
          intl={this.props.intl}
          selectedNews={this.state.selectedNews}
          selectedStock={this.state.selectedStock}
          changeNewsTitle={val => {
            this.setState({
              selectedNews: val,
            });
          }}
          changeStockMarket={val => {
            this.setState({
              selectedStock: val,
            });
          }}
        />
      </ApolloProvider>
    );
  }
}
