import { Utils } from "lib-for-react-app";
import { FetchRequest } from "./fetchHelper";

const createAPI = Utils.createAPI(FetchRequest);

function createUrl(url) {
  const baseUrl = __HOST_API__;

  if (url) {
    return `${baseUrl}/api/${url}`;
  }

  return baseUrl;
}

export default {
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
