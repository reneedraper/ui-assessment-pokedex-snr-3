import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const loggerLink = new ApolloLink((operation, forward) => {
  const startTime = performance.now();
  return forward(operation).map((result) => {
    const timeTaken = performance.now() - startTime;
    console.log(`[Apollo Benchmark] ${operation.operationName} took ${timeTaken.toFixed(2)} ms`);
    return result;
  });
});

const httpLink = new HttpLink({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
});

export const client = new ApolloClient({
  link: ApolloLink.from([loggerLink, httpLink]),
  cache: new InMemoryCache(),
});