import { useEffect } from 'react';
import { client } from 'src/app/client';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import { GET_POKEMON_DETAILS, PokemonDetails } from 'src/hooks/useGetPokemonDetails';

export const usePrefetchPokemonDetails = () => {
  const { pokemons, loading } = useGetPokemons();

  useEffect(() => {
    if (!loading && pokemons.length > 0) {
      pokemons.forEach((pokemon) => {
        client.query<PokemonDetails>({
          query: GET_POKEMON_DETAILS,
          variables: { name: pokemon.name },
        });
      });
    }
  }, [loading, pokemons]);
};
