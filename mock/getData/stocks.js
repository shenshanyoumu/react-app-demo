const wrapper = require('../utils/responseWrapper');

const data = {
  list: [
    {
      id: 1,
      name: 'name1',
      code: 'code1',
    },
    {
      id: 2,
      name: 'name2',
      code: 'code2',
    },
  ],
};

module.exports = wrapper(data);
