const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema/index');

module.exports = app => {
  const buildOptions = async () => ({
    context: {},
    schema,
  });

  app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));
  if (process.env.NODE_ENV === 'development') {
    app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      }),
    );
  }
};
