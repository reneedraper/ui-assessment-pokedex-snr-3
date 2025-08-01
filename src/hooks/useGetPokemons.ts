import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  image: string;
  order: number;
  types: string[];
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};


export const GET_POKEMONS = gql`
  query getPokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      nextOffset
      prevOffset
      results {
        name
        id
        url
        image
      }
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      limit: 10, // change to 151 when done testing, or do pagination or smth
      offset: 0
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons?.results || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
