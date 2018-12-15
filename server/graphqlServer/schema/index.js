const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typeDefs/index');
const resolvers = require('./resolvers/index');

module.exports = makeExecutableSchema({ typeDefs, resolvers });
