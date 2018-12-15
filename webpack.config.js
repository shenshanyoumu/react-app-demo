const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      __OTHER_ENV__: JSON.stringify(process.env.OTHER_ENV),
    }),
  ],
};
