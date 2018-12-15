const wrapper = require('../utils/responseWrapper');

const data = {
  list: [
    {
      id: 1,
      title: 'title1',
      desc: 'desc1',
    },
    {
      id: 2,
      title: 'title2',
      desc: 'desc2',
    },
  ],
};

module.exports = wrapper(data);
