import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetails = {
  abilities: [Ability]
  base_experience: number
  forms: [BaseName]
  game_indices: [GameIndex]
  height: number
  held_items: [HeldItem]
  id: number
  is_default: Boolean
  location_area_encounters: String
  moves: [Move]
  name: String
  order: number
  species: BaseName
  sprites: Sprite
  stats: [Stat]
  types: [Type]
  weight: number
  status: Boolean
  message: String
}

export type Ability = {
  ability: BaseName
  is_hidden: Boolean
  slot: number
}

export type GameIndex ={
  game_index: number
  version: BaseName
}

export type VersionDetail ={
  rarity: number
  version: BaseName
}

export type HeldItem ={
  item: BaseName
  version_details: [VersionDetail]
}

export type VersionGroupDetail ={
  level_learned_at: number
  move_learn_method: BaseName
  version_group: BaseName
}

export type Move ={
  move: BaseName
  version_group_details: [VersionGroupDetail]
}

export type Sprite ={
  back_default: String
  back_female: String
  back_shiny: String
  back_shiny_female: String
  front_default: String
  front_female: String
  front_shiny: String
  front_shiny_female: String
}

export type Stat ={
  base_stat: number
  effort: number
  stat: BaseName
}

export type Type= {
  slot: number
  type: BaseName
}

export type BaseName={
  id: number
  url: String
  name: String
}

const GET_POKEMON_DETAILS = gql`
query getPokemonDetails($name: String!) {
  pokemon(name: $name) {
    id
    name
    order
    base_experience
    height
    weight
    is_default
    location_area_encounters
    status
    message

    species {
      id
      name
      url
    }

    forms {
      id
      name
      url
    }

    abilities {
      ability {
        id
        name
        url
      }
      is_hidden
      slot
    }

    game_indices {
      game_index
      version {
        id
        name
        url
      }
    }

    held_items {
      item {
        id
        name
        url
      }
      version_details {
        rarity
        version {
          id
          name
          url
        }
      }
    }

    moves {
      move {
        id
        name
        url
      }
      version_group_details {
        level_learned_at
        move_learn_method {
          id
          name
          url
        }
        version_group {
          id
          name
          url
        }
      }
    }

    sprites {
      back_default
      back_female
      back_shiny
      back_shiny_female
      front_default
      front_female
      front_shiny
      front_shiny_female
    }

    stats {
      base_stat
      effort
      stat {
        id
        name
        url
      }
    }

    types {
      slot
      type {
        id
        name
        url
      }
    }
  }
}`

export const useGetPokemonDetails = (name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      name
    },
  });

  const pokemonDetails: PokemonDetails[] = useMemo(() => data?.pokemon || [], [data]);

  // const pokemonOptions: PokemonOption[] = useMemo(
  //   () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
  //   [pokemons]
  // );

  return {
    pokemonDetails,
    ...queryRes,
  };
};