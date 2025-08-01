import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetails } from 'src/hooks/useGetPokemonDetails';

interface Props {
  name: string;
  onClose: () => void;
}

export const PokemonDetailsModal: React.FC<Props> = ({ name, onClose }) => {
  const classes = useStyles();
  const { pokemonDetails, loading, error } = useGetPokemonDetails(name);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', keyListener);
    return () => {
      previouslyFocused?.focus();
      document.removeEventListener('keydown', keyListener);
    };
  }, [onClose]);

  if (!pokemonDetails) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={classes.backdrop}
      onClick={onClose}
    >
      <div
        className={classes.modal}
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className={classes.title}>{pokemonDetails.name}</h2>
        {loading && <p>Loading...</p>}
        {error && <p role="alert">Error: {error.message}</p>}
        {!loading && !error && (
          <div className={classes.content}>
            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} width={150} />
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <p>Base Experience: {pokemonDetails.base_experience}</p>
            <p>Types: <span>
              {pokemonDetails.types.map((t) => (
                <span
                  key={t.type.name}
                  className={classes.typeBadge}
                  style={{ backgroundColor: typeColors[t.type.name.toLowerCase()] || '#aaa' }}
                >
                  {t.type.name}
                </span>
              ))}
              </span>
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className={classes.closeIconButton}
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    position: 'relative',
    background: 'rgba(255, 255, 255)',
    padding: 24,
    borderRadius: 8,
    maxWidth: 400,
    width: '90%',
    outline: 'none',
  },
  title: {textTransform: 'capitalize'},
  typeBadge: {
    display: 'inline-block',
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 8px',
    margin: '0 4px 4px 0',
    borderRadius: 4,
    textTransform: 'capitalize',
  },
  closeIconButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: 'transparent',
    border: 'none',
    color: '#333',
    fontSize: 24,
    cursor: 'pointer',
    lineHeight: 1,
    padding: 4,

    '&:hover': {
      color: '#000',
    },

    '&:focus': {
      outline: '2px solid #000',
      outlineOffset: 2,
    },
  },
  content: {
    color: 'black',
    marginTop: 12,
  },
  closeButton: {
    color: 'black',
    marginTop: 16,
    padding: 8,
    fontSize: 14,
  },
});

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  stellar: '#69CDFC',
  '???': '#68A090', 
};
