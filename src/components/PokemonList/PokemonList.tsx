import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { client } from 'src/app/client';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { GET_POKEMON_DETAILS } from '../../hooks/useGetPokemonDetails'
import { PokemonDetailsModal } from '../PokemonModal';
import { SearchBar } from '../SearchBar';
import { LoadingIndicator } from '../LoadingIndicator';

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const navigate = useNavigate();
  const { name: selectedPokemonName } = useParams();

  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const handleClose = () => {
    navigate('/pokemon');
  };

  const handlePrefetch = (name: string) => {
    try {
      client.readQuery({
        query: GET_POKEMON_DETAILS,
        variables: { name },
      });
      return;
    } catch {
      client.query({
        query: GET_POKEMON_DETAILS,
        variables: { name },
      });
    }
  };

  const filteredPokemons = pokemons.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );


  return (
    <section aria-labelledby="pokemon-heading" className={classes.root}>
      <h2 data-testid="pokemon-heading" className={classes.whiteText}>Pokémon List</h2>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {loading && <LoadingIndicator />}
      <ul className={classes.pokemonList}>
        {filteredPokemons.map((pokemon: Pokemon) => (
          <li className={classes.pokemonItem} key={pokemon.id}>
            <button
              data-testid="pokemon-button"
              className={classes.pokemonButton}
              onClick={() => handleOpen(pokemon.name)}
              onMouseEnter={() => handlePrefetch(pokemon.name)}
              onFocus={() => handlePrefetch(pokemon.name)}
              aria-haspopup="dialog"
              aria-controls={`dialog-${pokemon.name}`}
            >
              <img className={classes.pokemonImage} src={pokemon.image} alt={pokemon.name} width={150} />
              <div className={classes.pokemonItemSummary}>
                <span>#{pokemon.id}</span>
                <span className={classes.pokemonName}>{pokemon.name}
                </span>
                </div>
            </button>

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
    whiteText: { color: 'white' },
    pokemonList: {
      padding: '0',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      listStyleType: 'none',
    },
    pokemonItem: {
      margin: '5px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease-in-out',
      position: 'relative',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    pokemonItemSummary: {
      display: 'flex',
      gap: '10px',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    pokemonImage: {
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, .2)',

    },
    pokemonName: {
      fontSize: '20px',
      textTransform: 'capitalize'
    },
    pokemonButton: {
      backgroundColor: 'transparent',
      color: 'white',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
  },
  { name: 'PokemonList' }
);
