import createAPI from 'shared/utils/createAPI';
import { apolloFetch } from 'shared/utils/apolloHelper';

export default {
  getNews: title => createAPI.get('news', { title }),
  getStock: market => createAPI.get('stocks', { market }),
  getNewsByGraphql: title => {
    const query = `
      query AllNewsQuery($filter: String) {
        allNews(filter: $filter) {
          id
          title
          desc
        }
      }
    `;
    const variables = {
      filter: title,
    };

    return apolloFetch({ query, variables });
  },
};
