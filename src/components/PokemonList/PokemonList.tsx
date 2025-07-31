import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [isOpen, openModal] = useState(false);

  return (
    <section aria-labelledby="pokemon-heading" className={classes.root}>
      <h2 id="pokemon-heading" >Pokémon List</h2>
      {loading && <div role="status" aria-live="polite">Loading...</div>}
      <ul className={classes.pokemonList}>
        {pokemons.map((pkmn) => (
          <li key={pkmn.id}>      
          <button className={classes.pokemonItem} onClick={() => openModal(isOpen)}>
            {pkmn.name}
            </button>
          </li>
          
        ))}
      </ul>
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
