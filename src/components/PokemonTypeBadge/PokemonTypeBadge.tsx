import React from 'react';
import { createUseStyles } from 'react-jss';
import { Type } from 'src/hooks/useGetPokemonDetails';


interface Props {
  typeName?: string;
  types?: Type[];
}

export const PokemonTypeBadge: React.FC<Props> = ({ typeName, types }) => {
  const classes = useStyles();

  if (types && types.length > 0) {
    return (
      <>
        <span className={classes.badgeWrapper}>
          {types.map((t: Type) => (
            <PokemonTypeBadge key={t.type.name} typeName={t.type.name} />
          ))}
        </span>
      </>
    );
  }

  //TODO: not sure if i like the recursion for readability
  if (!typeName) {
    return <span className={classes.skeletonBadge} aria-busy="true" aria-label="Loading type" />;
  }

  const color = typeColors[typeName.toLowerCase()] || '#aaa';

  return (
    <span
      className={classes.typeBadge}
      style={{ backgroundColor: color }}
    >
      {typeName}
    </span>
  );
};

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

const useStyles = createUseStyles({
  badgeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skeletonBadge: {
    display: 'inline-block',
    height: 20,
    width: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    margin: '0 4px 4px 0',
    animation: '$pulse 4s infinite ease-in-out',
  },
  '@keyframes pulse': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  },
  typeBadge: {
    color: '#fff',
    fontSize: '.75rem',
    fontWeight: 600,
    padding: '4px 8px',
    margin: '0 4px 4px 0',
    borderRadius: 4,
    textTransform: 'capitalize',
  },
});
