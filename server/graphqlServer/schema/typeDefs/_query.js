module.exports = `
  type Query{
		allNews(filter: String, skip: Int, first: Int): [News!]!
		
		allStocks(filter: String, skip: Int, first: Int): [Stock!]!
	}
`;
