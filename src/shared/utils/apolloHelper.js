import { createApolloFetch } from 'apollo-fetch';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = `${__HOST_CDN__}graphql`;

export const apolloFetch = createApolloFetch({ uri });

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache(),
  ssrMode: true,
});
