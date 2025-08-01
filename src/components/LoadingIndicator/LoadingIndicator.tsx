import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const DANCING_GIFS = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif',  // Pikachu
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif', // Eevee
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/54.gif',  // Psyduck
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif',   // Bulbasaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/4.gif',   // Charmander
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif',   // Squirtle
];



export const LoadingIndicator: React.FC = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % DANCING_GIFS.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.container} role="status" aria-live="polite">
      <img
        src={DANCING_GIFS[index]}
        alt="Dancing Pokémon"
        className={classes.sprite}
      />
      <span className={classes.text}>Loading...</span>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    color: '#444',
  },
  sprite: {
    width: '96px',
    height: '96px',
    marginBottom: '.75rem',
  },
  text: {
    color: "white",
    backgroundColor: 'gray',
    padding: '.5rem',
    borderRadius: '.25rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});