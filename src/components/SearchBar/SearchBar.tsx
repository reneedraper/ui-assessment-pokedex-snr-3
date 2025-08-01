import React from 'react';
import { createUseStyles } from 'react-jss';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <label htmlFor="search-input" className={classes.label}>
        Search Pokémon by Name
      </label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classes.input}
        placeholder="e.g., Pikachu"
      />
    </div>
  );
};

const useStyles = createUseStyles({
  wrapper: {
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: 'white',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
    maxWidth: 300,
  },
});
