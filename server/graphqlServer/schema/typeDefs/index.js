const news = require('./news');
const stock = require('./stock');
const query = require('./_query');

module.exports = `
  ${news}
  
  ${stock}
  
  ${query}
`;
