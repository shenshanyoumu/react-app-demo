const { FetchHelper } = require("lib-for-react-app");

const { FetchRequest, FetchResponse } = FetchHelper;

FetchResponse.parseHeader = res => ({
  code: res.header.code,
  message: res.header.message
});

FetchResponse.parseBody = res => res.body;

module.exports = { FetchRequest };
