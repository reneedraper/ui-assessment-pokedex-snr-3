import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDetailsModal } from '../PokemonModal';

vi.mock('src/hooks/useGetPokemonDetails', () => ({
  useGetPokemonDetails: () => ({
    loading: false,
    error: null,
    pokemonDetails: {
      name: 'pikachu',
      height: 4,
      weight: 60,
      base_experience: 112,
      sprites: { front_default: 'pikachu.png' },
      abilities: [
        { ability: { name: 'static' }, is_hidden: false, slot: 1 },
        { ability: { name: 'lightning-rod' }, is_hidden: true, slot: 3 },
      ],
      types: [{ type: { name: 'electric' } }],
    },
  }),
}));

describe('PokemonDetailsModal', () => {
  it('renders with Pokémon data', () => {
    render(<PokemonDetailsModal name="pikachu" onClose={() => {}} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/abilities/i)).toBeInTheDocument();
    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/base experience/i)).toBeInTheDocument();
  });

  it('closes on click outside or "×" button', () => {
    const onClose = vi.fn();
    render(<PokemonDetailsModal name="pikachu" onClose={onClose} />);
    fireEvent.click(screen.getAllByRole('button', { name: /close modal/i })[0]);
    expect(onClose).toHaveBeenCalled();
  });
});
