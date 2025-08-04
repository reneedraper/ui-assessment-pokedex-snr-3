import React, { useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetails } from 'src/hooks/useGetPokemonDetails';
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
      <div
        data-testid="pokemon-modal"
        role="dialog"
        aria-modal="true"
        id={`dialog-${name}`}
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
          <div className={classes.titleBar}>
            <h2 id="modal-title" className={classes.title}>Error</h2>
            <button
              onClick={onClose}
              className={classes.closeIconButton}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <p role="alert">Error: {error.message}</p>
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
        aria-describedby="modal-description"
      >
        <div className={classes.titleBar}>
          <h2 id="modal-title" className={classes.title}>{name}</h2>
          <button
            onClick={onClose}
            className={classes.closeIconButton}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {loading && <LoadingIndicator />}

        {!loading && pokemonDetails && (
          <div className={classes.content} id="modal-description">


            <div className={classes.detailsWrapper}>

              <img
                src={pokemonDetails.sprites.front_default}
                alt={pokemonDetails.name}
                className={classes.pokemonImage}
              />

              <div>
                <p><span className={classes.label}>Number:</span> {pokemonDetails.id}</p>
                <p><span className={classes.label}>Height:</span> {pokemonDetails.height}</p>
                <p><span className={classes.label}>Weight:</span> {pokemonDetails.weight}</p>
                <p><span className={classes.label}>Base Experience:</span> {pokemonDetails.base_experience}</p>

              </div>

              <div>
                <div className={classes.flex}>
                  <span className={classes.label}>Type: </span> <PokemonTypeBadge types={pokemonDetails.types} />
                </div>
                <h3 className={classes.sectionTitle}>Abilities:</h3>
                <ul className={classes.list}>
                  {pokemonDetails.abilities.map((a) => (
                    <li key={a.ability.name}>
                      {a.ability.name}
                      {a.is_hidden && <span className={classes.hiddenAbility}> (Hidden)</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className={classes.sectionTitle}>Base Stats:</h3>
                <ul className={classes.list}>
                  {pokemonDetails.stats.map((s) => (
                    <li key={s.stat.name}>
                      {s.stat.name}: {s.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modal: {
    background: '#fff',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    outline: 'none',
    boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    textTransform: 'capitalize',
  },
  closeIconButton: {
    background: 'transparent',
    border: 'none',
    color: '#333',
    fontSize: '1.5rem',
    cursor: 'pointer',
    lineHeight: 1,

    '&:hover': {
      color: '#000',
    },
    '&:focus': {
      outline: '0.125rem solid #000',
      outlineOffset: '0.125rem',
    },
  },
  label: {
    fontWeight: 600,
    marginRight: '0.25rem',
  },
  content: {
    color: '#222',
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  pokemonImage: {
    borderRadius: '0.5rem',
    boxShadow: '0 0.125rem 0.375rem rgba(0,0,0,0.1)',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: '200px',
  },
  detailsWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  list: {
    paddingLeft: '1rem',
    margin: 0,
    listStyle: 'disc',
  },
  hiddenAbility: {
    fontStyle: 'italic',
    color: '#666',
  },
  sectionTitle: {
    margin: '0.75rem 0 0.25rem',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  flex: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
});
