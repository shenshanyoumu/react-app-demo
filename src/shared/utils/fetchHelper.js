import { FetchHelper } from "lib-for-react-app";

const { Consts, FetchRequest, FetchResponse } = FetchHelper;

// if the schema of response is not like
// { header: { code: xxx, message: xxx }, body: { ... } }
// you need to reset the response like below
FetchResponse.parseHeader = res => {
  // delay run store.js, must createStore after load reducers for ssr
  const { history } = require("../../store");

  if (res.status === 401) {
    history.push("/login");
  }

  return {
    code: res.header.code,
    message: res.header.message
  };
};

FetchResponse.parseBody = res => {
  if (res.data) {
    return res.data;
  }

  return res.body;
};

export { Consts, FetchRequest };
