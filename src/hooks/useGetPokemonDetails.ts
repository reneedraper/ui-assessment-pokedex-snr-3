import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetails = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      id: number;
      name: string;
    };
    is_hidden: boolean;
  }[];
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      id: number;
      name: string;
    };
  }[];
};

export const GET_POKEMON_DETAILS = gql`
query getPokemonDetails($name: String!) {
  pokemon(name: $name) {
    id
    name
    base_experience
    height
    weight

    stats {
      base_stat
      effort
      stat {
        name
      }
    }

    abilities {
      ability {
        id
        name
      }
      is_hidden
    }

    sprites {
      front_default
    }

    types {
      type {
        id
        name
      }
    }
  }
}`

export const useGetPokemonDetails = (name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      name,
      fetchPolicy: 'cache-first',
    },
  });

  const pokemonDetails: PokemonDetails | null = useMemo(() => data?.pokemon || null, [data]);

  return {
    pokemonDetails,
    ...queryRes,
  };
};