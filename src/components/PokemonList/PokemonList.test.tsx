import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonList } from './PokemonList';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Mocks
vi.mock('../../hooks/useGetPokemons', () => ({
  useGetPokemons: () => ({
    loading: false,
    pokemons: [
      { id: 1, name: 'bulbasaur', image: 'bulbasaur.png' },
      { id: 2, name: 'ivysaur', image: 'ivysaur.png' },
    ],
  }),
}));

vi.mock('../PokemonModal', () => ({
  PokemonDetailsModal: () => <div data-testid="pokemon-modal">Modal</div>,
}));

vi.mock('../SearchBar', () => ({
  SearchBar: ({ value, onChange }: any) => (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

describe('PokemonList', () => {
  it('renders a list of pokémon', () => {
    render(<PokemonList />, { wrapper: BrowserRouter });
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  it('filters based on search term', () => {
    render(<PokemonList />, { wrapper: BrowserRouter });

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'ivy' } });

    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });


});
