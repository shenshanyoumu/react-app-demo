import React from 'react';
import { FormattedMessage } from 'react-intl';
import { branch, renderComponent } from 'recompose';
import messages from '../messages';

const Loading = () => <FormattedMessage {...messages.loading} />;

const displayLoadingState = branch(
  props => props.allQuery.loading,
  renderComponent(Loading),
);

export default displayLoadingState;
