const createAPI = require("../../utils/createAPI");

module.exports = {
  allNews: (root, { filter, first, skip }) =>
    createAPI
      .get("news", { title: filter, first, skip })
      .then(res => res.body.list),
  allStocks: (root, { filter, first, skip }) =>
    createAPI
      .get("stocks", { market: filter, first, skip })
      .then(res => res.body.list)
};
