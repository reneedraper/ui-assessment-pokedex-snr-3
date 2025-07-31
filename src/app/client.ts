import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

export const client = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    }),
  ]),
  cache: new InMemoryCache({}),
});
