import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonDetailsModal } from '../PokemonModal';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [selectedPokemonName, setSelectedPokemonName] = useState<string | null>(null);

  const handleOpen = (name: string) => setSelectedPokemonName(name);
  const handleClose = () => setSelectedPokemonName(null);

  return (
    <section aria-labelledby="pokemon-heading" className={classes.root}>
      <h2 id="pokemon-heading" >Pokémon List</h2>
      {loading && <div role="status" aria-live="polite">Loading...</div>}
      <ul className={classes.pokemonList}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
          <button
            data-testid="pokemon-button"
            className={classes.pokemonItem}
            onClick={() => handleOpen(pokemon.name)}
            aria-haspopup="dialog"
            aria-controls={`dialog-${pokemon.name}`}
          >
            {pokemon.name}
          </button>
          <img src={pokemon.image} alt={pokemon.name} width={50} />
        </li>
      ))}
    </ul>

    {selectedPokemonName && (
      <PokemonDetailsModal name={selectedPokemonName} onClose={handleClose} />
    )}
    </section>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      padding: '32px',
      boxSizing: 'border-box',
    },
    pokemonList: { listStyleType: 'none' },
    pokemonItem: { backgroundColor: 'transparent',
      cursor: 'pointer',
    },

  },
  { name: 'PokemonList' }
);
