const { Utils } = require("lib-for-react-app");
const { FetchRequest } = require("./fetchHelper");

const createAPI = Utils.createAPI(FetchRequest);

function createUrl(url) {
  const baseUrl = process.env.HOST_API;

  if (url) {
    return `${baseUrl}/api/${url}`;
  }

  return baseUrl;
}

module.exports = {
  get(url, params = {}, options = {}) {
    return createAPI.get(createUrl(url), params, options);
  },
  post(url, params = {}, options = {}) {
    const headers = {
      "Content-Type": "application/json"
    };
    return createAPI.post(
      createUrl(url),
      params,
      Object.assign({ headers }, options)
    );
  }
};
