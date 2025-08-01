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
  is_default: boolean
  location_area_encounters: string
  moves: [Move]
  name: string
  order: number
  species: BaseName
  sprites: Sprite
  stats: [Stat]
  types: [Type]
  weight: number
  status: boolean
  message: string
}

export type Ability = {
  ability: BaseName
  is_hidden: boolean
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
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
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
  url: string
  name: string
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

    species {
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

    sprites {
      front_default
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

  const pokemonDetails: PokemonDetails | null = useMemo(() => data?.pokemon || null, [data]);

  // const pokemonOptions: PokemonOption[] = useMemo(
  //   () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
  //   [pokemons]
  // );

  return {
    pokemonDetails,
    ...queryRes,
  };
};