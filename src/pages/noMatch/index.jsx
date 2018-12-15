import React from 'react';
import './index.less';

const NoMatch = () => (
  <div className="img-container">
    <img alt="404" src={require('assets/images/404.png')} />
  </div>
);

export default NoMatch;
