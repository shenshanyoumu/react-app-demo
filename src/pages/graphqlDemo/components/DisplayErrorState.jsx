import React from 'react';
import { branch, renderComponent } from 'recompose';

const Error = props => <div>{props.allQuery.error}</div>;

const displayErrorState = branch(
  props => props.allQuery.error,
  renderComponent(Error),
);

export default displayErrorState;
