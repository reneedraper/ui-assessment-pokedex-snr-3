import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Ability, useGetPokemonDetails } from 'src/hooks/useGetPokemonDetails';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import { PokemonTypeBadge } from '../PokemonTypeBadge/PokemonTypeBadge';

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

  if (error) {
    return (
      <div data-testid="pokemon-modal" role="dialog" aria-modal="true" id={`dialog-${name}`} className={classes.backdrop} onClick={onClose}>
        <div
          className={classes.modal}
          ref={dialogRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          aria-labelledby="modal-title"
        >
          <h2 id="modal-title" className={classes.title}>Error</h2>
          <p role="alert">Error: {error.message}</p>
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
  }

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
        <h2 id="modal-title" className={classes.title}>
          {name}
        </h2>

        {loading && <LoadingIndicator />}
        {!loading && pokemonDetails && (
          <div className={classes.content}>
            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} width={150} />
            <p>Number: {pokemonDetails.id}</p>
            <div>
              <p>Abilities:</p>
              <ul>
                {pokemonDetails.abilities.map((a: Ability) => (
                  <li key={a.ability.name}>
                    {a.ability.name}
                    {a.is_hidden && <span style={{ fontStyle: 'italic', marginLeft: 4 }}>(Hidden)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <p>Base Experience: {pokemonDetails.base_experience}</p>
            <p className={classes.flex}>
              Types: <PokemonTypeBadge types={pokemonDetails.types} />
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
  title: { textTransform: 'capitalize' },
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
  flex: {
    display: 'flex',
    gap: '.25rem',
  },
  closeButton: {
    color: 'black',
    marginTop: 16,
    padding: 8,
    fontSize: 14,
  },
});

