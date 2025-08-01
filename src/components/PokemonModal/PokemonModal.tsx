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
        <h2 id="modal-title">{pokemonDetails.name}</h2>
        {loading && <p>Loading...</p>}
        {error && <p role="alert">Error: {error.message}</p>}
        {!loading && !error && (
          <div className={classes.content}>
            <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <p>Base Experience: {pokemonDetails.base_experience}</p>
            <p>Types: {pokemonDetails.types.map(t => t.type.name).join(', ')}</p>
          </div>
        )}
        <button onClick={onClose} className={classes.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  backdrop: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: 24,
    borderRadius: 8,
    maxWidth: 400,
    width: '90%',
    outline: 'none',
  },
  content: {
    color: 'navy',
    marginTop: 12,
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
    fontSize: 14,
  },
});